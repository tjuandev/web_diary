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
import { ReactNode } from "react";
import { Editor } from "slate";

interface BaseButtonProps {
  value: string | React.ReactElement;
  isActive: boolean;
  onMouseDown: React.MouseEventHandler;
}
interface BaseSelectorProps {
  editor: Editor;
  colorTypeKey: string;
  colorValueKey: string;
  children: ReactNode;
  defaultValue?: string;
}

const BaseButton = ({ value, isActive, onMouseDown }: BaseButtonProps) => {
  return (
    <RoundedButton
      key={value as string}
      style={{ margin: "0.5rem" }}
      active={isActive}
      onMouseDown={onMouseDown}
    >
      {value}
    </RoundedButton>
  );
};

const getCurrentSelection = (editor) => {
  const currentSelection = editor.getFragment()[0]?.children[0];

  if (currentSelection?.type === "list-item")
    return currentSelection.children[0];

  return currentSelection;
};

const BaseColorSelector = ({
  editor,
  colorTypeKey,
  colorValueKey,
  children,
  defaultValue = "",
}: BaseSelectorProps) => {
  const elementOptions = {
    split: true,
    hanging: true,
  };

  const currentSelectorValue =
    getCurrentSelection(editor)?.[colorValueKey] || defaultValue;

  return (
    <select
      onChange={(e) => {
        return toggleSelectorLeaf(
          editor,
          {
            [colorTypeKey]: true,
            [colorValueKey]: e.target.value,
          },
          elementOptions
        );
      }}
      value={currentSelectorValue}
    >
      {children}
    </select>
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

export const ColorSelector = ({ editor }) => {
  return (
    <BaseColorSelector
      colorTypeKey="isColor"
      colorValueKey="color"
      editor={editor}
      defaultValue="#000"
    >
      {Object.entries(editorToolbar.ColorsOptions).map(([key, color]) => {
        return (
          <option value={color} key={key}>
            {color}
          </option>
        );
        2;
      })}
    </BaseColorSelector>
  );
};

export const BgSelector = ({ editor }) => {
  return (
    <BaseColorSelector
      colorTypeKey="isBg"
      colorValueKey="bgColor"
      editor={editor}
      defaultValue="#000"
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
    </BaseColorSelector>
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
