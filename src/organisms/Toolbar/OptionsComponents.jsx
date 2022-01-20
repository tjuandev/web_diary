import { RoundedButton } from "atoms";
import { editorToolbar } from "utils/constants";
import {
  isMarkActive,
  toggleBlock,
  toggleMark,
} from "utils/services/CustomEditor";

const BaseButton = ({ format, value, isActive, toggleNode, editor }) => {
  return (
    <RoundedButton
      id={format}
      key={format}
      style={{ margin: "0.5rem" }}
      active={isActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleNode(editor, format);
      }}
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
      {Object.entries(editorToolbar.TypographyOptions).map(([value, name]) => {
        return (
          <option value={value} key={value}>
            {name}
          </option>
        );
      })}
    </select>
  );
};

export const MarkButtons = ({ editor }) => {
  return Object.entries(editorToolbar.MarkButtons).map(([key, value]) => {
    return (
      <BaseButton
        key={key}
        format={key}
        value={value}
        editor={editor}
        isActive={isMarkActive}
        toggleNode={toggleMark}
      />
    );
  });
};

const getCurrentFragment = (editor) => {
  return editor.getFragment()[0]?.children[0];
};

export const ColorSelector = ({ editor }) => {
  const getColorOfSelection = getCurrentFragment(editor)?.colorValue || "#000";

  return (
    <select
      onChange={(e) => {
        return toggleMark(editor, "color", e.target.value);
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
  const getBgColorOfSelection = getCurrentFragment(editor)?.bgColorValue || "";

  return (
    <select
      onChange={(e) => {
        return toggleMark(editor, "bgColor", e.target.value);
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
