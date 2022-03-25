import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faLink,
  faUnderline,
  faStrikethrough,
  faListOl,
  faListUl,
  faTimesCircle,
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
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
  black: <RoundedButton.Colored color="black" />,
  "#FF7A00": <RoundedButton.Colored color="#FF7A00" />,
  "#FF0000": <RoundedButton.Colored color="#FF0000" />,
  "#1CC600": <RoundedButton.Colored color="#1CC600" />,
  "#00B2FF": <RoundedButton.Colored color="#00B2FF" />,
  "#8F00FF": <RoundedButton.Colored color="#8F00FF" />,
  "#EE0490": <RoundedButton.Colored color="#EE0490" />,
};

const BackgroundColorsOptions = {
  transparent: (
    <FontAwesomeIcon
      icon={faTimesCircle}
      color="#c0c0c0"
      style={{ fontSize: "2rem" }}
    />
  ),
  "#FFA41B": <RoundedButton.Colored color="#FFA41B" />,
  "#FF7676": <RoundedButton.Colored color="#FF7676" />,
  "#A1FF8A": <RoundedButton.Colored color="#A1FF8A" />,
  "#90DEFF": <RoundedButton.Colored color="#90DEFF" />,
  "#D8A7FF": <RoundedButton.Colored color="#D8A7FF" />,
  "#FF9BD7": <RoundedButton.Colored color="#FF9BD7" />,
};

const AlignButton = ({ icon }) => (
  <RoundedButton.default>
    <FontAwesomeIcon icon={icon} />
  </RoundedButton.default>
);

const TextAlignOptions = {
  left: <AlignButton icon={faAlignLeft} />,
  right: <AlignButton icon={faAlignRight} />,
  center: <AlignButton icon={faAlignCenter} />,
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
