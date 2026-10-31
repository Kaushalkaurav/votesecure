# VoteSecure local development setup. Run in Administrator PowerShell.
# Preserves existing MongoDB data; requires mongodump and a local MongoDB Windows service.
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Stop-Setup([string]$reason) { throw "Setup stopped safely: $reason" }

$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = [Security.Principal.WindowsPrincipal]::new($identity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Stop-Setup 'Open PowerShell using Run as administrator.'
}
$repoRoot = Split-Path -Parent $PSScriptRoot
$initScript = Join-Path $repoRoot 'backend\scripts\initializeReplicaSet.js'
if (-not (Test-Path $initScript)) { Stop-Setup "Cannot find $initScript. Run the script from your cloned VoteSecure repository." }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Stop-Setup 'Node.js is not on PATH.' }
$service = Get-CimInstance Win32_Service -Filter "Name='MongoDB'"
if (-not $service) { Stop-Setup 'Windows service MongoDB was not found. This setup only supports service installations.' }
if ($service.State -ne 'Running') { Stop-Setup 'MongoDB service is not running. Resolve this before setup.' }

$dump = Get-Command mongodump.exe -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -First 1
if (-not $dump) {
  $candidates = @(
    (Join-Path $env:USERPROFILE 'Downloads'),
    (Join-Path $env:ProgramFiles 'MongoDB')
  )
  foreach ($directory in $candidates) {
    if ((Test-Path $directory) -and -not $dump) {
      $found = Get-ChildItem -Path $directory -Filter mongodump.exe -Recurse -File -ErrorAction SilentlyContinue | Select-Object -First 1
      if ($found) { $dump = $found.FullName }
    }
  }
}
if (-not $dump) { Stop-Setup 'mongodump.exe is required for a verified backup. Install MongoDB Database Tools first.' }

$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupDir = Join-Path $env:USERPROFILE "Desktop\votesecure-backup-$stamp"
Write-Host "Backing up VoteSecure to $backupDir"
& $dump '--uri=mongodb://127.0.0.1:27017/votesecure' "--out=$backupDir"
if ($LASTEXITCODE -ne 0) { Stop-Setup 'mongodump failed; MongoDB configuration has NOT been changed.' }
$dbBackup = Join-Path $backupDir 'votesecure'
if (-not (Test-Path $dbBackup)) { Stop-Setup 'Database backup folder missing. No configuration changes made.' }
$bsonCount = @(Get-ChildItem -Path $dbBackup -Filter '*.bson' -File).Count
if ($bsonCount -lt 1) { Stop-Setup 'No BSON collections found in backup. No configuration changes made.' }
Write-Host "Backup verified: $bsonCount BSON files. Keep $backupDir private."

$pathName = [string]$service.PathName
$configPath = $null
if ($pathName -match '(?i)(?:--config|-f)\s+(?:"([^"]+)"|([^\s]+))') {
  $configPath = if ($Matches[1]) { $Matches[1] } else { $Matches[2] }
}
if (-not $configPath -or -not (Test-Path $configPath)) {
  Stop-Setup 'Cannot safely determine mongod.cfg from the MongoDB service. Backup succeeded; no config changes made.'
}
$content = Get-Content -LiteralPath $configPath -Raw
if ($content -match '(?m)^replication\s*:') {
  if ($content -notmatch '(?m)^\s+replSetName\s*:\s*rs0\s*(?:#.*)?$') {
    Stop-Setup 'An existing replication section needs manual review; it was NOT overwritten.'
  }
  Write-Host 'rs0 already configured in mongod.cfg.'
} else {
  $cfgBackup = "$configPath.votesecure-$stamp.bak"
  Copy-Item -LiteralPath $configPath -Destination $cfgBackup
  Add-Content -LiteralPath $configPath -Value "`r`nreplication:`r`n  replSetName: rs0`r`n"
  Write-Host "Configured rs0. Original config backup: $cfgBackup"
}
Write-Host 'Restarting the local MongoDB service...'
Restart-Service -Name 'MongoDB' -ErrorAction Stop
Start-Sleep -Seconds 3
if ((Get-Service 'MongoDB').Status -ne 'Running') { Stop-Setup 'MongoDB failed to restart; restore the saved mongod.cfg and inspect the MongoDB log.' }
Push-Location (Join-Path $repoRoot 'backend')
try {
  & node 'scripts/initializeReplicaSet.js'
  if ($LASTEXITCODE -ne 0) { Stop-Setup 'Replica set initialization could not finish. See message above.' }
} finally { Pop-Location }
Write-Host 'VoteSecure local database setup complete. Restart npm run dev.'
