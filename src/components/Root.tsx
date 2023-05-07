import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <>
      <div id="header">header</div>
      <div id="sidebar">sidebar</div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
};
