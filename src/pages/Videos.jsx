import SearchForm from "../components/SearchForm";
import VideoGrid from "../components/VideoGrid";
import Header from "../components/Header";
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
