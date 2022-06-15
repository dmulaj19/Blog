import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebarBlog/Sidebar";
import SinglePostVisitor from "../../components/singlePost/SinglePostVisitor";
import "./single.css";
import { useParams } from "react-router-dom";
import { mainAxios } from '../../../mainAxios';

export default function SingleVisitor() {
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
      <SinglePostVisitor post={post}/>
      <Sidebar />
    </div>
  );
}
