import { useCallback, useRef, useState } from "react";

import isHotkey from "is-hotkey";

import { withHistory } from "slate-history";

const App = () => {
  const editorRef = useRef(); // Lib triggers an error if you use useMemo
  if (!editorRef.current)
    editorRef.current = withReact(withHistory(createEditor()));
  const editor = editorRef.current;

  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  const HOTKEYS = {
    // Mod means ctrl or cmd
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
  };

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
        style={{
          border: "1px solid black",
        }}
        placeholder="Digit your text here..."
        onKeyDown={(event) => {
          for (const hotKey in HOTKEYS) {
            if (isHotkey(hotKey, event)) {
              // NOTE It'll check if the command we pressed is in the HOTKEYS object.
              event.preventDefault();
              const mark = HOTKEYS[hotKey]; // NOTE It'll return the value of hotkey;
              toggleMark(editor, mark);
            }
          }
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format); // NOTE Checks if we already opened a mark.

  if (isActive) {
    Editor.removeMark(editor, format); // NOTE if we did created, it will close.
  } else {
    Editor.addMark(editor, format, true); // NOTE Basically, the addMark, set properties to the text selected, and if has not a text, it set to the next text that the use gonna type
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

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
