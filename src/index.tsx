import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const routes = require("../config/router.config");
import "./index.less";

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
            return (
              // @ts-ignore
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
  <Router>
    {renderRoutes(routes)}
  </Router>,
  document.getElementById("root")
);
