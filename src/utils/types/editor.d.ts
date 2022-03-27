import { BaseEditor, Node } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export const CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

type GenericElement = {
  type: string;
  children: any[];
};

type UrlElement = {
  link?: boolean;
  url?: string;
};

export type SelectorElement = {
  isColor?: boolean;
  color?: string;
  isBg?: boolean;
  bgColor?: string;
  align?: string;
};

type CustomElements = GenericElement & UrlElement & SelectorElement;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElements;
    Text: GenericElement;
  }
}
