export interface Template {
    url: string;
    image: string;
    name: string;
  };
  const one: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/figma.svg",
    name: "Figma"
  };
  const two: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/github.svg",
    name: "GitHub"
  };
  const three: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/gitlab.svg",
    name: "Gitlab"
  };
  const four: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/linear.svg",
    name: "Linear"
  };
  const five: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/marvel.svg",
    name: "Marvel"
  };
  const six: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/gnome.svg",
    name: "gnome"
  }; const seven: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/jetbrains.svg",
    name: "Jetbrains"
  }; const eight: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/notion.svg",
    name: "Notion"
  }; const nine: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/paypal.svg",
    name: "PayPal"
  }; const ten: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/mailchimp.svg",
    name: "Mailchimp"
  }; const eleven: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/loom.svg",
    name: "Loom"
  }; const twelve: Template = {
    url: "/assets/integrations/case-study",
    image: "/assets/integrations/gnome.svg",
    name: "Gnome"
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
  export const integrations = Object.values(byName);
