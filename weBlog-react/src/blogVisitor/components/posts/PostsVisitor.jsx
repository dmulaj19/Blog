import Post from "../post/PostVisitor";
import "../../../client/components/posts/posts.css";
import { useAppContext } from '../../../context/context'
import { useState, useEffect } from "react";
import { mainAxios } from '../../../mainAxios';
import { useParams } from "react-router-dom";

export default function PostsVisitor() {
  //const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()
  const { id } = useParams();
  const [posts, setPosts] = useState([])
  const [blog, setBlog] = useState({})

  useEffect(() => {
    mainAxios.get(`/blogs/${id}`)
      .then(res => {
        if (res?.status === 200) {
          setBlog(res?.data)
        }
      })
  }, []);


  useEffect(() => {
    mainAxios.get(`/posts/blogId?blogId=${id}`)
      .then(res => {
        if (res?.status === 200) {
          setPosts([...res?.data])
        }
      })
  }, []);



  return (
    <>
      <div className="header">
        <div className="headerTitles">
        </div>
        <div className="headerTitles">
          <span className="headerTitleLg">{blog?.name}</span>
        </div>
        <img
          className="headerImg"
          src={blog.image ? `data:image/jpeg;base64,${blog?.image}` : "https://images.pexels.com/photos/768473/pexels-photo-768473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
          alt=""
        />
      </div>
      <div className="posts">
        {posts && posts.map((post) => {
          const postDate = new Date(post.createdDate).toLocaleDateString("en-US")
          return (
            <Post
              categories={post?.assignedCategories}
              postId={post?.id}
              postTitle={post.title}
              postContent={post.content}
              postDate={postDate}
              img={`data:image/jpeg;base64,${post?.image}`}
            />
          )
        })
        }
      </div>
    </>

  );
}
