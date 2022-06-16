// useEffect is good for code that should be exected as part
//  of the component render cycle, but maybe not always when the component re renders

import NewsCardGrid from "../components/NewsCardGrid";
import Categories from "../components/Categories";

import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom";

const News = () => {
  let { path } = useRouteMatch();

  return (
    <section>
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
