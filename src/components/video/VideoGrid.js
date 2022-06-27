import { Row } from "react-bootstrap";

import VideoItem from "./VideoItem";

const VideoGrid = ({ videos, onVideoSelect }) => {
  let content = videos.map((video) => {
    return (
      <VideoItem video={video} key={video.etag} onVideoSelect={onVideoSelect} />
    );
  });

  return (
    <Row xs={1} sm={2} md={4} lg={5} className="d-flex justify-content-start">
      {content}
    </Row>
  );
};
export default VideoGrid;
