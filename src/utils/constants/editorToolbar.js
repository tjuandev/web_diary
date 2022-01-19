import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faLink,
  faUnderline,
  faStrikethrough,
  faIndent,
  faOutdent,
} from "@fortawesome/free-solid-svg-icons";

const MarkButtons = {
  bold: <FontAwesomeIcon icon={faBold} />,
  italic: <FontAwesomeIcon icon={faItalic} />,
  underline: <FontAwesomeIcon icon={faUnderline} />,
  "line-through": <FontAwesomeIcon icon={faStrikethrough} />,
  link: <FontAwesomeIcon icon={faLink} />,
  indent: <FontAwesomeIcon icon={faIndent} />,
  outdent: <FontAwesomeIcon icon={faOutdent} />,
};

const TypographyOptions = {
  default: "Text",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
};

const ColorsOptions = {
  black: "#000",
  green: "#00ff7a",
  purple: "#7a00ff",
  yellow: "#fffa00",
  red: "#ff0006",
  blue: "#0085ff",
};

const editorToolbar = {
  MarkButtons,
  TypographyOptions,
  ColorsOptions
};

export default editorToolbar;
