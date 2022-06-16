import "../../../client/components/header/header.css";
import { useAppContext } from '../../../context/context'
import { Link, useHistory } from "react-router-dom";

export default function Header() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  return (
    <div className="header">
      <div className="headerTitles">
        {!user ?
          <>
            <span className="headerTitleSm">
              Create a blog to start sharing your thoughts
            </span>
            <Link to="/register" className="getStartedBtn">
              <button >Get Started</button>
            </Link>
          </>
          :
          <></>
        }
      </div>
      <div className="headerTitles">
        <span className="headerTitleLg">{selectedBlog?.name}</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
  );
}
