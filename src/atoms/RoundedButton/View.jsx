import { RoundedButton } from "./Stylesheet";

const View = ({ children, ...props }) => {
  return <RoundedButton {...props}>{children}</RoundedButton>;
};

export default View;
