import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebarBlog/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";
import { useParams } from "react-router-dom";
import { mainAxios } from '../../../mainAxios';

export default function Single() {
  const { id } = useParams();
  const [post, setPost] = useState(null)



  useEffect(() => {
      mainAxios.get('/posts/'+id)
      .then(res => {
        setPost(res?.data)
      })
  }, [id]);

  return (
    <div className="single">
      <SinglePost post={post}/>
      <Sidebar />
    </div>
  );
}
