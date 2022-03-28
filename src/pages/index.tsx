import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../templates/Editor"), { ssr: false });

const Diary = () => {
  return <Editor />;
};

export default Diary;
