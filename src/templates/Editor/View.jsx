import { useRef, useState } from "react";

import { createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from "slate-react";

import { isInListTypes } from "utils/services/CustomEditor";
import { Toolbar } from "organisms";
import useRenderNodes from "./useRenderNodes";

const View = () => {
  const [value, setValue] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  const [renderLeaf, renderElement] = useRenderNodes(Image);

  const editorRef = useRef();
  if (!editorRef.current)
    editorRef.current = withImages(withHistory(withReact(createEditor())));
  const editor = editorRef.current;

  console.log("editor", editor);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar />
      <InsertImageButton />
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

const withImages = (editor) => {
  console.log("cheguey", editor);
  const { insertData, isVoid } = editor;

  const isImageUrl = () => {};

  editor.isVoid = (element) => {
    // NOTE void é uma propriedade do Slate, onde há a implementação de elementos não editáveis.
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain"); // NOTE O getData é uma função que pega o DragData e transforma em string.

    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader(); // NOTE Permite que o javascript de maneira async, leia os arquivos do computador, usando File or Blob object.
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic(); // é uma versão do context useSlate que não fica re-renderizando o tempo todo.
  const path = ReactEditor.findPath(editor, element); // É um versão editor DOM especifica do React do Editor Slate.

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} style={{ position: "relative" }}>
        <img
          src={element.url}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "20em",
            boxShadow: `${selected && focused ? "0 0 0 3px #B4D5FF" : "none"}`,
          }}
          alt="no recognized source"
        />
        <button
          active
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

const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (url && !isImageUrl(url)) {
          alert("URL is not an image");
          return;
        }
        insertImage(editor, url);
      }}
    >
      image
    </button>
  );
};

const imageExtensions = ["png", "jpeg", "jpg", "webp"];

const isImageUrl = (url) => {
  if (!url) return false;

  console.log("url", url);

  let urlChecked = "";

  try {
    urlChecked = new URL(url);

    const ext = urlChecked.pathname.split(".").pop();

    console.log("ext", ext);

    return imageExtensions.includes(ext);
  } catch {
    return false;
  }
};

export default View;
