import { RoundedButton, Selector } from "atoms";
import { useSlateStatic } from "slate-react";
import { editorToolbar } from "utils/constants";
import {
  insertImage,
  isBlockActive,
  isImageUrl,
  isMarkActive,
  toggleAlignmentLeaf,
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
      active={isActive}
      onMouseDown={onMouseDown}
    >
      {value}
    </RoundedButton.default>
  );
};

const getCurrentEditorSelection = (
  editor: Editor,
  fragmentKey: string,
  isBlockElement?: boolean
) => {
  const fragment = editor.getFragment()[0];

  const currentSelection = isBlockElement
    ? fragment?.[fragmentKey]
    : fragment?.children[0]?.[fragmentKey]?.value;

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
    fragmentKey,
    isBlockElement
  );

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
  } else if (selectorType === "horizontalSelector") {
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
      isBlockElement
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
    toggleSelectorLeaf(editor, "color", { isActive: true, value });
  };

  return (
    <BaseSelector
      editor={editor}
      data={editorToolbar.ColorsOptions}
      selectorType="horizontalSelector"
      toggleFunction={toggleFunction}
      fragmentKey="color"
      defaultValue="black"
      isColorElement
    />
  );
};

export const BgSelector = ({ editor }: EditorInterface) => {
  const toggleFunction = (_: Editor, value: string) => {
    toggleSelectorLeaf(editor, "bgColor", { isActive: true, value });
  };

  return (
    <BaseSelector
      editor={editor}
      data={editorToolbar.BackgroundColorsOptions}
      toggleFunction={toggleFunction}
      defaultValue="transparent"
      fragmentKey="bgColor"
      selectorType="horizontalSelector"
      customSingleValue={<FontAwesomeIcon icon={faHighlighter} size="2x" />}
      isColorElement
    />
  );
};

export const TextAlignmentSelector = ({ editor }: EditorInterface) => {
  const toggleFunction = (editor, value) => {
    return toggleAlignmentLeaf(editor, { align: { value } });
  };

  return (
    <BaseSelector
      editor={editor}
      data={editorToolbar.TextAlignOptions}
      toggleFunction={toggleFunction}
      defaultValue="left"
      fragmentKey="align"
      selectorType="horizontalSelector"
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
