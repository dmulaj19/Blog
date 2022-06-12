import { Link } from "react-router-dom";
import "./topbar.css";
import { useAppContext } from '../../../context/context'
import { setAuthToken } from '../../../mainAxios'
import { useHistory } from "react-router-dom";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  let history = useHistory();

  console.log({blogger: user })

  const handleLogout = (e) => {
    console.log("blogger logging out")
    e.preventDefault();
    setUser(null);
    setAuthToken(null);
    setSelectedBlog(null)
    history.push("/login");
  };

  return (
    <div className="topBlog">
      <div className="topBlogLeft">
        <i className="topBlogIcon fab fa-facebook-square"></i>
        <i className="topBlogIcon fab fa-instagram-square"></i>
        <i className="topBlogIcon fab fa-pinterest-square"></i>
        <i className="topBlogIcon fab fa-twitter-square"></i>
      </div>
      <div className="topBlogCenter">
        <ul className="topBlogList">
          <li className="topBlogListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topBlogListItem">ABOUT</li>
          <li className="topBlogListItem">CONTACT</li>
          <li className="topBlogListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {/* {user && <li className="topBlogListItem">LOGOUT</li>} */}
          
        </ul>
      </div>
      <div className="topBlogRight">
        {user ? (
          <>
          <Link className="link" to="/settings">
            <div className="topbarIconContainer">
            <Settings />
          </div>
          </Link>
          <a 
            href="/"
            className="logOutBtnClient"
            onClick={handleLogout}
          >
            LOG OUT
          </a>
          </>
          
        ) : (
          <ul className="topBlogList">
            <li className="topBlogListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topBlogListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topBlogSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
