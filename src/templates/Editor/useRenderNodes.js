import { useCallback } from "react";
import { removePartOfString } from "utils/lib/String";

const useRenderNodes = () => {
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code": {
        return <CodeElement {...props} />;
      }
      default: {
        return <DefaultElement {...props} />;
      }
    }
  }, []);

  const Leaf = (props) => {
    const { children, attributes, leaf } = props;

    const leafFlag = (format, defaultValue = "") =>
      leaf[format] ? format : defaultValue;

    const style = {
      fontWeight: leafFlag("bold"),
      fontStyle: leafFlag("italic"),
      textDecoration: `${leafFlag("line-through")} ${leafFlag("underline")}`,
    };

    if (leaf.link) {
      return <LinkLeaf style={style} url={leaf.url} {...props} />;
    }

    return (
      <span {...attributes} style={style}>
        {children}
      </span>
    );
  };

  const LinkLeaf = ({ children, attributes, style, url }) => {
    const textDecoration = style.textDecoration;
    const hasUnderline = textDecoration.includes("underline");

    return (
      <span
        {...attributes}
        onMouseDown={() => window.open(url, "_blank")}
        style={{
          ...style,
          color: "blue",
          textDecoration: hasUnderline
            ? removePartOfString(textDecoration, "")
            : textDecoration + " underline",
        }}
      >
        {children}
      </span>
    );
  };

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

  return [renderLeaf, renderElement];
};

export default useRenderNodes;
