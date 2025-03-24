import { v4 } from "uuid";
import defaultProfilePic from "../assets/images/default-profile-pic.jpeg";

const exampleCV = {
  personalInfo: {
    first: "",
    last: "",
    desc: "",
    profileImg: defaultProfilePic,
    location: "",
    phone: "",
    eMail: "",
    website: "",
    skills: [],
  },
  education: [
    {
      id: v4(),
      degree: "",
      date: "",
    },
  ],
  work: [
    {
      id: v4(),
      position: "",
      date: "",
      desc: "",
    },
  ],
  projects: [
    {
      id: v4(),
      projectTitle: "",
      date: "",
      desc: "",
    },
  ],
  sidebarColor: "#293241",
  mainFontColor: "#293241",
  sidebarFontColor: "#ECF0F1",
};

export default exampleCV;
