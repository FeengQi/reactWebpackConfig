import React from "react";

interface IProps {
    children: "";
}

const UserLayout = (props: IProps) => {
    return (
        <>
            <div>header</div>
            {props.children}
        </>
    );
};
export default UserLayout;
