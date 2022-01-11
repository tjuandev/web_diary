import { RoundedButton } from "atoms";
import { editorToolbar } from "utils/constants";
import { BarContainer } from "./Stylesheet";

const View = () => {
  return (
    <BarContainer style={{ display: "flex", padding: "2rem" }}>
      {Object.entries(editorToolbar).map(([key, value]) => {
        return (
          <RoundedButton id={key} key={key} style={{ margin: "0.5rem" }}>
            {value}
          </RoundedButton>
        );
      })}
    </BarContainer>
  );
};

export default View;
