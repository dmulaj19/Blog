import Post from "../post/Post";
import "./posts.css";
import { useAppContext } from '../../../context/context'
import { useState, useEffect } from "react";
import { mainAxios } from '../../../mainAxios';

export default function Posts() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  const [posts, setPosts] = useState([])

  
  useEffect(() => {
    mainAxios.get(`/posts/blogId?blogId=${selectedBlog?.id}`)
      .then(res => {
        if(res?.status === 200) {
          setPosts([...res?.data])
        }
      })
  },[]);

  return (
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
      })}
     </div>
  );
}
