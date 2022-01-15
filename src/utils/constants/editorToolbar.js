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
};

const BlockButtons = {
  indent: <FontAwesomeIcon icon={faIndent} />,
  outdent: <FontAwesomeIcon icon={faOutdent} />,
};

const editorToolbar = {
  MarkButtons,
  BlockButtons,
};

export default editorToolbar;
