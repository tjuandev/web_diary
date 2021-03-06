import { KeyboardEventHandler, useRef, useState } from "react";

import { createEditor, Descendant, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

import { isInListTypes } from "utils/lib/CustomEditor";

import withImages from "./withImages";

import { Toolbar } from "organisms";
import useRenderNodes from "./useRenderNodes";

import { Container } from "./Stylesheet";

const RESET_FRAGMENT_TIMEOUT = 1;

export const Editor = () => {
  const [value, setValue] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  const [renderLeaf, renderElement] = useRenderNodes();

  const editorRef = useRef(null);

  if (!editorRef.current)
    editorRef.current = withImages(
      withHistory(withReact(createEditor() as ReactEditor))
    );

  const editor = editorRef.current;

  const resetHeadingOnEnter: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      const isList = isInListTypes(editor.getFragment()[0].type);

      setTimeout(() => {
        if (isList) return;
        Transforms.setNodes(editor, { type: "paragraph" });
      }, RESET_FRAGMENT_TIMEOUT);
    }
  };

  return (
    <Container>
      <div>
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Toolbar />
          <Editable
            placeholder="Digite alguma coisa..."
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onBlur={(e) => e.preventDefault()}
            onKeyDown={resetHeadingOnEnter}
          />
        </Slate>
      </div>
    </Container>
  );
};
