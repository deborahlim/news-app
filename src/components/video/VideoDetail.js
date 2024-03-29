import { Spinner } from "react-bootstrap";
import { timeElaspedSinceCurr } from "../../util/formatDate";

import "./VideoDetail.css";
const VideoDetail = ({ video }) => {
  if (!video) {
    return <Spinner />;
  }
  console.log(video.snippet);
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <>
      <div className="my-5">
        <iframe src={videoSrc} title="video player" className="selectedVideo" />
      </div>
      <hr />
      <div className="my-5 text-start">
        <h4 className=" fw-bold">{video.snippet.title}</h4>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.youtube.com/channel/${video.snippet.channelId}`}
          className="link-primary"
        >
          {video.snippet.channelTitle}
        </a>
        <p>{timeElaspedSinceCurr(video.snippet.publishedAt)}</p>
        <p>{video.snippet.description}</p>
      </div>
      <hr />
    </>
  );
};

export default VideoDetail;
