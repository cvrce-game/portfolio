import * as XLSX from "xlsx";

/* ================= DATE UTILS ================= */

export function calculateFromString(dateStr) {
  const [monthStr, yearStr] = dateStr.split(" ");
  const monthMap = {
    Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6,
    Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12
  };
  return calculateDuration(monthMap[monthStr], Number(yearStr));
}

function calculateDuration(startMonth, startYear) {
  const startDate = new Date(startYear, startMonth - 1);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} yr ${months} mos`;
}

/* ================= EXCEL READER ================= */

const SHEET_ID = "1aA6CSyPmdR4Qwn1wgyCRJR6oFIbZ0Mip";
const EXCEL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`;

export async function readSkillsFromDrive() {
  const res = await fetch(EXCEL_URL);
  const buffer = await res.arrayBuffer();

  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet); // [{title,name,image}]

  return transformSkills(rows);
}

/* ================= TRANSFORM ================= */

const map = {};
function transformSkills(rows) {

  rows.forEach(({ Category, Skill, image }) => {
    if (!Category || !Skill || !image) return;

    if (!map[Category]) {
      map[Category] = { skills: [] };
    }

    map[Category].skills.push({ name: Skill, image });
  });

  return map;
}
function getSkills(data) {
  return data?.skills || [];
}
readSkillsFromDrive();

export const Bio = {
  name: "Papun Mohapatra",
  roles: [
    "Full Stack Developer",
    "Angular/React Developer",
    "Java 8 Certified",
    "Programmer",
  ],
  description:
    "I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.",
  github: "https://github.com/cvrce-game",
  resume:
    "https://drive.google.com/file/d/1Ch8I0C1j1ChRxO2PtXeF-DbailJZkobi/view?usp=drive_link",
  linkedin: "https://www.linkedin.com/in/papun-kumar-mohapatra/",
  insta: "https://www.instagram.com/iam_papun/",
  facebook: "https://www.facebook.com/papund.rockstr/",
};

