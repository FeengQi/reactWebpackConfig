import React from "react";

interface IProps {
  children: "";
}

const UserLayout = (props: IProps) => {
  return (
    <>
      <div>登录头部信息</div>
      {props.children}
    </>
  );
};
export default UserLayout;
