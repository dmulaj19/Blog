import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useAppContext } from '../../../context/context'
import { setAuthToken } from '../../../mainAxios'
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  let history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    setAuthToken(null);
    history.push("/admin");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">WeBlog</span>
        </div>
        <div className="topRight">
          
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            <Settings />
          </div> */}
          {user && <a
            href="/"
            className="logOutBtn"
            onClick={handleLogout}
          >
            LOG OUT
          </a>}
          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
        </div>
      </div>
    </div>
  );
}
