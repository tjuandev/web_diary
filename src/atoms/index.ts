import dynamic from "next/dynamic";

import * as RoundedButton from "./RoundedButton";

const HorizontalSelector = dynamic(
  () => import("./Selector").then((mod) => mod.HorizontalSelector),
  { ssr: false }
);
const Selector = dynamic(
  () => import("./Selector").then((mod) => mod.default),
  { ssr: false }
);

export { RoundedButton, HorizontalSelector, Selector };
