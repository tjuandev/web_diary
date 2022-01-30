import { Transforms } from "slate";

import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";

import { removePartOfString } from "utils/lib/String";

export const Leaf = (props) => {
  const { children, attributes, leaf } = props;

  const leafFlag = (format, defaultValue = "") =>
    leaf[format] ? format : defaultValue;

  const style = {
    fontWeight: leafFlag("bold"),
    fontStyle: leafFlag("italic"),
    textDecoration: `${leafFlag("line-through")} ${leafFlag("underline")}`,
    color: leaf.colorValue,
    backgroundColor: leaf.bgColorValue,
  };

  if (leaf.link) {
    return (
      <LinkLeaf
        style={style}
        url={leaf.url}
        color={leaf.colorValue}
        {...props}
      />
    );
  }

  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};

export const LinkLeaf = ({ children, attributes, style, url, color }) => {
  const textDecoration = style.textDecoration;
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

export const ListItem = ({ children, attributes }) => (
  <li {...attributes}>{children}</li>
);

export const NumberedList = ({ children, attributes }) => (
  <ol {...attributes}>{children}</ol>
);

export const BulletedList = ({ children, attributes }) => (
  <ul {...attributes}>{children}</ul>
);

export const Heading1 = ({ children, attributes }) => (
  <h1 {...attributes}>{children}</h1>
);
export const Heading2 = ({ children, attributes }) => (
  <h2 {...attributes}>{children}</h2>
);
export const Heading3 = ({ children, attributes }) => (
  <h3 {...attributes}>{children}</h3>
);

export const CodeElement = ({ children, attributes }) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

export const DefaultElement = ({ children, attributes }) => {
  return <p {...attributes}>{children}</p>;
};

export const Image = ({ attributes, children, element, align }) => {
  const editor = useSlateStatic();
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
