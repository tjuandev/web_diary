import { Editor, Element, Text, Transforms } from "slate";

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format, color) => {
  const isActive = isMarkActive(editor, format);

  if (format === "color") {
    return Transforms.setNodes(
      editor,
      { color: true, colorValue: color },
      { match: (n) => Text.isText(n), split: true, hanging: true }
    );
  }

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    if (format === "link") {
      const url = prompt("url:");

      if (!url) {
        return;
      }
      return Transforms.setNodes(
        editor,
        { link: true, url },
        { match: (n) => Text.isText(n), split: true }
      );
    }

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
  });
};
