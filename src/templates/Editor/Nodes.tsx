import React, { ReactNode } from "react";
import { Element, Transforms } from "slate";

import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";

import { removePartOfString } from "utils/lib/String";

interface LeafProps {
  children: ReactNode;
  attributes: any;
  leaf: {
    format: string;
    color: string;
    bgColor: string;
    link: boolean;
    url: string;
  };
}
type ElementProps = Pick<LeafProps, "children" | "attributes">;

type LinkLeaf = ElementProps &
  Pick<LeafProps["leaf"], "url" | "color"> & {
    style: React.CSSProperties;
  };

type ImageProps = ElementProps & {
  element: Element;
  align: string;
};

export const Leaf = (props: LeafProps) => {
  const { children, attributes, leaf } = props;

  const leafFlag = (format: string, defaultValue = "") =>
    leaf[format] ? format : defaultValue;

  const style = {
    fontWeight: leafFlag("bold"),
    fontStyle: leafFlag("italic"),
    textDecoration: `${leafFlag("line-through")} ${leafFlag("underline")}`,
    color: leaf.color,
    backgroundColor: leaf.bgColor,
  };

  if (leaf.link) {
    return (
      <LinkLeaf style={style} url={leaf.url} color={leaf.color} {...props} />
    );
  }

  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};

export const LinkLeaf = ({
  children,
  attributes,
  style,
  url,
  color,
}: LinkLeaf) => {
  let { textDecoration } = style;
  textDecoration = textDecoration.toString();

  const hasUnderline = textDecoration.includes("underline");

  return (
    <span
      {...attributes}
      onMouseDown={() => window.open(url, "_blank")}
      style={{
        ...style,
        color: color ? color : "blue",
        textDecoration: hasUnderline
          ? removePartOfString(textDecoration, "")
          : textDecoration + " underline",
      }}
    >
      {children}
    </span>
  );
};

export const ListItem = ({ children, attributes }: ElementProps) => (
  <li {...attributes}>{children}</li>
);

export const NumberedList = ({ children, attributes }: ElementProps) => (
  <ol {...attributes}>{children}</ol>
);

export const BulletedList = ({ children, attributes }: ElementProps) => (
  <ul {...attributes}>{children}</ul>
);

export const Heading1 = ({ children, attributes }: ElementProps) => (
  <h1 {...attributes}>{children}</h1>
);
export const Heading2 = ({ children, attributes }: ElementProps) => (
  <h2 {...attributes}>{children}</h2>
);
export const Heading3 = ({ children, attributes }: ElementProps) => (
  <h3 {...attributes}>{children}</h3>
);

export const CodeElement = ({ children, attributes }: ElementProps) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

export const DefaultElement = ({ children, attributes }: ElementProps) => {
  return <p {...attributes}>{children}</p>;
};

const hideImageDragNDrop = () => {
  let sUsrAg = navigator.userAgent;
  const isFirefox = sUsrAg.includes("Firefox");

  return isFirefox;
};

export const Image = ({ attributes, children, element, align }: ImageProps) => {
  const editor: any = useSlateStatic();

  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div style={{ display: "flex", justifyContent: align }} {...attributes}>
      {children}
      <div contentEditable={false} style={{ position: "relative" }}>
        <img
          src={element.url}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "20em",
            boxShadow: `${selected && focused ? "0 0 0 3px" : "none"}`,
            resize: "both",
          }}
          alt="no recognized source"
          draggable={!hideImageDragNDrop()}
        />
        <button
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          style={{
            display: `${selected && focused ? "inline" : "none"}`,
            position: "absolute",
            top: " 0.5em",
            left: "0.5em",
            backgroundColor: "white",
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};
