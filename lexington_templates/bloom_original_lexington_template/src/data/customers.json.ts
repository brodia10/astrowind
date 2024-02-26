export interface Template {
    url: string;
    image: string;

  };
  const one: Template = {
    url: "/customers/case-study",
    image: "/brands/1.svg"
  };
  const two: Template = {
    url: "/customers/case-study",
    image: "/brands/2.svg"
  };
  const three: Template = {
    url: "/customers/case-study",
    image: "/brands/3.svg"
  };
  const four: Template = {
    url: "/customers/case-study",
    image: "/brands/4.svg"
  };
  const five: Template = {
    url: "/customers/case-study",
    image: "/brands/5.svg"
  };
  const six: Template = {
    url: "/customers/case-study",
    image: "/brands/6.svg"
  };

  const seven: Template = {
    url: "/customers/case-study",
    image: "/brands/7.svg"
  };

  const eight: Template = {
    url: "/customers/case-study",
    image: "/brands/8.svg"
  };

  const nine: Template = {
    url: "/customers/case-study",
    image: "/brands/9.svg"
  };

  const ten: Template = {
    url: "/customers/case-study",
    image: "/brands/10.svg"
  };

  const eleven: Template = {
    url: "/customers/case-study",
    image: "/brands/11.svg"
  };

  const twelve: Template = {
    url: "/customers/case-study",
    image: "/brands/12.svg"
  };
  export const byName = {
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve

  };
  export const customers = Object.values(byName);
