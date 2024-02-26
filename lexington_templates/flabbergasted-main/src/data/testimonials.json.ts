export interface Template {
  name: string;
  work: string;
  text: string;
  image: string;
};
const david: Template = {
  name: "David Gutierrez",
  work: "Creator of @nocodegallery",
  text: "Really dope! These are ACTUAL good themes. Unlike some other sites that just rush shit out the door.",
  image: "/images/reviews/chris.jpg",
};
const joe: Template = {
  name: "Joe Ashwell",
  work: "Building seoship.io",
  text: "Such a huge fan of this collection! Outstanding job by @michael_andreuzza. Brilliant designer and maker!",
  image: "/images/reviews/joe.avif",
};
const eelco: Template = {
  name: "Eelco Wiersma",
  work: "Creator of saas-ui.dev",
  text: "The amount of work and dedication put into this is insane and you can see it, well done!",
  image: "/images/reviews/eelco.avif",
};
const toast: Template = {
  name: "Chief Toast Officer",
  work: "Creator of lemondrop.app",
  text: "These are some excellent themes if you're in the market.",
  image: "/images/reviews/toast.jpg",
};
const adham: Template = {
  name: "Adham Dannaway",
  work: "practical-ui.com",
  text: "Great work Michael!",
  image: "/images/reviews/adham.jpeg",
};
const alonso: Template = {
  name: "Alonso",
  work: "Entrepreneur",
  text: "Amazing resource using @astrodotbuild and @tailwindcss! I got it a week ago and have found the contents really useful. 5/5",
  image: "/images/reviews/alonso.jpg",
};
const stuart: Template = {
  name: "Stuart",
  work: "Creator of saasydb.com",
  text: "I bought a beautiful theme from Lexington a couple weeks ago. I didn't know Astro at the time, but Michael helped me get set up and really went above and beyond with his support. Now I'm happily redoing my site to look gorgeous with his template.",
  image: "/images/reviews/stuart.png",
};
const graeme: Template = {
  name: "Graeme  Fulton ",
  work: "Making Prototypr.io and Letter",
  text: "Awesome work Michael!",
  image: "/images/reviews/graeme.avif",
};
const davidGutierrez: Template = {
  name: "David",
  work: "Founder of make.to ",
  text: "The Lexington themes are no usual themes: they're well done, professional, minimal and Michael has clearly put effort into every detail making them, IMO, one of the best Tailwind theme bundles that exist.",
  image: "/images/reviews/davidgutierrez.avif",
};
const bakermono: Template = {
  name: "Bakermono Fra",
  work: "Musician, designer, developer.",
  text: "Well well done, arguably among the best themes and UI kits out there!",
  image: "/images/reviews/bakermono.avif",
};
const luiseduardo: Template = {
  name: "Luis Eduardo Augusto Uyejara",
  work: "Founder @manifiesto_dao",
  text: "I have been a keen follower of Michael's work for the past 6 months and I am truly impressed by his aesthetics, functionality, and design consistency.With the help of Lexington themes, building any digital product you desire becomes a piece of cake using their versatile building blocks!",
  image: "/images/reviews/chinoa.jpg",
};
export const byName = {
  david,
  alonso,
  adham,
  luiseduardo,
  eelco,
  davidGutierrez,
  joe,
    toast,
  stuart,
  graeme,
  bakermono,
};
export const reviews = Object.values(byName);
