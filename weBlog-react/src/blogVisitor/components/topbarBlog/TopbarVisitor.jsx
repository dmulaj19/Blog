import { Link } from "react-router-dom";
import "./topbar.css";
import { useAppContext } from '../../../context/context'
import { setAuthToken } from '../../../mainAxios'
import { useHistory } from "react-router-dom";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function TopbarVisitor() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  let history = useHistory();

  // console.log({blogger: user })

  const handleLogout = (e) => {

    e.preventDefault();
    setUser(null);
    setAuthToken(null);
    setSelectedBlog(null)
    history.push("/weblog/login");
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
            <Link className="link" to="/weblog">
              HOME
            </Link>
          </li>
          <li className="topBlogListItem">ABOUT</li>
          {/* <li className="topBlogListItem">CONTACT</li>           */}
          {/* {user && <li className="topBlogListItem">LOGOUT</li>} */}
          
        </ul>
      </div>
      <div className="topBlogRight">
        {user ? (
          <>
          <Link className="link" to="/weblog/settings">
            <div className="topbarIconContainer">
            <Settings />
          </div>
          </Link>
          <a 
            href="/weblog"
            className="logOutBtnClient"
            onClick={handleLogout}
          >
            LOG OUT
          </a>
          </>
          
        ) : (
          <ul className="topBlogList">
            <li className="topBlogListItem">
              <Link className="link" to="/weblog/login">
                LOGIN
              </Link>
            </li>
            <li className="topBlogListItem">
              <Link className="link" to="/weblog/register">
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
