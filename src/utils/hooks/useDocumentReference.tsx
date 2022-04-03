import { useEffect, useState } from "react";

type UseDocumentType = () => Document;

export const useDocumentReference: UseDocumentType = () => {
  const [_document, set_document] = useState(null);

  useEffect(() => {
    set_document(document);
  }, []);

  return _document;
};
