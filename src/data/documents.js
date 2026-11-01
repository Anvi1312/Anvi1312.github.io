// ---------------------------------------------------------------------------
// Every certificate, letter, news feature and photo on the site.
//
// Each document gets a permanent page at /certificates/<slug>. The resume already
// links to these pages, so the slugs below are FINAL. Never rename one. A new
// document gets a new slug in the same style.
//
//   slug      permanent address of the page
//   cat       internship | hackathon | research | course | recognition | media
//   title     full name of the certificate, written as a short sentence
//   short     shorter label for cards (optional, falls back to title)
//   issuer    who issued it
//   printedIssuer  the issuer exactly as printed, shown only on the certificate's own page
//             when it differs from the correct name (for example a typo on the document)
//   date      month and year as shown on the document, for example "Dec 2025"
//   sort      the same date as YYYY-MM, used for ordering ("" if unknown)
//   about     one or two plain sentences on what it was for. Every title, issuer, date
//             and about line must match the real document, never stronger than it
//   file      the REDACTED file, under /certificates/files/ (PDF, or JPG for photos)
//   preview   large image of page 1, under /certificates/previews/ (1600 px wide webp)
//   thumb     small image of page 1, under /certificates/thumbs/ (640 px wide webp)
//   verify    the issuer's own verification link, if there is one
//   project   slug of the related project page, if there is one
//   featured  shown first on the home page
//   kind      "photo" for event photos, "article" for news, otherwise left out
//   redacted  true when personal details are covered on the published copy
//
// A document only appears on the site once it has a `file` or a `verify` link,
// so an entry that is still waiting for its file never creates a broken page.
// Recommendation letters, design patent filing papers and anything with an
// application number are never published.
//
// The files are made by "Anvi Website/tools/prepare-documents.py" from the originals in DOC.
// ---------------------------------------------------------------------------

export const categories = [
  { id: "internship", label: "Internships" },
  { id: "hackathon", label: "Hackathons and awards" },
  { id: "research", label: "Research" },
  { id: "course", label: "Courses and training" },
  { id: "recognition", label: "Appreciation and membership" },
  { id: "media", label: "News and photos" },
];

// The three files of a document, all named after its slug.
const f = (slug, ext = "pdf") => ({
  file: `/certificates/files/${slug}.${ext}`,
  preview: `/certificates/previews/${slug}.webp`,
  thumb: `/certificates/thumbs/${slug}.webp`,
});

