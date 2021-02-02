import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.less";

const Index = () => (
  <div className={styles.aaa}>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  </div>
);

export default Index;