export const skills = [
  {
    title: "Frontend",
    skills: getSkills(map["Frontend"]),
  },
  {
    title: "Backend",
    skills: getSkills(map["Frontend"])
  },
  {
    title: "Devops",
    skills: [
      {
        name: "Docker",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQKd_MRed_mZQlgrzQuUXVA3P39ssOVX8_g&s",
      },
      {
        name: "Kubernetes",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPKA-U9m5BxYQDF1O7atMfj9EMMXEoGu4t0Q&s",
      },
      {
        name: "Azure",
        image:
          "https://www.svgrepo.com/show/331302/azure-v2.svg",
      },
    ],
  },
  {
    title: "Others",
    skills: [
      {
        name: "DSA",
        image:
          "https://cdn-icons-png.flaticon.com/512/10484/10484359.png",
      },
      {
        name: "Redis",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Logo-redis.svg/960px-Logo-redis.svg.png",
      },
      {
        name: "Kafka",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSnImQdlGGJb_vj3hDJiuTedDU3n0VV54ysA&s",
      },
      {
        name: "GitHub",
        image:
          "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      },
      {
        name: "Eclipse",
        image:
          "https://www.svgrepo.com/show/353685/eclipse-icon.svg",
      },
      {
        name: "VS Code",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png?20210804221519",
      },
      {
        name: "Postman",
        image: "https://logowik.com/content/uploads/images/postman-api-platform6643.logowik.com.webp"
      },
      {
        name: "Figma",
        image: "https://cdn.iconscout.com/icon/free/png-256/free-figma-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-3-pack-logos-icons-3030133.png"
      },
    ],
  },
];

export const experiences = [
  {
    id: 1,
    img: "https://www.vhv.rs/dpng/d/492-4925954_deloitte-logo-deloitte-hd-png-download.png",
    role: "Senior Consultant",
    company: "Deloitte Consulting USI",
    date: `Apr 2024 - Present · ${calculateFromString("Apr 2024")}`,
    desc: "JavaScript, React, .Net, Jira, Project Management",
    projectName: "State of Florida Worker Portal – Underwriting Ecosystem Modernization",
    projectDescription: "Led end to end development modernization and architectural overhaul of the State of Florida's critical public assistance portal. This enterprise-scale ecosystem serves as the central hub for Floridians to apply for and manage vital benefits, including SNAP (Food Stamps), Medicaid, and TANF (Cash Assistance). The initiative focused on transforming the legacy system into a responsive, accessible, and high-performance web and mobile interface, streamlining the application process for millions of residents and enhancing workflow efficiency for state caseworkers.",
    skills: [
      "Technical Leadership & Architecture: Served as the Senior developer, designing the core structure to ensure scalability and performance. Established coding standards and best practices for the development team.",
      "Component System Design: Led the development of a robust 'Common Component' library, creating reusable UI elements that standardized the look and feel across the application and accelerated feature delivery.",
      "Complex UI Development: Engineered high-performance data tables and grids capable of rendering large datasets efficiently, optimizing the underwriting workflow for internal users.",
      "Team Management (Onshore/Offshore): Managed the daily operations of a distributed hybrid team. Conducted daily stand-ups to synchronize onshore business requirements with offshore development cycles, ensuring 24-hour productivity.",
      "Risk & Blocker Resolution: Acted as the primary technical point of contact during executive SOS calls. Proactively raised risks regarding timelines or dependencies and provided immediate technical solutions to resolve critical blockers.",
      "Mentorship: Conducted code reviews and provided technical guidance to developers, ensuring high-quality deliverables and adherence to architectural guidelines."
    ],
  },
  {
    id: 2,
    img: "https://www.vhv.rs/dpng/d/492-4925954_deloitte-logo-deloitte-hd-png-download.png",
    role: "Consultant",
    company: "Deloitte Consulting USI",
    date: "April 2019 - April 2022",
    desc: "JavaScript, Angular",
    projectName: "HPE Enterprise Master Data Management (MDM) Solution",
    projectDescription: "Served as a Full Stack Technical Lead for an enterprise-grade MDM solution designed to establish a 'Single Source of Truth' (Golden Record) for critical business data. The system consolidated disparate data streams from legacy ERP systems (SAP, Siebel) and cloud infrastructure (HPE GreenLake) to ensure uniformity across Customer, Product, and Supplier domains. The project delivered a high-performance web portal that enabled Data Stewards to visualize data lineage, resolve conflicts, and enforce governance policies.",
    skills: [
      "Full Stack Development: Developed and maintained features for web-based applications using Angular for the frontend and Java (Spring Boot) for the backend. Implemented RESTful APIs and integrated them with the UI to support seamless data flow.",
      "UI Component Implementation: Built and styled reusable UI components and data tables in Angular, following design mocks and 'Atomic Design' principles to ensure a consistent user experience.",
      "Backend Logic & Database: Wrote business logic in Java and assisted with Hibernate mappings. Optimized SQL queries for Oracle and DB2 databases to efficiently retrieve benefit plan data.",
      "Production Support & Monitoring: Monitored application health using Dynatrace and PCF logs. Identified and resolved bugs, exceptions, and performance issues to ensure system stability.",
      "Agile Participation: Actively participated in daily stand-ups, sprint planning, and code reviews. Collaborated with senior developers to refine requirements and adhere to coding standards and best practices."
    ],
  },
  {
    id: 3,
    img: "https://www.vhv.rs/dpng/d/492-4925954_deloitte-logo-deloitte-hd-png-download.png",
    role: "Analyst",
    company: "Deloitte Consulting USI",
    date: "Dec 2017 - May 2019",
    desc: "Java, Spring Boot, Hibernate, Angular, JavaScript, MySql",
    projectName: "HCSC Claims Modernization – Benefit Data Management (BDM)",
    projectDescription: "Contributed to a multi-year initiative to modernize the claims processing and benefit coding platform for HCSC. The project focused on the Benefit Data Management (BDM) system, which handles the coding of insurance plans to support accurate claims adjudication. The effort involved migrating legacy data and logic to a modern full-stack architecture to improve the flexibility and efficiency of benefit administration.",
    skills: [
      "Full Stack Development: Developed and maintained features for web-based applications using Angular for the frontend and Java (Spring Boot) for the backend. Implemented RESTful APIs and integrated them with the UI to support seamless data flow.",
      "UI Component Implementation: Built and styled reusable UI components and data tables in Angular, following design mocks and 'Atomic Design' principles to ensure a consistent user experience.",
      "Backend Logic & Database: Wrote business logic in Java and assisted with Hibernate mappings. Optimized SQL queries for Oracle and DB2 databases to efficiently retrieve benefit plan data.",
      "Production Support & Monitoring: Monitored application health using Dynatrace and PCF logs. Identified and resolved bugs, exceptions, and performance issues to ensure system stability.",
      "Agile Participation: Actively participated in daily stand-ups, sprint planning, and code reviews. Collaborated with senior developers to refine requirements and adhere to coding standards and best practices."
    ],
  }
];

export const education = [
  {
    id: 0,
    img: "https://college4u.in/wp-content/uploads/2017/01/cv.jpg",
    school: "CV RAMAN College of Engineering Bhubaneswar",
    date: "April 2013 - Aug 2017",
    grade: "7.211 CGPA",
    desc: "I completed my Bachelor's degree in Computer Science and Engineering at C.V. RAMAN College of engineering, Bhubaneswar. I have taken courses in Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks, among others. I am also a member of the Google Developers Student Club (GDSC) at KIIT, where I am learning and working on exciting projects with a team of talented developers.",
    degree: "Bachelor of Technology - BTech, Computer Science and Engineering",
  },
  {
    id: 1,
    img: "https://firebasestorage.googleapis.com/v0/b/flexi-coding.appspot.com/o/methodist.png?alt=media&token=018a1b18-e2dd-4f34-8855-cff1b6b69fd3",
    school: "Rajdhani Junior College, Bhubaneswar",
    date: "Apr 2011 - Apr 2013",
    grade: "54.6%",
    desc: "I completed my class 12 high school education at Rajdhani Junior College, Bhubaneswar.",
    degree: "CHSE",
  },
  {
    id: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqH0XLwkgwFitc2TdmN_HzBhnm8UejNoHTDQ&s",
    school: "Govt. High School, C.S.PUR, Phase-1, Bhubaneswar",
    date: "Apr 2001 - Apr 2011",
    grade: "84.6%",
    desc: "I completed my class 10 education at Govt. High School, C.S.PUR, Phase-1, Bhubaneswar.",
    degree: "BSE",
  },
];


export const TimeLineData = [
  { year: 2017, text: "Started my journey" },
  { year: 2018, text: "Worked as a freelance developer" },
  { year: 2019, text: "Founded JavaScript Mastery" },
  { year: 2020, text: "Shared my projects with the world" },
  { year: 2021, text: "Started my own platform" },
];

export const awards = [
  {
    id: 1,
    title: "Case 360 Leadership Award",
    description: "Awarded for outstanding contributions to the State of Florida Worker Portal project, demonstrating exceptional technical leadership and architectural design.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXC-EWh_OjjKnVyb-I2iXuInrVYBjgV9oHQ&s",
    category: "Outstanding award",
    date: "2025",
    tags: ["Leadership", "Architecture", "Innovation"],
    pdf: "https://drive.google.com/file/d/1tH7pH9QF6-m2s595uYdK-PQzlB3MTeqg/preview?embedded=true",
  },
  {
    id: 2,
    title: "CPTS Leadership",
    description: "Though CPTS module was entirely owned by onsite, Papun has led CPTS team from offshore to help onsite team in the need of the hour. He has daily interacted with onsite Manager, understood the functionality, led new onboarded developers and fixed 56 defects to make sure there is no impact on UAT/Go-Live delivery.",
    img: "https://thumbs.dreamstime.com/b/business-man-hold-trophy-showing-success-receiving-award-city-background-champion-golden-winner-185927878.jpg",
    category: "Applause Award",
    date: "2024",
    tags: ["Team Management", "Mentorship"],
    pdf: "https://drive.google.com/file/d/1VFsuPJkRcLXNH86mTv2YGR2L3ANhITog/preview?embedded=true",
  },
  {
    id: 3,
    title: "AI Innovation",
    description: "Awarded for leading ADI Sonar, Code Coverage, and enhancement/defect fixes from USI, along with delivering critical PA Lite–related changes essential for the upcoming Case 360 and Wizard releases. Additionally, he designed and developed the framework left navigation component.",
    img: "https://www.davidpr.com/wp-content/uploads/2014/03/how-to-promote-your-business-award.png",
    category: "Applause Award",
    date: "2024",
    tags: ["AI Integration", "Optimization", "Quality"],
    pdf: "https://drive.google.com/file/d/1fD8WVo2cjJ9yVVEm4WKuHm5WzR6Z0pjY/preview?embedded=true",
  },
  {
    id: 4,
    title: "Frontend Excellence",
    description: "Awarded for exceptional performance as a Team Lead for client-side development. Spearheaded the client framework setup through strategic collaboration with the LIFT team and delivered multiple complex React use cases in strict adherence to coding guidelines. Recognized for technical excellence in mentorship, conducting rigorous code reviews, and resolving critical technical blockers for junior developers.",
    img: "https://static.wixstatic.com/media/ffcf36_45ace84400034640a7a27da1a6a9b977~mv2.png/v1/fill/w_568,h_378,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ffcf36_45ace84400034640a7a27da1a6a9b977~mv2.png",
    category: "Applause Award",
    date: "2023",
    tags: ["Mentor", "Optimization", "Quality"],
    pdf: "https://drive.google.com/file/d/1cQTRZihEjV2-xjHW59rmkD5tucY_GtjN/preview?embedded=true",
  },
  {
    id: 5,
    title: "HPE Leadership",
    description: "Awarded for commitment and dedication in contributing to the HPE program.",
    img: "https://www.shutterstock.com/image-photo/hand-holding-trophy-achievement-victory-600nw-2575465361.jpg",
    category: "Applause Award",
    date: "2022",
    tags: ["developer", "trailblazer", "commitment"],
    pdf: "https://drive.google.com/file/d/1bwCN3Kyz3Q5Xiz1JiK_DqPDHnc9omEW4/preview?embedded=true",
  },
  {
    id: 6,
    title: "Outstanding Performance for HPE Program",
    description: "Awarded for commitment and dedication in contributing to the HPE program.",
    img: "https://www.isbr.in/blogs/wp-content/uploads/2021/05/ISBR-Award-Winning.jpg",
    category: "Applause Award",
    date: "2021",
    tags: ["developer", "trailblazer", "commitment"],
    pdf: "https://drive.google.com/file/d/18MmDHKFVbQRqGkCAICJsCKNlLpi9WwKx/preview?embedded=true",
  },
];