const all = [
  // Internships ------------------------------------------------------------
  {
    slug: "isro-research-project-2026", cat: "internship", featured: true,
    title: "Fourteen-week research project at ISRO",
    short: "ISRO, research project",
    issuer: "Indian Space Research Organisation (ISRO), Ahmedabad", date: "Aug 2026", sort: "2026-08",
    about: "I completed a fourteen-week project at ISRO in Ahmedabad, from 21 May to 31 August 2026. The project was titled \"Deep Learning Frameworks for Robust Event Picking, Noise Suppression, and Signal Classification in Planetary Seismic Data, Applications to Lunar Seismological Datasets\".",
    ...f("isro-research-project-2026"),
  },
  {
    slug: "line-tech-internship-2025", cat: "internship",
    title: "Internship Completion Certificate, The Line Tech",
    short: "The Line Tech, internship",
    issuer: "The Line Tech Solutions Ltd, United Kingdom", date: "Jul 2025", sort: "2025-07",
    printedIssuer: "The Line Tech Solution Limited, United Kingdom",
    about: "An internship from 1 June to 1 July 2025, where I worked on the Nishan product order management system. I used AI tools and agents to design order workflows, pulled data from Tally Prime Gold through APIs into dashboards, and built screens and backend workflows in Bubble.",
    redacted: true,
    ...f("line-tech-internship-2025"),
  },
  {
    slug: "lalit-rakesh-internship-2024", cat: "internship",
    title: "Certificate of Internship, Lalit Rakesh & Associates",
    short: "Lalit Rakesh & Associates, internship",
    issuer: "Lalit Rakesh & Associates, Chartered Accountants", date: "Aug 2024", sort: "2024-08",
    about: "A one-month paid internship from 4 July to 4 August 2024, where I developed a task management system with Microsoft PowerApps.",
    ...f("lalit-rakesh-internship-2024"),
  },
  {
    slug: "hindustan-platinum-internship-2024", cat: "internship",
    title: "Internship Certificate, Hindustan Platinum",
    short: "Hindustan Platinum, internship",
    issuer: "Hindustan Platinum Private Limited", date: "Jun 2024", sort: "2024-06",
    about: "An internship from May to June 2024, where I built a Python and Flask system that shows the live status of the company's networked digital weighing machines. It emails an alert when a machine stays unreachable for more than an hour, and it runs on the company's internal server.",
    redacted: true,
    ...f("hindustan-platinum-internship-2024"),
  },

  // Hackathons and awards ----------------------------------------------------
  {
    slug: "sih-2025-winner", cat: "hackathon", featured: true, project: "coast-scan",
    title: "National Winner, Smart India Hackathon 2025, Hardware Edition",
    short: "Smart India Hackathon 2025, National Winner",
    issuer: "Ministry of Education, AICTE and MoE's Innovation Cell", date: "Dec 2025", sort: "2025-12",
    about: "Our team was a National Winner at Smart India Hackathon 2025, Hardware Edition. The Grand Finale was held from 8 to 12 December 2025, with Sri Sairam Engineering College, Chennai as the nodal centre.",
    ...f("sih-2025-winner"),
  },
  {
    slug: "tetrathon-2026-fifth-rank", cat: "hackathon", featured: true, project: "edubridge-ai",
    title: "5th Place, TetraTHON 2026, Indo-French AI Innovation Sprint (Certificate of Achievement)",
    short: "TetraTHON 2026, 5th Place",
    issuer: "Navrachana University, Vadodara, with ISEN Méditerranée, France", date: "Aug 2026", sort: "2026-08",
    about: "Our team, The Caffeine Clause, won 5th Place, 5th of 44 finalist teams, at TetraTHON 2026, Indo-French AI Innovation Sprint. The 36-hour sprint was held from 31 July to 2 August 2026.",
    ...f("tetrathon-2026-fifth-rank"),
  },
  {
    slug: "vikas-saptah-hackathon-2025", cat: "hackathon", project: "urja-setu",
    title: "Top 50, SSIP Vikas Saptah Hackathon 2025 (Certificate of Participation)",
    short: "SSIP Vikas Saptah Hackathon 2025, Top 50",
    issuer: "SSIP 2.0, Education Department, Government of Gujarat", date: "Oct 2025", sort: "2025-10",
    about: "Our team was in the Top 50, out of 4,000+ teams, at the SSIP Vikas Saptah Hackathon 2025, held on 14 October 2025 at Pandit Deendayal Energy University, Gandhinagar.",
    ...f("vikas-saptah-hackathon-2025"),
  },
  {
    slug: "hackhound-3-2025", cat: "hackathon",
    title: "National Finalist, HackHound 3.0 (Certificate of Achievement)",
    short: "HackHound 3.0, National Finalist",
    issuer: "HackHound Club, SRM Institute of Science and Technology, Delhi NCR Campus", date: "Feb 2025", sort: "2025-02",
    about: "Our team was a national finalist at HackHound 3.0, a 24-hour national-level hackathon at SRM Institute of Science and Technology, Delhi NCR, on 27 and 28 February 2025. We built an AI learning recommender with a personalised dashboard and a progress roadmap.",
    verify: "https://certificate.givemycertificate.com/c/a3a8d146-385b-45a5-8fd6-05fea634061a",
    ...f("hackhound-3-2025"),
  },
  {
    slug: "indus-hackathon-2025", cat: "hackathon",
    title: "Offline Finalist, Indus Hackathon 2025 (Certificate of Participation)",
    short: "Indus Hackathon 2025, Offline Finalist",
    issuer: "Indus University, Ahmedabad", date: "Jan 2025", sort: "2025-01",
    about: "Our team was an offline finalist at Indus Hackathon 2025 at Indus University, Ahmedabad, on 31 January 2025, where we built Synapse, a hospital outpatient management system.",
    ...f("indus-hackathon-2025"),
  },
  {
    slug: "sih-2024-internal-first-place", cat: "hackathon",
    title: "1st Place, SIH 2024 internal round (Certificate of Achievement)",
    short: "SIH 2024 internal round, 1st Place",
    issuer: "GLS University, Faculty of Engineering and Technology", date: "Sep 2024", sort: "2024-09",
    about: "Our team placed 1st in the GLS University internal round of Smart India Hackathon 2024, held by the Faculty of Engineering and Technology on 13 September 2024.",
    ...f("sih-2024-internal-first-place"),
  },
  {
    slug: "youth-festival-2026-first-position", cat: "hackathon",
    title: "1st in Treasure Hunt (404: Treasure Not Found), Techno Games Championship, GLS Youth Festival 2026",
    short: "Treasure Hunt, 1st place",
    issuer: "GLS University", date: "2026", sort: "2026-03",
    about: "I placed 1st in Treasure Hunt (404: Treasure Not Found) at the Techno Games Championship, GLS Youth Festival 2026, for the Faculty of Engineering and Technology.",
    ...f("youth-festival-2026-first-position"),
  },
  {
    slug: "troubleshoot-ideathon-2025", cat: "hackathon",
    title: "Certificate of Participation, Troubleshoot Ideathon 2025",
    short: "Troubleshoot Ideathon 2025",
    issuer: "HASHTAG, JEMTEC, Greater Noida", date: "2025", sort: "2025-08",
    about: "I took part in Troubleshoot Ideathon 2025, organised by HASHTAG at JEMTEC.",
    verify: "https://certificate.givemycertificate.com/c/10c24c19-f4cf-4e02-9b16-cb458a290cc2",
    ...f("troubleshoot-ideathon-2025"),
  },

  // Research -----------------------------------------------------------------
  {
    slug: "icishct-2026-paper-presentation", cat: "research", featured: true,
    title: "Paper presentation, ICISHCT 2026 (Certificate of Paper Presentation)",
    short: "ICISHCT 2026, paper presentation",
    issuer: "Institute of Advanced Research, Gandhinagar", date: "Oct 2026", sort: "2026-10",
    about: "I presented our paper \"Marsquake Detection from Raw InSight Waveforms with a Hybrid Convolutional and Fourier Neural Operator\" at ICISHCT 2026, the International Conference on Intelligent, Secured and Human-Centered Technologies, on 29 and 30 October 2026.",
    ...f("icishct-2026-paper-presentation"),
  },

  // Courses and training -------------------------------------------------------
  {
    slug: "oracle-oci-ai-foundations-2025", cat: "course",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    short: "Oracle OCI 2025 AI Foundations Associate",
    issuer: "Oracle University", date: "Oct 2025", sort: "2025-10",
    about: "An Oracle certification in AI foundations on Oracle Cloud Infrastructure, awarded on 30 October 2025 and valid until 30 October 2027.",
    verify: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=BA983D960F2746105EBB578F3C04E527DCC043A1C5A6528DF926D3D56E429D91",
    ...f("oracle-oci-ai-foundations-2025"),
  },
  {
    slug: "deep-learning-codebasics", cat: "course",
    title: "Deep Learning: Beginner to Advanced",
    issuer: "Codebasics", date: "Sep 2026", sort: "2026-09",
    about: "A course on neural networks, CNNs, RNNs and transformers, with projects in PyTorch and a final exam passed with more than 70%.",
    verify: "https://codebasics.io/certificate/CB-85-556129",
    ...f("deep-learning-codebasics"),
  },
  {
    slug: "machine-learning-codebasics", cat: "course",
    title: "Master Machine Learning for Data Science & AI: Beginner to Advanced",
    short: "Master Machine Learning for Data Science & AI",
    issuer: "Codebasics", date: "Sep 2026", sort: "2026-09",
    about: "A course on machine learning, its maths and its practical use, with end-to-end projects and a final exam passed with more than 70%.",
    verify: "https://codebasics.io/certificate/CB-69-556129",
    ...f("machine-learning-codebasics"),
  },
  {
    slug: "python-data-professionals-2026", cat: "course",
    title: "Python: Beginner to Advanced for Data Professionals",
    issuer: "Codebasics", date: "Jan 2026", sort: "2026-01",
    about: "A Python course with two projects, a hospitality data analysis and an expense tracker, covering Pandas, FastAPI and Streamlit.",
    verify: "https://codebasics.io/certificate/CB-48-556129",
    ...f("python-data-professionals-2026"),
  },
  {
    slug: "sql-data-science-2026", cat: "course",
    title: "SQL for Data Science",
    issuer: "Codebasics", date: "Jan 2026", sort: "2026-01",
    about: "A hands-on SQL course on querying, filtering, aggregating and joining data across tables, with a final exam passed with more than 70%.",
    verify: "https://codebasics.io/certificate/CB-82-556129",
    ...f("sql-data-science-2026"),
  },
  {
    slug: "math-statistics-ai-2026", cat: "course",
    title: "Math and Statistics for AI, Data Science",
    short: "Math and Statistics for AI",
    issuer: "Codebasics", date: "Jan 2026", sort: "2026-01",
    about: "A course on maths and statistics, worked through business analytics tasks on a dataset of more than half a million records, with a final exam passed with more than 70%.",
    verify: "https://codebasics.io/certificate/CB-63-556129",
    ...f("math-statistics-ai-2026"),
  },
  {
    slug: "agile-scrum-master-2026", cat: "course",
    title: "Agile Scrum Master",
    issuer: "Simplilearn SkillUP", date: "Jul 2026", sort: "2026-07",
    about: "I completed the online course Agile Scrum Master on 23 July 2026.",
    verify: "https://simpli-web.app.link/e/NW3S3oLBy6b",
    ...f("agile-scrum-master-2026"),
  },
  {
    slug: "ide-bootcamp-2026", cat: "course", project: "coast-scan",
    title: "IDE Bootcamp, Edition 3, Phase 1 (Certificate of Participation)",
    short: "IDE Bootcamp, Edition 3, Phase 1",
    issuer: "AICTE, Ministry of Education, at GITAM University, Bengaluru", date: "Apr 2026", sort: "2026-04",
    about: "I took part in the IDE Bootcamp, Edition 3, Phase 1, an Innovation, Design and Entrepreneurship bootcamp, from 6 to 10 April 2026 at GITAM (Deemed to be) University, Bengaluru Campus, organised by AICTE.",
    ...f("ide-bootcamp-2026"),
  },
  {
    slug: "power-bi-workshop-2025", cat: "course",
    title: "Create a Dashboard with Power BI, workshop",
    short: "Power BI dashboard workshop",
    issuer: "Koenig Solutions and Microsoft Elevate, at GLS University", date: "Nov 2025", sort: "2025-11",
    about: "I attended the workshop \"Create a Dashboard with Power BI\" on 3 and 4 November 2025.",
    ...f("power-bi-workshop-2025"),
  },
  {
    slug: "green-skills-ai-2025", cat: "course",
    title: "Foundation Course on Green Skills and Artificial Intelligence",
    short: "Green Skills and AI, Skills4Future",
    issuer: "Edunet Foundation, AICTE and Shell India", date: "Jul 2025", sort: "2025-07",
    about: "A foundation course on green skills and artificial intelligence, completed under the Skills4Future Program at GLS University in July 2025.",
    verify: "https://skills4future.in/certificate-verification-master-deck/S4F25_178258",
    ...f("green-skills-ai-2025"),
  },
  {
    slug: "java-fundamentals-2024", cat: "course",
    title: "Fundamentals of Java Programming",
    issuer: "Board Infinity, on Coursera", date: "Jul 2024", sort: "2024-07",
    about: "An online course on the fundamentals of Java programming, completed on 31 July 2024.",
    verify: "https://www.coursera.org/account/accomplishments/verify/CJ6XY7T9C6N3",
    ...f("java-fundamentals-2024"),
  },

  // Appreciation and membership -------------------------------------------------
  {
    slug: "echo-2025-appreciation", cat: "recognition",
    title: "Appreciation for coordinating ECHO",
    issuer: "GLS University, Faculty of Engineering and Technology", date: "Mar 2025", sort: "2025-03",
    about: "A letter of appreciation for coordinating ECHO, the first literary event of the Ink and Imagination club at the Faculty of Engineering and Technology.",
    ...f("echo-2025-appreciation"),
  },
  {
    slug: "cybershadez-2026-appreciation", cat: "recognition",
    title: "Letter of Appreciation, CyberShadez 2026",
    short: "CyberShadez 2026, appreciation",
    issuer: "GLS University, Faculty of Engineering and Technology", date: "Feb 2026", sort: "2026-02",
    about: "As a student coordinator of CyberShadez 2026, I managed the Track 3 events, which had more than 300 participants. The letter also mentions the flagship event \"Rise of Agent\", which introduced students to automation with n8n.",
    redacted: true,
    ...f("cybershadez-2026-appreciation"),
  },
  {
    slug: "lalit-rakesh-appreciation-2024", cat: "recognition",
    title: "Appreciation Certificate, Lalit Rakesh & Associates",
    short: "Lalit Rakesh & Associates, appreciation",
    issuer: "Lalit Rakesh & Associates, Chartered Accountants", date: "Aug 2024", sort: "2024-08",
    about: "An appreciation certificate for the task management system I developed with Microsoft PowerApps during my one-month online internship.",
    redacted: true,
    ...f("lalit-rakesh-appreciation-2024"),
  },
  {
    slug: "gls-student-appreciation-2026", cat: "recognition",
    title: "Certificate of Appreciation, GLS University",
    short: "GLS University, student appreciation",
    issuer: "GLS University", date: "Feb 2026", sort: "2026-02",
    about: "A certificate from the university for outstanding performance and dedication as a student of GLS University.",
    ...f("gls-student-appreciation-2026"),
  },
  {
    slug: "coastscan-founder-2026", cat: "recognition", project: "coast-scan",
    title: "Certificate of Appreciation, founder of CoastScan",
    short: "CoastScan, founder certificate",
    issuer: "SSIP GLS University Incubation Centre", date: "Mar 2026", sort: "2026-03",
    about: "A certificate naming me a founder of CoastScan, in recognition of the startup idea.",
    ...f("coastscan-founder-2026"),
  },
  {
    slug: "gls-startup-nexus-2026", cat: "recognition", project: "coast-scan",
    title: "Certificate of Appreciation, GLS Startup Nexus",
    short: "GLS Startup Nexus 2026",
    issuer: "SSIP GLS University Incubation Centre", date: "Mar 2026", sort: "2026-03",
    about: "A certificate for taking part in the GLS Startup Nexus and presenting CoastScan.",
    ...f("gls-startup-nexus-2026"),
  },
  {
    slug: "ieee-membership-2026", cat: "recognition",
    title: "2026 Certificate of IEEE Membership",
    short: "IEEE Student Member",
    issuer: "IEEE", date: "2026", sort: "2026-01",
    about: "IEEE recognises me as a Student Member in good standing through December 2026.",
    ...f("ieee-membership-2026"),
  },

  // News and photos ----------------------------------------------------------------
  {
    slug: "ahmedabad-mirror-sih-2025", cat: "media", kind: "article", project: "coast-scan",
    title: "Ahmedabad Mirror, on our Smart India Hackathon 2025 win",
    short: "Ahmedabad Mirror feature",
    issuer: "Ahmedabad Mirror", date: "Dec 2025", sort: "2025-12",
    about: "A news story on the GLS University team that won Smart India Hackathon 2025 in Chennai with Coast Scan, with a cash prize of Rs 1.5 lakh.",
    ...f("ahmedabad-mirror-sih-2025"),
  },
  {
    slug: "gls-voice-isro-feature-2026", cat: "media", kind: "article",
    title: "GLS Voice, on our selection for ISRO",
    short: "GLS Voice feature",
    issuer: "GLS Voice, Gujarat Law Society", date: "Jul 2026", sort: "2026-07",
    about: "The July and August 2026 issue of the university newsletter reported that we were selected for internship opportunities at ISRO, Ahmedabad.",
    ...f("gls-voice-isro-feature-2026"),
  },
  {
    slug: "sih-2025-grand-finale-photo", cat: "media", kind: "photo", project: "coast-scan",
    title: "Smart India Hackathon 2025, Hardware Edition, Grand Finale",
    short: "SIH 2025 Grand Finale, photo",
    issuer: "Sri Sairam Engineering College, Chennai", date: "Dec 2025", sort: "2025-12",
    about: "Our team at the Hardware Edition Grand Finale, with the winner's cheque and trophies.",
    ...f("sih-2025-grand-finale-photo", "jpg"),
  },
  {
    slug: "vikas-saptah-2025-team-photo", cat: "media", kind: "photo", project: "urja-setu",
    title: "SSIP Vikas Saptah Hackathon 2025",
    short: "SSIP Vikas Saptah Hackathon 2025, team photo",
    issuer: "PDEU, Gandhinagar", date: "Oct 2025", sort: "2025-10",
    about: "Our team with our participation certificates at the SSIP Vikas Saptah Hackathon 2025.",
    ...f("vikas-saptah-2025-team-photo", "jpg"),
  },
  {
    slug: "youth-festival-2026-trophies-photo", cat: "media", kind: "photo",
    title: "Techno Games Championship trophies, GLS Youth Festival 2026",
    short: "Techno Games Championship trophies, photo",
    issuer: "GLS University", date: "2026", sort: "2026-03",
    about: "Me with the trophies from the Techno Games Championship, GLS Youth Festival 2026, including the overall championship trophy and the trophy for 1st in Treasure Hunt (404: Treasure Not Found).",
    ...f("youth-festival-2026-trophies-photo", "jpg"),
  },
];

// Only documents that have a file or an issuer link are published.
export const documents = all
  .filter((d) => d.file || d.verify)
  .map((d) => ({ ...d, short: d.short || d.title, href: `/certificates/${d.slug}` }));

export const docBySlug = (slug) => documents.find((d) => d.slug === slug);

// The page address of a document, or null if it is not published yet.
export const docLink = (slug) => (docBySlug(slug) ? `/certificates/${slug}` : null);

const catOrder = categories.map((c) => c.id);
export const sortedDocuments = [...documents].sort(
  (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || catOrder.indexOf(a.cat) - catOrder.indexOf(b.cat) || (b.sort || "").localeCompare(a.sort || ""),
);

export const categoryLabel = (id) => (categories.find((c) => c.id === id) || {}).label || "";
