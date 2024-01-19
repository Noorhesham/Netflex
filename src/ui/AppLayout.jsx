import { Outlet } from "react-router";
import Header from "./Header";


function AppLayout() {

  return (
    <div className=" w-full ">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
