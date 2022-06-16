import VideoItem from "./VideoItem";
import {Row} from "react-bootstrap";
const VideoGrid = ({ videos }) => {
  let content = videos.map((video) => {
    return <VideoItem video={video} />;
  });

  return (
    <Row
      xs={1}
      sm={2}
      className="g-4 m-5 px-md-5 justify-content-center"
    >
    {content}
    </Row>
  );
};
export default VideoGrid;