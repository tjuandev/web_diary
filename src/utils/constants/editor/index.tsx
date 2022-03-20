import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faLink,
  faUnderline,
  faStrikethrough,
  faListOl,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { RoundedButton } from "atoms";

const MarkButtons = {
  bold: <FontAwesomeIcon icon={faBold} />,
  italic: <FontAwesomeIcon icon={faItalic} />,
  underline: <FontAwesomeIcon icon={faUnderline} />,
  "line-through": <FontAwesomeIcon icon={faStrikethrough} />,
  link: <FontAwesomeIcon icon={faLink} />,
};

const BlockButtons = {
  "numbered-list": <FontAwesomeIcon icon={faListOl} />,
  "bulleted-list": <FontAwesomeIcon icon={faListUl} />,
};

const TypographyOptions = {
  paragraph: "Text",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
};

const ColorsOptions = {
  black: <RoundedButton.Colored color="#000" />,
  green: <RoundedButton.Colored color="#00ff7a" />,
  purple: <RoundedButton.Colored color="#7a00ff" />,
  yellow: <RoundedButton.Colored color="#fffa00" />,
  red: <RoundedButton.Colored color="#ff0006" />,
  blue: <RoundedButton.Colored color="#0085ff" />,
};

const BackgroundColorsOptions = {
  transparent: "Transparent",
  lightGrey: "#7f7f7f",
  lightGreen: "#ccffe4",
  lightPurple: "#e4ccff",
  lightYellow: "#fffecc",
  lightRed: "#ffcccd",
  lightBlue: "#cce6ff",
};

const TextAlignOptions = {
  left: "Left",
  right: "Right",
  center: "Center",
};

const editorToolbar = {
  MarkButtons,
  TypographyOptions,
  ColorsOptions,
  BackgroundColorsOptions,
  TextAlignOptions,
  BlockButtons,
};

export default editorToolbar;
