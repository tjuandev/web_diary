import { removePartOfString } from "utils/lib/String";

const Leaf = (props) => {
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

const LinkLeaf = ({ children, attributes, style, url, color }) => {
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

const CodeElement = ({ children, attributes }) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

const DefaultElement = ({ children, attributes }) => {
  return <p {...attributes}>{children}</p>;
};

export { Leaf, LinkLeaf, CodeElement, DefaultElement };
