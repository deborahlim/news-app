import { Image } from "react-bootstrap";

const VideoItem = ({ video }) => {
  console.log(video);
  return (
    <div className="d-flex fluid m-3">
      <Image fluid src={video.snippet.thumbnails.medium.url} />
      <div className="m-3">
        <p className="lead">{video.snippet.title}</p>
        {video.snippet.channelTitle}
        <p>{video.snippet.publishedAt}</p>
      </div>
    </div>
  );
};
export default VideoItem;
