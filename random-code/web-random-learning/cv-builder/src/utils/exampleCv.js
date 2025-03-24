/*--------------------------------------------------------------*/

import { v4 } from "uuid";
import exampleProfilePic from "../assets/images/example-profile-pic.jpeg";

/*--------------------------------------------------------------*/

const exampleCV = {
  personalInfo: {
    first: "Phillip",
    last: "Gonzalez",
    desc: "Software Engineer with 7 years of experience in building high-load mobile applications. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
    profileImg: exampleProfilePic,
    location: "Phoenix, AZ",
    phone: "(123) 456 7890",
    eMail: "pgonzalez@email.com",
    website: "github.com",
    skills: [
      "Unity",
      "C#",
      "JavaScript",
      "Microservices",
      "AWS",
      "Drupal",
      "PHP",
    ],
  },
  education: [
    {
      id: v4(),
      degree: "BA Software Engineering",
      date: "Sep '10 - Dec '14",
      school: "University of Arizona",
    },
    {
      id: v4(),
      degree: "BA Software Engineering",
      date: "Sep '10 - Dec '14",
      school: "University of Arizona",
    },
  ],

  work: [
    {
      id: v4(),
      position: "Blanchette / Senior Software Engineer",
      date: "Sep '10 - Dec '14",
      desc: "Led a team of 9 engineers to design and implement an error analysis solution that reduced the development to production time for the mobile department by 35%. As a part of 3-engineer unit developed Kowat messaging platform optimized for 10M+ daily active users 24/7. Designed and developed web based portal for processing customer commissions which resulted in 13% indirect sales uptick within the first 3 months. Technology used: Docker, Python, Django, Java, Microservices, PostgreSQL",
    },
    {
      id: v4(),
      position: "Johnston Ltd / Software Developer",
      date: "Sep '10 - Dec '14",
      desc: "Redesigned an intranet business application to work custom business forms, which reduced the total amount of business service tickets by 40%. Upgraded legacy QA test environment that allowed the company to include unit testing as part of one-week Scrum sprints. Integrated sales reports and CRM system with DataOps solution, presenting all C-level executives across 25 branches with real-time dashboards on sales KPI",
    },
  ],
  projects: [
    {
      id: v4(),
      projectTitle: "Lorem ipsum dolor sit amet ",
      date: "March 2020",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: v4(),
      projectTitle: "Lorem ipsum dolor sit amet ",
      date: "March 2020",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: v4(),
      projectTitle: "Lorem ipsum dolor sit amet ",
      date: "March 2020",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ],
  sidebarColor: "#293241",
  mainFontColor: "#293241",
  sidebarFontColor: "#ECF0F1",
};

/*--------------------------------------------------------------*/
export default exampleCV;
/*--------------------------------------------------------------*/
