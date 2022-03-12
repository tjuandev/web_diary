export const removePartOfString = (string: string, partToReplace: string) =>
  string.replace(partToReplace, "");

export const strip = (string: string) => string.replace(/\s/g, "");
