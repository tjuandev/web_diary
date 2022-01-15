import { RoundedButton } from "./Stylesheet";

const View = ({ children, active, ...props }) => {
  return (
    <RoundedButton className={active && "active"} {...props}>
      {children}
    </RoundedButton>
  );
};

export default View;
