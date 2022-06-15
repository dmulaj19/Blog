// import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebarBlog/Sidebar";
import "./homepage.css";
import { useAppContext } from '../../../context/context'
import { Link, useHistory } from "react-router-dom";

export default function Homepage() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()


  return (
    <>
      <Header />
      <div className="homeBlog">
        {user ?
          <>
            <Posts />
            <Sidebar />
          </>
          :
          <>            
          </>
        }
      </div>
    </>
  );
}
