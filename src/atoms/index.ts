import dynamic from "next/dynamic";

import * as RoundedButton from "./RoundedButton";

/* eslint-disable */

const HorizontalSelector = dynamic(
  () => import("./Selector").then((mod) => mod.HorizontalSelector as any),
  { ssr: false }
);
const Selector = dynamic(() => import("./Selector"), { ssr: false });

export { RoundedButton, HorizontalSelector, Selector };
