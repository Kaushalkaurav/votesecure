# Administrator login recovery

An email being configured in `ADMIN_EMAIL` does not by itself grant the admin role. Existing accounts store a bcrypt password hash; changing `ADMIN_INITIAL_PASSWORD` does not reset that hash.

From the **backend** directory:

1. Run `npm run recover:admin` if the account is already an admin but its password is unknown. This intentionally requires an interactive, local-MongoDB terminal, an explicit confirmation, and a new password of at least 16 characters. The password is entered visibly; use a private terminal, not a screen-shared session. No password is supplied in command-line arguments or written to Git.
2. If the admin account does **not** exist, set `ADMIN_EMAIL` and a new `ADMIN_INITIAL_PASSWORD` in the local, ignored `.env`, then run `npm run seed:admin`.
3. If the email belongs to a `student` account, the existing seed script only promotes it when `ADMIN_INITIAL_PASSWORD` matches that account's current password; it will not silently elevate arbitrary students.
4. Sign out of VoteSecure and sign in again to refresh the role in the frontend.

**Do not upload `.env`.** After seeding, clear `ADMIN_INITIAL_PASSWORD` from the file. Revoke and rotate any credentials already shared outside your machine.
