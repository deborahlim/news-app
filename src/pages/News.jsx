// useEffect is good for code that should be exected as part
//  of the component render cycle, but maybe not always when the component re renders

import NewsCardGrid from "../components/NewsCardGrid";
import Header from "../components/Header";
import Categories from "../components/Categories";

import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom";

const News = ({ title }) => {
  let { path } = useRouteMatch();
  return (
    <section>
      <Header title={title} />
      <Categories />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/top-headlines/breaking-news`}></Redirect>
        </Route>
        <Route path={`${path}/:endpoint/:topic/`}>
          <NewsCardGrid />
        </Route>
      </Switch>
    </section>
  );
};

export default News;
