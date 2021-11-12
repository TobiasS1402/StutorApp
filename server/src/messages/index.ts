import { Language } from "./lang-interface";
import langEn from "./languages/lang-en";
import langNl from "./languages/lang-nl";

export default (lang: string = "en"): Language => {
  switch (lang) {
    case "nl":
      return langNl;
    default:
      return langEn;
  }
};
