import { useCallback, useRef, useState } from "react";
import { createEditor, Editor, Text, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const App = () => {
  const editorRef = useRef();
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  const editor = editorRef.current;

  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

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

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;

          switch (event.key) {
            case "p": {
              event.preventDefault();

              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === "code",
              });

              Transforms.setNodes(
                editor,
                { type: match ? "default" : "code" },
                { match: (n) => Editor.isBlock(editor, n) }
              );

              break;
            }
            case "b": {
              event.preventDefault();

              const [match] = Editor.nodes(editor, {
                match: (n) => n.bold,
              });

              Transforms.setNodes(
                editor,
                { bold: match ? false : true },
                { match: (n) => Text.isText(n), split: true }
              );

              break;
            }
            case "i": {
              event.preventDefault();

              const [match] = Editor.nodes(editor, {
                match: (n) => n.italic,
              });

              Transforms.setNodes(
                editor,
                { italic: match ? false : true },
                { match: (n) => Text.isText(n), split: true }
              );

              break;
            }
            default: {
              return;
            }
          }
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

/* const HeaderElement = ({ children, attributes }) => {
  return <h1 {...attributes}>{children}</h1>;
}; */

const Leaf = ({ children, attributes, ...props }) => {
  return (
    <span
      {...attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
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

export default App;
