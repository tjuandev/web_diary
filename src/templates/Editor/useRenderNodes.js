const { useCallback, useState } = require("react");

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

  const Leaf = ({ children, attributes, leaf }) => {
    const leafFlag = (format, defaultValue = "") =>
      leaf[format] ? format : defaultValue;

    return (
      <span
        {...attributes}
        style={{
          fontWeight: leafFlag("bold"),
          fontStyle: leafFlag("italic"),
          textDecoration: leafFlag("line-through")
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
