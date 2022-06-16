import SearchForm from "../components/misc/SearchForm";
import VideoGrid from "../components/video/VideoGrid";
import VideoDetail from "../components/video/VideoDetail";
import Header from "../components/misc/Header";
import useVideos from "../hooks/use-videos";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";

const Videos = () => {
  const [videos, search, isLoading, error] = useVideos();
  const [selectedVideo, setSelectedVideo] = useState(null);
  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);
  let content;
  if (isLoading) {
    content = <Spinner className="m-5" size="lg" animation="grow" />;
  } else if (error) {
    content = error;
  } else if (videos.length > 0) {
    content = <VideoGrid videos={videos} onVideoSelect={setSelectedVideo} />;
  }
  return (
    <>
      <Header title="Videos" />
      <SearchForm
        endpoint="youtube"
        placeholder="Search Youtube Videos"
        onYoutubeSearchFormSubmit={search}
      />
      <VideoDetail video={selectedVideo} />
      {content}
    </>
  );
};

export default Videos;
