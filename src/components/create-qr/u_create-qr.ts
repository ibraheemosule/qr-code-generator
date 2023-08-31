const charLength = (min: number, max: number) => (value: string) =>
  value.length < min
    ? "Field too short"
    : value.length > max
    ? "Field too long"
    : true;

export const titleValidation = [
  (value: string) => !!value || "Required.",
  charLength(3, 25),
];

export const urlValidation = [
  (value: string) => {
    let url = value;
    try {
      if (url.toLowerCase().startsWith("www.")) {
        url = url.toLocaleLowerCase().replaceAll("www.", "https://");
      }
      if (!url.toLowerCase().startsWith("hhtps://")) throw Error;
      new URL(url);
      return true;
    } catch (err) {
      return "Invalid Url";
    }
  },
];

export const queryValidation = [
  charLength(0, 30),
  (value: string) => !/\s+/.test(value) || "Invalid Input",
];

export const paramValidation = (query: string) => [
  query ? charLength(1, 30) : () => true,
  queryValidation[1],
];
