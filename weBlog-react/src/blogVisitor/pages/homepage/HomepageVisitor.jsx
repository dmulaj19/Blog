import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/PostsVisitor";
import Sidebar from "../../components/sidebarBlog/Sidebar";
import "./homepage.css";
import { useAppContext } from '../../../context/context'
import { Link, useHistory } from "react-router-dom";
import { mainAxios } from '../../../mainAxios';


export default function HomepageVisitor() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    mainAxios.get('/blogs/')
      .then(res => {
        setBlogs(res?.data)
      })
  }, []);

  
  return (
    <>
      <div className="header">
        <div className="headerTitles">
        </div>
        <div className="headerTitles">
          <span className="headerTitleLg">WeBlog</span>
        </div>
        <img
          className="headerImg"
          src="https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
      </div>
      <div className="homeBlog">
        <div className="posts">
          {blogs && blogs.map((blog) => {
            return (
              <div className="post">
                <img
                  className="postImg"
                  src={blog.image ? `data:image/jpeg;base64,${blog?.image}` : "https://images.pexels.com/photos/768473/pexels-photo-768473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                  alt=""
                />
                <div className="postInfo">
                  <span className="postTitle">
                    <Link to={`weblog/blog/${blog?.id}`} className="link">
                      {blog?.name}
                    </Link>
                  </span>
                  <hr />
                  {/* <span className="postDate">{postDate}</span> */}
                </div>
                {/* <p className="postDesc">
                  {postContent}
                </p> */}
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}
