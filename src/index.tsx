import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { createBrowserHistory } from "history";
import routes from "../config/router.config";
// const history = createBrowserHistory();

interface IRouterItem {
  path: string;
  component: Element;
  routes?: IRouterItem[];
  exact?: boolean;
}
interface IRouteComponent {
  history?: any;
  location: any;
  match?: any;
  staticContext?: any;
}

const renderRoutes = (routes: Array<IRouterItem>) =>
  routes.map(
    (
      {
        path,
        exact,
        component: RouteComponent,
        routes: childrenRoutes = [],
      }: IRouterItem,
      index: number
    ) => {
      return (
        <Route
          key={index}
          path={path}
          exact={exact}
          render={(routeProps) => {
            console.log("routeProps", routeProps);
            return (
              <RouteComponent<IRouteComponent> {...routeProps}>
                <Switch>{renderRoutes(childrenRoutes)}</Switch>
              </RouteComponent>
            );
          }}
        />
      );
    }
  );

ReactDOM.render(
  <Router>{renderRoutes(routes)}</Router>,
  document.getElementById("root")
);

/**
 * 渲染Route有三种方式 component render children
 */
