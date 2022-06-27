import { Image } from "react-bootstrap";

import { timeElaspedSinceCurr } from "../../util/formatDate";

import "./VideoItem.css";

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <>
      <div
        className="container video-item"
        onClick={() => onVideoSelect(video)}
      >
        <Image fluid className="" src={video.snippet.thumbnails.medium.url} />
        <div className="m-3 text-center">
          <p className="fw-bold video-title">{video.snippet.title}</p>
          <a
            href={`https://www.youtube.com/c/${video.snippet.channelTitle}`}
            className="link-primary"
          >
            {video.snippet.channelTitle}
          </a>
          <br />
          <span className="footer">
            {timeElaspedSinceCurr(video.snippet.publishedAt)}
          </span>
        </div>
      </div>
    </>
  );
};
export default VideoItem;
