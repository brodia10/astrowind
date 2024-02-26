export interface Template {
  type: string;
  url: string;
  price: string;
  image: string;
  name: string;
};
const productOne: Template = {
  name: "Diagonal",
  price: "3",
  url: "/product-page",
  image: "https://d33wubrfki0l68.cloudfront.net/8fe313ec592eafa959228fd9162deb170f1d5e75/dbc23/diagonal.svg",
  type: "28 Dark mesh wallpapers to use on your projects or as wallpapers",
};
const productTwo: Template = {
    name: "Monoqrom",
    price: "49",
    image: "https://d33wubrfki0l68.cloudfront.net/0933339d27448f9092419e54a0467f572c738cca/14ea7/monoqrom.svg",
  url: "/product-page",
  type: "Quick method to start your design projects in Figma and Tailwind CSS.",
};
const productThree: Template = {
    name: "Onda",
    price: "3",
    image: "https://d33wubrfki0l68.cloudfront.net/db2f42bf8d19088607647992aebbc20852cc92f8/7b22d/onda.svg",
  url: "/product-page",
  type: "16 Wave wallpapers to use on your projects or as wallpapers",
};
const productFour: Template = {
    name: "Onda",
    price: "0",
    image: "https://d33wubrfki0l68.cloudfront.net/a7217a59cfb9cbd6a017994e32d6db314e00a492/7b4a1/figmax.svg",
  url: "/product-page",
  type: "A set of Figma covers inspired on 90's VHS Covers",
};
export const byName = {
  productOne,
    productTwo,
    productThree,
  productFour,
};
export const store = Object.values(byName);
