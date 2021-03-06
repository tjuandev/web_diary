import { useCallback } from "react";
import {
  Leaf,
  Heading1,
  Heading2,
  Heading3,
  CodeElement,
  DefaultElement,
  ListItem,
  NumberedList,
  BulletedList,
  Image,
} from "./Nodes";

const useRenderNodes = () => {
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props) => {
    const { children } = props;

    const align = children[0]?.props?.text?.align?.value;

    const style = { textAlign: align, listStylePosition: "inside" };
    props.attributes = { ...props.attributes, style };

    switch (props.element.type) {
      case "code": {
        return <CodeElement {...props} />;
      }
      case "h1": {
        return <Heading1 {...props} />;
      }
      case "h2": {
        return <Heading2 {...props} />;
      }
      case "h3": {
        return <Heading3 {...props} />;
      }
      case "list-item": {
        return <ListItem {...props} />;
      }
      case "numbered-list": {
        return <NumberedList {...props} />;
      }
      case "bulleted-list": {
        return <BulletedList {...props} />;
      }
      case "image": {
        return <Image {...props} />;
      }
      default: {
        return <DefaultElement {...props} />;
      }
    }
  }, []);

  return [renderLeaf, renderElement];
};

export default useRenderNodes;
