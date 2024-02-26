export interface Template {

  description: string;
  link: string;
  image: string;
};
const one: Template = {

  description: "I was skeptical at first, but after trying this product, I was blown away by the results. It has completely changed my life!",
   link: "/case-study",
  image: "/images/avatar1.png",
};
const two: Template = {

  description: "WI can't believe how much this service has improved my productivity. I'm able to get so much more done in a day now, and it's all thanks to this amazing tool.",
  link: "/case-study",
  image: "/images/avatar2.png",
};
const three: Template = {

  description: "I've tried so many different products over the years, but this one is by far the best. I would highly recommend it to anyone looking for a reliable and effective solution.",
   link: "/case-study",
  image: "/images/avatar3.png",
};

export const byName = {
    one,
    two,
    three,

};
export const customers = Object.values(byName);
