import { Link } from "react-router-dom";
import "./sidebar.css";
import { useAppContext } from '../../../context/context'
import { useState, useEffect } from "react";
import { mainAxios } from '../../../mainAxios';

export default function Sidebar() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    mainAxios.get(`/categories`)
      .then(res => {
        if (res?.status === 200) {
          setCategories([...res?.data])
        }
      })
  }, []);

  console.log({ categories })
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
          {
            categories?.map((category) => {
              return (
                <li className="sidebarListItemBlog">
                  <Link className="link" to="/posts?cat=Life">
                    {category?.name}
                  </Link>
                </li>
              )
            })
          }
          
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