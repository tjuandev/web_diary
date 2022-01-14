import { Editor, Element, Transforms } from "slate";

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
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

  return match;
};

export const getLinkUrl = () => {
  const url = prompt("Please, type your URL:");

  return url;
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);

  const newProperties = {
    type: isActive ? "default" : format,
    href: isActive ? undefined : format === "link" ? getLinkUrl() : "#",
  };

  Transforms.setNodes(editor, newProperties, {
    match: (n) => Editor.isBlock(editor, n),
    split: true,
  });
};
