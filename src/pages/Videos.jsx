import SearchForm from "../components/misc/SearchForm";
import VideoGrid from "../components/video/VideoGrid";
import Header from "../components/misc/Header";
import useVideos from "../hooks/use-videos";
const Videos = () => {
  const [videos, search] = useVideos();

  return (
    <>
      <Header title="Videos" />
      <SearchForm />
      <VideoGrid videos={videos} />
    </>
  );
};

export default Videos;
