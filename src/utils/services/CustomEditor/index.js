import { Editor, Element, Text, Transforms } from "slate";

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleColorLeaf = (editor, format, color) => {
  const type = format === "bgColor" ? { bgColor: true } : { color: true };

  return Transforms.setNodes(
    editor,
    { ...type, colorValue: color },
    { match: (n) => Text.isText(n), split: true, hanging: true }
  );
};

const toggleLinkLeaf = (editor, format, color) => {
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

export const toggleMark = (editor, format, color) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    if (format === "color" || "bgColor") toggleColorLeaf(editor, format, color);
    if (format === "link") toggleLinkLeaf(editor, format, color);

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

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);

  const newProperties = {
    type: isActive ? "default" : format,
  };

  Transforms.setNodes(editor, newProperties, {
    match: (n) => Editor.isBlock(editor, n),
  });
};
