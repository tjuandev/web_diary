import { RoundedButton } from "atoms";
import { useSlateStatic } from "slate-react";
import { editorToolbar } from "utils/constants";
import {
  insertImage,
  isBlockActive,
  isImageUrl,
  isMarkActive,
  toggleBlock,
  toggleMark,
  toggleSelectorLeaf,
} from "utils/services/CustomEditor";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const BaseButton = ({ value, isActive, onMouseDown }) => {
  return (
    <RoundedButton
      key={value}
      style={{ margin: "0.5rem" }}
      active={isActive}
      onMouseDown={onMouseDown}
    >
      {value}
    </RoundedButton>
  );
};

export const SelectTypography = ({ editor }) => {
  return (
    <select
      onChange={(e) => {
        return toggleBlock(editor, e.target.value);
      }}
      value={editor.getFragment()[0]?.type}
    >
      {Object.entries(editorToolbar.TypographyOptions).map(([value, label]) => {
        return (
          <option value={value} key={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export const MarkButtons = ({ editor }) => {
  const Buttons = Object.entries(editorToolbar.MarkButtons).map(
    ([format, value]) => {
      return (
        <BaseButton
          key={format}
          value={value}
          isActive={isMarkActive(editor, format)}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, format);
          }}
        />
      );
    }
  );

  return <>{Buttons}</>;
};

export const BlockButtons = ({ editor }) => {
  const Buttons = Object.entries(editorToolbar.BlockButtons).map(
    ([format, value]) => {
      return (
        <BaseButton
          key={format}
          value={value}
          isActive={isBlockActive(editor, format)}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, format);
          }}
        />
      );
    }
  );

  return <>{Buttons}</>;
};

const getCurrentSelection = (editor) => {
  const currentSelection = editor.getFragment()[0]?.children[0];

  if (currentSelection?.type === "list-item")
    return currentSelection.children[0];

  return currentSelection;
};

export const ColorSelector = ({ editor }) => {
  const getColorOfSelection = getCurrentSelection(editor)?.colorValue || "#000";

  return (
    <select
      onChange={(e) => {
        return toggleSelectorLeaf(
          editor,
          {
            isColor: true,
            color: e.target.value,
          },
          { split: true, hanging: true }
        );
      }}
      value={getColorOfSelection}
    >
      {Object.entries(editorToolbar.ColorsOptions).map(([key, color]) => {
        return (
          <option value={color} key={key}>
            {color}
          </option>
        );
      })}
    </select>
  );
};

export const BgSelector = ({ editor }) => {
  const getBgColorOfSelection = getCurrentSelection(editor)?.bgColorValue || "";

  return (
    <select
      onChange={(e) => {
        return toggleSelectorLeaf(
          editor,
          {
            isBg: true,
            bgColor: e.target.value,
          },
          { split: true, hanging: true }
        );
      }}
      value={getBgColorOfSelection}
    >
      {Object.entries(editorToolbar.BackgroundColorsOptions).map(
        ([key, color]) => {
          return (
            <option value={color} key={key}>
              {color}
            </option>
          );
        }
      )}
    </select>
  );
};

export const TextAlignmentSelector = ({ editor }) => {
  return (
    <select
      onChange={(e) => {
        return toggleSelectorLeaf(editor, {
          align: e.target.value,
        });
      }}
      value={getCurrentSelection(editor)?.align || "left"}
    >
      {Object.entries(editorToolbar.TextAlignOptions).map(([value, label]) => {
        return (
          <option value={value} key={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export const InsertImageButton = () => {
  const editor = useSlateStatic();

  const isActive = isBlockActive(editor, "image");

  return (
    <BaseButton
      isActive={isActive}
      onMouseDown={(e) => {
        e.preventDefault();
        const url = window.prompt("Enter the URL of the image:");

        if ((url && !isImageUrl(url)) || !url) {
          alert("URL is not an image");
          return;
        }

        insertImage(editor, url);
      }}
      value={<FontAwesomeIcon icon={faImage} />}
    />
  );
};

const Options = ({ editor }) => {
  return (
    <>
      <SelectTypography editor={editor} />
      <MarkButtons editor={editor} />
      <BlockButtons editor={editor} />
      <InsertImageButton />
      <ColorSelector editor={editor} />
      <BgSelector editor={editor} />
      <TextAlignmentSelector editor={editor} />
    </>
  );
};

export default Options;
