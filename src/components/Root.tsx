import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Root = () => {
  return (
    <>
      <Sidebar />
      <div id="main">
        <Header />
        <Outlet />
      </div>
    </>
  );
};
