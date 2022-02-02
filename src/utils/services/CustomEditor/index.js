import { Editor, Element, Text, Transforms } from "slate";

import imageExtensions from "utils/constants/imagesExt";

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleSelectorLeaf = (editor, properties, options) => {
  return Transforms.setNodes(
    editor,
    { ...properties },
    { match: (n) => Text.isText(n), ...options }
  );
};

const toggleLinkLeaf = (editor) => {
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

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    if (format === "link") toggleLinkLeaf(editor);

    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor, format) => {
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

export const isInListTypes = (element) => {
  const LIST_TYPES = ["numbered-list", "bulleted-list"];

  return LIST_TYPES.includes(element);
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = isInListTypes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => isInListTypes(n.type),
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

export const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};
export const isImageUrl = (url) => {
  let urlChecked;

  try {
    urlChecked = new URL(url);

    const ext = urlChecked.pathname.split(".").pop();

    return imageExtensions.includes(ext);
  } catch {
    return false;
  }
};
