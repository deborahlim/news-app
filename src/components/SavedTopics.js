import { userSelector } from "../redux/userSlice";
import { useSelector } from "react-redux";

const SavedTopics = () => {
  let { savedTopics } = useSelector(userSelector);
  let content = "You do not have any saved topics";
  if (savedTopics.length) {
    content = savedTopics.map((topic) => <ul>{topic}</ul>);
  }

  return (
    <>
      <h1>My Saved Topics</h1>
      {content}
    </>
  );
};

export default SavedTopics;
