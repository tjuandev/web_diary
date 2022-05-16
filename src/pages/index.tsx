import { Editor, EditorHeading } from "templates";

const todayDateFormatted = new Date().toLocaleDateString("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const Diary = () => {
  return (
    <>
      <EditorHeading title={todayDateFormatted} />
      <Editor />
    </>
  );
};

export default Diary;
