import { useCallback } from "react";
import { Leaf, CodeElement, DefaultElement } from "./Nodes";

const useRenderNodes = () => {
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code": {
        return <CodeElement {...props} />;
      }
      default: {
        return <DefaultElement {...props} />;
      }
    }
  }, []);

  return [renderLeaf, renderElement];
};

export default useRenderNodes;
