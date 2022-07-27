interface data {
  name: string;
  color: string;
  link: string;
  expression: string;
  previewAllowed: boolean;
  width: number;
  icon: JSX.Element;
}

const TabResponse = (data: data, query: string) => {
  let queryLink = "";
  if (data.name === "Web" || data.name === "Google") {
    queryLink = `https://www.google.com/search?q=${query}`;
  } else {
    queryLink = data.link + `${query}`;
  }
  window.open(queryLink, "_self");
};

export default TabResponse;