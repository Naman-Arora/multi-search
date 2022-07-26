interface data {
  name: string;
  color: string;
  link: string;
  expression: string;
  previewAllowed: boolean;
  width: number;
  icon: JSX.Element;
}

const TabResponse = (data: data, q: string) => {
  let queryLink = "";
  if (data.name === "Web" || data.name === "Google") {
    queryLink = `https://www.google.com/search?q=${q}`;
  } else {
    queryLink = data.link + `q`;
  }
  window.open(queryLink, "_blank");
};

export default TabResponse;