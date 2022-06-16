import { Spinner } from "react-bootstrap";
const VideoDetail = ({ video }) => {
  if (!video) {
    return <Spinner />;
  }
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <>
      <div className="m-5">
        <div>
          <iframe src={videoSrc} title="video player" />
        </div>
        <div>
          <h4>{video.snippet.title}</h4>
          <p>{video.snippet.description}</p>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
