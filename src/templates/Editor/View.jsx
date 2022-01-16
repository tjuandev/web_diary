import { useRef, useState } from "react";
import { createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";

import { Toolbar } from "organisms";
import useRenderNodes from "./useRenderNodes";

const View = () => {
  const [value, setValue] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  const [renderLeaf, renderElement] = useRenderNodes();

  const editorRef = useRef();
  if (!editorRef.current)
    editorRef.current = withReact(withHistory(createEditor()));
  const editor = editorRef.current;

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar />
      <Editable
        placeholder="Digite alguma coisa..."
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            setTimeout(() => {
              Transforms.setNodes(editor, { type: "paragraph" });
            }, 0);
          }
        }}
      />
    </Slate>
  );
};

export default View;
