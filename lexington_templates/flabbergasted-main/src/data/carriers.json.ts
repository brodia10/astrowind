export interface Template {
  link: string;
  date: string;
  role: string;
  name: string;
  location: string;

  salary: string;

};
const jobOne: Template = {
  link: "/carriers/carrier-info",
  name: "Lexington Themes",
  date: "01/03/2023",
  role: "Developer",
  location: "Yokohama",
  salary: "$440,000 - $680,000",

};
const jobTwo: Template = {
  link: "/carriers/carrier-info",
  name: "Unwrapped Design",
  date: "12/30/2023",
  role: "Rectangle designer",
  location: "Singapore or Remote",
  salary: "Good luck with that",

};
const jobThree: Template = {
  link: "/carriers/carrier-info",
  name: "Windstatic",
  date: "04/04/2023",
  role: "Components developer",
  location: "Remote",
  salary: "$1000 x Component",

};
const jobFour: Template = {
  link: "/carriers/carrier-info",
  name: "Tech Savvy Co.",
  date: "06/15/2023",
  role: "Digital Wizard",
  location: "Magical Office",
  salary: "Pot of Gold + Unicorn Hugs",
};

const jobFive: Template = {
  link: "/carriers/carrier-info",
  name: "Candy Crunchers Inc.",
  date: "07/30/2023",
  role: "Chief Candy Taster",
  location: "Candyland",
  salary: "Candies Galore + Dental Coverage",
};

const jobSix: Template = {
  link: "/carriers/carrier-info",
  name: "Galactic Innovators",
  date: "09/21/2023",
  role: "Space Explorer",
  location: "Deep Space",
  salary: "Stardust + Alien Encounters",
};

const jobSeven: Template = {
  link: "/carriers/carrier-info",
  name: "Pizza Lovers United",
  date: "10/12/2023",
  role: "Pizza Connoisseur",
  location: "Pizza Paradise",
  salary: "Endless Pizza Slices + Free Nap Time",
};

const jobEight: Template = {
  link: "/carriers/carrier-info",
  name: "The Punderful Agency",
  date: "12/01/2023",
  role: "Master Punster",
  location: "Punville",
  salary: "Puns + More Puns",
};

const jobNine: Template = {
  link: "/carriers/carrier-info",
  name: "Safari Seekers Ltd.",
  date: "02/14/2024",
  role: "Adventurous Explorer",
  location: "Wild Wilderness",
  salary: "Adventure + Wildlife Encounters",
};



export const byName = {
  jobOne,
  jobTwo,
  jobThree,
  jobFour,
  jobFive,
  jobSix,
  jobSeven,
  jobEight,
  jobNine,


};
export const carriers = Object.values(byName);
