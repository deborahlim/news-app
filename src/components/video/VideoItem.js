import { Image } from "react-bootstrap";
import { timeElaspedSinceCurr } from "../../util/formatDate";
const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <div className="container m-3" onClick={() => onVideoSelect(video)}>
      <Image fluid className="" src={video.snippet.thumbnails.medium.url} />
      <div className="m-3 text-center">
        <p className="fw-bold">{video.snippet.title}</p>
        <span className="link">{video.snippet.channelTitle}</span>
        <br />
        <span className="footer">
          {timeElaspedSinceCurr(video.snippet.publishedAt)}
        </span>
      </div>
    </div>
  );
};
export default VideoItem;
