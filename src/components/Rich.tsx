import type { Rich as RichText } from "../../data/home";

/** Renders "text <em>em</em>", the site's heading pattern. */
export default function Rich({ value }: { value: RichText }) {
  return (
    <>
      {value.text}
      <em>{value.em}</em>
    </>
  );
}
