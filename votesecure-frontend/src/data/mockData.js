export const elections = [
  {
    id: "student-council-2026",
    title: "Student Council Election",
    subtitle: "MITS Gwalior • 2026–27",
    category: "University",
    status: "active",
    startDate: "20 Sep 2026",
    endDate: "25 Sep 2026",
    candidates: 4,
    description: "Elect representatives for the Student Council for the 2026–27 academic session.",
  },
  {
    id: "cse-representative-2026",
    title: "CSE Class Representative",
    subtitle: "Computer Science & Engineering",
    category: "Department",
    status: "active",
    startDate: "19 Sep 2026",
    endDate: "23 Sep 2026",
    candidates: 3,
    description: "Choose the class representative for your department.",
  },
  {
    id: "sports-secretary-2026",
    title: "Sports Secretary",
    subtitle: "Student Activities",
    category: "College",
    status: "upcoming",
    startDate: "28 Sep 2026",
    endDate: "30 Sep 2026",
    candidates: 5,
    description: "Upcoming election for the student sports secretary.",
  },
];

export const candidates = [
  { id: "c1", electionId: "student-council-2026", name: "Rahul Sharma", department: "CSE", year: "3rd Year", symbol: "◈", manifesto: "Student facilities, transparent communication and technical clubs." },
  { id: "c2", electionId: "student-council-2026", name: "Aman Verma", department: "IT", year: "3rd Year", symbol: "◆", manifesto: "More student events, mentorship and placement-focused initiatives." },
  { id: "c3", electionId: "student-council-2026", name: "Rohit Singh", department: "ECE", year: "3rd Year", symbol: "★", manifesto: "Better campus engagement and student activity coordination." },
  { id: "c4", electionId: "student-council-2026", name: "Priya Patel", department: "ME", year: "3rd Year", symbol: "●", manifesto: "Inclusive student participation and stronger inter-branch collaboration." },
  { id: "c5", electionId: "cse-representative-2026", name: "Neha Jain", department: "CSE", year: "2nd Year", symbol: "◆", manifesto: "Better lab coordination and peer learning." },
  { id: "c6", electionId: "cse-representative-2026", name: "Arjun Gupta", department: "CSE", year: "2nd Year", symbol: "★", manifesto: "Coding clubs and technical workshops." },
  { id: "c7", electionId: "cse-representative-2026", name: "Simran Khan", department: "CSE", year: "2nd Year", symbol: "●", manifesto: "Student feedback system and academic support." },
];

export const resultData = [
  { name: "Rahul Sharma", votes: 1032 },
  { name: "Aman Verma", votes: 674 },
  { name: "Rohit Singh", votes: 276 },
  { name: "Priya Patel", votes: 0 },
];
