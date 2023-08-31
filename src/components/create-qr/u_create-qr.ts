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
        url = url.toLowerCase().replaceAll("www.", "https://");
      }

      if (!url.startsWith("https://")) throw Error;
      new URL(url);
      return true;
    } catch (err) {
      return "Invalid Url";
    }
  },
];

export const imgValidation = [
  (value: File[]) => {
    if (!value?.length) return true;
    return value[0].size < 2000000 || "Avatar size should be less than 2 MB!";
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

export function convertImg(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result);
    };

    reader.onerror = (event) => {
      reject(event.target?.error);
    };

    reader.readAsDataURL(file);
  });
}
