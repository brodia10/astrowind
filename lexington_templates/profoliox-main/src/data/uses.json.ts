export interface Template {
  description: string;
  title: string;
};
const toolOne: Template = {
    title: "Dell XPS 15",
  description: "A powerful laptop with a 15.6-inch display, Intel Core i7 or i9 processors, up to 64GB of RAM, and dedicated graphics options.",
};
const toolTwo: Template = {
    title: "HP Spectre x360",
  description: "A versatile 2-in-1 laptop with a 15.6-inch touchscreen display, up to 11th Gen Intel Core i7 processor, up to 16GB of RAM, and dedicated graphics options.",
};
const toolThree: Template = {
    title: "Lenovo ThinkPad X1 Extreme",
  description: "A high-performance laptop with a 15.6-inch display, up to 11th Gen Intel Core i9 processor, up to 64GB of RAM, and dedicated graphics options.",
};
const toolFour: Template = {
    title: "ASUS ZenBook Pro Duo",
  description: "A unique laptop with a 15.6-inch primary display and a secondary 14-inch touchscreen display above the keyboard, Intel Core i9 processor, up to 32GB of RAM, and dedicated graphics options.",
};
const toolFive: Template = {
    title: "VS Code",
  description: "A popular and versatile text editor with extensive customization options and an extensive library of plugins and extensions.",
};
const toolSix: Template = {
    title: "GNOME Terminal",
  description: "A terminal emulator for Linux systems with advanced features and customizable color schemes.",
};
const toolSeven: Template = {
    title: "DBeaver",
  description: "A free, multi-platform database management tool with support for a wide range of databases and features for visualizing and editing data.",
};
const toolEight: Template = {
    title: "LaunchBar",
  description: "Another application launcher that allows you to search, navigate and manage files and contacts on your Mac more efficiently.",
};
const toolNine: Template = {
    title: "Quicksilver",
  description: "A free and open-source application launcher that allows you to perform tasks with just a few keystrokes.",
};
const toolTen: Template = {
    title: "uBar",
  description: "A dock replacement application that allows you to switch between applications, open documents, and more.",
};
export const byName = {
  toolOne,
  toolTwo,
  toolThree,
    toolFour,
    toolFive,
    toolSix,
    toolSeven,
    toolEight,
    toolNine,
    toolTen,

};
export const tool = Object.values(byName);
