import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="layout-app">
      <Outlet />
    </div>
  )
}

export default LayoutAdmin;