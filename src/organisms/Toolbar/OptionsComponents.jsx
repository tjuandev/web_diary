import { RoundedButton } from "atoms";
import { editorToolbar } from "utils/constants";
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
  toggleSelectorLeaf,
} from "utils/services/CustomEditor";

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
  return Object.entries(editorToolbar.MarkButtons).map(([format, value]) => {
    return (
      <BaseButton
        key={format}
        value={value}
        isActive={() => isMarkActive(editor, format)}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
      />
    );
  });
};

export const BlockButtons = ({ editor }) => {
  return Object.entries(editorToolbar.BlockButtons).map(([format, value]) => {
    return (
      <BaseButton
        key={format}
        value={value}
        isActive={() => isBlockActive(editor, format)}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, format);
        }}
      />
    );
  });
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
            color: true,
            colorValue: e.target.value,
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
            bgColor: true,
            bgColorValue: e.target.value,
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
