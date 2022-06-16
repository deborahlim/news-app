import { Image } from "react-bootstrap";
import { timeElaspedSinceCurr } from "../../util/formatDate";
const VideoItem = ({ video }) => {
  console.log(video);
  return (
    <div className="fluid m-3">
      <Image src={video.snippet.thumbnails.default.url} />
      <div className="m-3">
        <p className="lead">{video.snippet.title}</p>
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
