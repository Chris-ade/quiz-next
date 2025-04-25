export default function toTitleCase(text: string) {
  return text.replace(/\b\w/g, (char: string) => {
    return char.toUpperCase();
  });
}
