import { useRef, useState } from "react";

import { createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";

import { isInListTypes } from "utils/services/CustomEditor";

import withImages from "./withImages";

import { Toolbar } from "organisms";
import useRenderNodes from "./useRenderNodes";

const View = () => {
  const [value, setValue] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  const [renderLeaf, renderElement] = useRenderNodes();

  const editorRef = useRef();
  if (!editorRef.current)
    editorRef.current = withImages(withHistory(withReact(createEditor())));
  const editor = editorRef.current;

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar />
      <Editable
        placeholder="Digite alguma coisa..."
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onBlur={(e) => e.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            const isList = isInListTypes(editor.getFragment()[0].type);

            setTimeout(() => {
              if (isList) return;
              Transforms.setNodes(editor, { type: "paragraph" });
            }, 0);
          }
        }}
      />
    </Slate>
  );
};

export default View;
