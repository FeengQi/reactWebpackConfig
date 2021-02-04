import React, { useState } from "react";
import { useRequest } from "ahooks";
import { changeUsername } from "@/services";
import { message } from "antd";
import styles from "./index.less";

const Index = () => {
  const [state, setState] = useState("");
  const { loading, run } = useRequest(changeUsername, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        setState("");
        message.success(`The username was changed to "${params[0]}" !`);
      }
    },
  });
  return (
    <div className={styles.content}>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button disabled={loading} type="button" onClick={() => run(state)}>
        {loading ? "loading" : "Edit"}
      </button>
      <p className={styles.aaa}>123</p>
    </div>
  );
};

export default Index;
