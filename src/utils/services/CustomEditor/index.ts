import { Editor, Element, Text, Transforms } from "slate";

import { SelectorElement } from "utils/types/editor";

type NodeOptions = {
  hanging: boolean;
  split: boolean;
};

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleSelectorLeaf = (
  editor: Editor,
  properties: SelectorElement,
  options?: NodeOptions
) => {
  return Transforms.setNodes(
    editor,
    { ...properties },
    { match: (n) => Text.isText(n), ...options }
  );
};

const toggleLinkLeaf = (editor: Editor) => {
  const url = prompt("url:");

  if (!url) {
    return;
  }
  return Transforms.setNodes(
    editor,
    { link: true, url },
    { match: (n) => Text.isText(n), split: true }
  );
};

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    if (format === "link") toggleLinkLeaf(editor);

    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

export const isInListTypes = (element: string) => {
  const LIST_TYPES = ["numbered-list", "bulleted-list"];

  return LIST_TYPES.includes(element);
};

export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = isInListTypes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => isInListTypes(Element.isElement(n) && n.type),
    split: true,
  });

  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const insertImage = (editor: Editor, url: string | ArrayBuffer) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const imageExtensions = ["png", "jpeg", "jpg", "webp", "gif"];

export const isImageUrl = (url: string) => {
  let urlChecked;

  try {
    urlChecked = new URL(url);

    const ext = urlChecked.pathname.split(".").pop();

    return imageExtensions.includes(ext);
  } catch {
    return false;
  }
};
