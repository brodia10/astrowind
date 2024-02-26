export interface Template {
  projectUrl: string;
  description: string;
  title: string;
  image: string;
  projectImage1: string;
  projectImage2: string;
  projectImage3: string;
  projectImage4: string;
};
const workOne: Template = {
  projectUrl: "/case-study",
  title: "Navy",
  description: "The most elegant theme on Lexington, designed for those who wants an elegant dark mode, sleek elements and beautiful websites. ",
  image: "https://lexingtonthemes.com/navy.webp",
 projectImage1: "https://lexingtonthemes.com/images/thumbnails/navy/one.png",
  projectImage2: "https://lexingtonthemes.com/images/thumbnails/navy/two.png",
  projectImage3: "https://lexingtonthemes.com/images/thumbnails/navy/three.png",
  projectImage4: "https://lexingtonthemes.com/images/thumbnails/navy/four.png",
};
const workTwo: Template = {
    projectUrl: "/case-study",
    title: "Flabbergasted",
  image: "https://lexingtonthemes.com/flabbergasted.webp",
  description: "The Neo-brutalist theme on Lexington is designed for those who want to set themselves apart from the crowd. ",
  projectImage1: "https://lexingtonthemes.com/images/thumbnails/flabbergasted/one.png",
  projectImage2: "https://lexingtonthemes.com/images/thumbnails/flabbergasted/two.png",
  projectImage3: "https://lexingtonthemes.com/images/thumbnails/flabbergasted/three.png",
  projectImage4: "https://lexingtonthemes.com/images/thumbnails/flabbergasted/four.png",
};
const workThree: Template = {
  projectUrl: "/case-study",
    title: "Vanta",
  image: "https://lexingtonthemes.com/vanta.webp",
  description: "The sleekest e-learning platform theme around. For those who want to have a modern and dark theme.",
  projectImage1: "https://lexingtonthemes.com/images/thumbnails/vanta/one.png",
  projectImage2: "https://lexingtonthemes.com/images/thumbnails/vanta/two.png",
  projectImage3: "https://lexingtonthemes.com/images/thumbnails/vanta/three.png",
  projectImage4: "https://lexingtonthemes.com/images/thumbnails/vanta/four.png",
};
const workfour: Template = {
  projectUrl: "/case-study",
  title: "Simplexity",
image: "https://lexingtonthemes.com/simplexity.webp",
description: "TThe clean and elegant light and dark blog theme on Lexington, designed for those who likes minimalism and a simplicity on elements and websites.",
projectImage1: "https://lexingtonthemes.com/images/thumbnails/simplexity/one.png",
projectImage2: "https://lexingtonthemes.com/images/thumbnails/simplexity/two.png",
projectImage3: "https://lexingtonthemes.com/images/thumbnails/simplexity/three.png",
projectImage4: "https://lexingtonthemes.com/images/thumbnails/simplexity/four.png",
};
export const byName = {
  workOne,
  workTwo,
  workThree,
  workfour,
};
export const work = Object.values(byName);
