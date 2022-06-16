import SearchForm from "../components/misc/SearchForm";
import VideoGrid from "../components/video/VideoGrid";
import Header from "../components/misc/Header";
import useVideos from "../hooks/use-videos";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

const Videos = () => {
  const [videos, search, isLoading, error] = useVideos();
  // const [selectedVideo, setSelectedVideo] = useState(null);
  // useEffect(() => {}, [videos])
  let content;
  if (isLoading) {
    content = <Spinner className="m-5" size="lg" animation="grow"/>;
  } else if (error) {
    content = error;
  }
  else if (videos.length > 0) {
    content = <VideoGrid videos={videos} />;
  }
  return (
    <>
      <Header title="Videos" />
      <SearchForm
        endpoint="youtube"
        placeholder="Search Youtube Videos"
        onYoutubeSearchFormSubmit={search}
      />
{content}
    </>
  );
};

export default Videos;
