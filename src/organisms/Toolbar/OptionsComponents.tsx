import { RoundedButton, Selector } from "atoms";
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
import { faHighlighter, faImage } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Editor } from "slate";

import {
  BaseButtonProps,
  SelectorOptionsType,
  BaseSelectorProps,
  EditorInterface,
} from "./types";

const BaseButton = ({ value, isActive, onMouseDown }: BaseButtonProps) => {
  return (
    <RoundedButton.default
      key={value as string}
      style={{ margin: "0.5rem" }}
      active={isActive}
      onMouseDown={onMouseDown}
    >
      {value}
    </RoundedButton.default>
  );
};

const getCurrentEditorSelection = (
  editor: Editor,
  isBlockElement?: boolean
) => {
  const currentSelection = isBlockElement
    ? editor.getFragment()[0]
    : editor.getFragment()[0]?.children[0];

  if (currentSelection?.type === "list-item")
    return currentSelection.children[0];

  return currentSelection;
};

const BaseSelector = (props: BaseSelectorProps) => {
  const {
    editor,
    data,
    selectorType = "default",
    toggleFunction,
    defaultValue,
    isBlockElement = false,
    fragmentKey = "type",
    width,
    ...extraProps
  } = props;

  const options = Object.entries(data).map(([value, label]) => {
    return {
      value,
      label,
    };
  });

  const currentFragmentType = getCurrentEditorSelection(
    editor,
    isBlockElement
  )?.[fragmentKey];

  const [value, setValue] = useState(options[0]);

  const currentValue = options.find(({ value }) => {
    if (!currentFragmentType) return value === defaultValue;

    return value === currentFragmentType;
  });

  useEffect(() => {
    setValue(currentValue);
  }, [currentFragmentType]);

  const selectorProps = {
    options: options,
    onChange: (newValue: SelectorOptionsType) => {
      toggleFunction(editor, newValue.value);
      return setValue(newValue);
    },
    defaultValue: defaultValue,
    value: value,
    width: width,
    ...extraProps,
  };

  if (selectorType === "default") {
    return <Selector.default {...selectorProps} />;
  } else if (selectorType === "colorSelector") {
    return <Selector.HorizontalSelector {...selectorProps} />;
  }
};

export const SelectTypography = ({ editor }: EditorInterface) => {
  return (
    <BaseSelector
      width="10rem"
      editor={editor}
      data={editorToolbar.TypographyOptions}
      toggleFunction={toggleBlock}
      isBlockElement={true}
      defaultValue="paragraph"
    />
  );
};

export const MarkButtons = ({ editor }: EditorInterface) => {
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

export const BlockButtons = ({ editor }: EditorInterface) => {
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

export const ColorSelector = ({ editor }: EditorInterface) => {
  const toggleFunction = (_: Editor, value: string) => {
    toggleSelectorLeaf(
      editor,
      { isColor: true, color: value },
      { split: true, hanging: true }
    );
  };

  return (
    <BaseSelector
      editor={editor}
      data={editorToolbar.ColorsOptions}
      selectorType="colorSelector"
      toggleFunction={toggleFunction}
      fragmentKey="color"
      defaultValue="black"
      isHorizontal={true}
    />
  );
};

export const BgSelector = ({ editor }: EditorInterface) => {
  const toggleFunction = (_: Editor, value: string) => {
    toggleSelectorLeaf(
      editor,
      { isBg: true, bgColor: value },
      { split: true, hanging: true }
    );
  };

  return (
    <BaseSelector
      editor={editor}
      data={editorToolbar.BackgroundColorsOptions}
      toggleFunction={toggleFunction}
      defaultValue="transparent"
      fragmentKey="bgColor"
      isHorizontal={true}
      selectorType="colorSelector"
      customSingleValue={<FontAwesomeIcon icon={faHighlighter} size="2x" />}
      isColorElement
    />
  );
};

export const TextAlignmentSelector = ({ editor }: EditorInterface) => {
  const toggleFunction = (editor, value) => {
    return toggleSelectorLeaf(editor, {
      align: value,
    });
  };

  return (
    <BaseSelector
      editor={editor}
      data={editorToolbar.TextAlignOptions}
      toggleFunction={toggleFunction}
      defaultValue="left"
      fragmentKey="align"
    />
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

const Options = ({ editor }: EditorInterface) => {
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
