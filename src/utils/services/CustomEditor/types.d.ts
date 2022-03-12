import { BaseEditor, Node } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

const CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

const EmptyChildren = [];

type CustomText = {
  type: string;
  children: any[];
};

type GenericElement = {
  type: string;
}

type UrlElement = {
  link?: boolean;
  url?: string;
};

type CustomElements =  GenericElement & UrlElement;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElements;
    Text: CustomText;
  }
}
