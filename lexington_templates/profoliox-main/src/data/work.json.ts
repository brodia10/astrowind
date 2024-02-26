export interface Template {
  url: string;
  description: string;
  title: string;
  avatar: string;
};
const workOne: Template = {
  url: "https://windstatic.com/",
  description: "A set of 161 elements & layouts made with Tailwind CSS and Alpine.js",
  avatar: "/windstatic.svg",
  title: "Windstatic",
};
const workTwo: Template = {
  url: "https://lexingtonthemes.com/",
  description: "Outstanding themes and UI Kits made with Astro & Tailwind CSS",
  avatar: "/lexington.svg",
  title: "Lexington Themes",
};
const workThree: Template = {
  url: "https://www.figma.com/community/file/1284100224206308057/figmax90",
  description: "Old School covers for your Figma projects",
  avatar: "/figmax.svg",
  title: "FigMax90",
};
const workfour: Template = {
  url: "https://www.figma.com/community/file/1254393856683700911/onda",
  description: "A set of wave wallpapers in 5k and mobile resolution to use on your design projects",
  avatar: "/onda.svg",
  title: "Onda",
};
export const byName = {
  workOne,
  workTwo,
  workThree,
  workfour,
};
export const work = Object.values(byName);
