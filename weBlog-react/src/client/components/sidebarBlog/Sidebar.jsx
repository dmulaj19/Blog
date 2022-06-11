import { Link } from "react-router-dom";
import "./sidebar.css";
import { useAppContext } from '../../../context/context'
import { useState, useEffect } from "react";

export default function Sidebar() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  return (
    <div className="sidebarBlog">
      <div className="sidebarItemBlog">
        <span className="sidebarTitleBlog">ABOUT ME</span>
        <img
          src={`data:image/jpeg;base64,${user?.image}`}
          alt=""
        />
        <p>
          {user?.description}
        </p>
      </div>
      <div className="sidebarItemBlog">
        <span className="sidebarTitleBlog">CATEGORIES</span>
        <ul className="sidebarListBlog">
          <li className="sidebarListItemBlog">
            <Link className="link" to="/posts?cat=Life">
              Life
            </Link>
          </li>
          <li className="sidebarListItemBlog">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </li>
          <li className="sidebarListItemBlog">
            <Link className="link" to="/posts?cat=Sport">
              Sport
            </Link>
          </li>
          <li className="sidebarListItemBlog">
            <Link className="link" to="/posts?cat=Style">
              Style
            </Link>
          </li>
          <li className="sidebarListItemBlog">
            <Link className="link" to="/posts?cat=Tech">
              Tech
            </Link>
          </li>
          <li className="sidebarListItemBlog">
            <Link className="link" to="/posts?cat=Cinema">
              Cinema
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebarItemBlog">
        {/* <span className="sidebarTitleBlog">FOLLOW US</span>
        <div className="sidebarSocialBlog">
          <i className="sidebarIconBlog fab fa-facebook-square"></i>
          <i className="sidebarIconBlog fab fa-instagram-square"></i>
          <i className="sidebarIconBlog fab fa-pinterest-square"></i>
          <i className="sidebarIconBlog fab fa-twitter-square"></i>
        </div> */}
      </div>
    </div>
  );
}
