import { Container } from "./Stylesheet";

export const Heading = ({ title }) => {
  return (
    <Container>
      <div>
        <h4>{title}</h4>
      </div>
    </Container>
  );
};

export default Heading;
