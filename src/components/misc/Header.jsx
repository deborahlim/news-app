const Header = ({ title, children }) => {
  let capitalisedTitle = title && title[0].toUpperCase() + title.slice(1);
  return (
    <>
      <h1 className="m-5">
        {capitalisedTitle === "Breaking-news"
          ? "Breaking News"
          : capitalisedTitle}
        <span>{children}</span>
      </h1>
    </>
  );
};

export default Header;
