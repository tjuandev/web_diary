import { Editor } from "slate";

export type SelectorOptionsType = {
  value: string;
  label: string;
};
export interface EditorInterface {
  editor: Editor;
}
export interface BaseButtonProps {
  value: string | React.ReactElement;
  isActive: boolean;
  onMouseDown: React.MouseEventHandler;
}

export interface BaseSelectorProps {
  editor: Editor;
  data: {
    [x: string]: any;
  };
  selectorType?: "default" | "colorSelector";
  toggleFunction: (editor: Editor, value: string) => void;
  defaultValue: string;
  isBlockElement?: boolean;
  fragmentKey?: string;
  width?: string;
  isHorizontal?: boolean;
  isHighlighter?: boolean;
  customSingleValue?: React.ReactElement;
