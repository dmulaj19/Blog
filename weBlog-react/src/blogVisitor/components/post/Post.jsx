import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ categories, postId, img, postTitle, postContent, postDate }) {


  return (
    <div className="post">
      <img
        className="postImg"
        src={img}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          {
            categories?.map(category => {
              return (
                <span className="postCat">
                  <Link className="link" to="/posts?cat=Music">
                    {category?.name}
                  </Link>
                </span>
              )
            })
          }
        </div>
        <span className="postTitle">
          <Link to={`/post/${postId}`} className="link">
            {postTitle}
          </Link>
        </span>
        <hr />
        <span className="postDate">{postDate}</span>
      </div>
      <p className="postDesc">
        {postContent}
      </p>
    </div>
  );
}
