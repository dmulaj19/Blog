import { Link } from "react-router-dom";
import "./singlePost.css";
import { useAppContext } from '../../../context/context'
import { useState } from 'react'
import { Edit, Delete, Publish, ThumbUp, ThumbDown, Reply } from "@material-ui/icons";
import { mainAxios } from '../../../mainAxios';
import { useHistory } from "react-router-dom";


export default function SinglePost({ post }) {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  const [postImage, setPostImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [updatedPost, setUpdatedPost] = useState({});

  console.log({ post })

  const postDate = new Date(post?.createdDate).toLocaleDateString("en-US")

  let history = useHistory();

  const handlePostInputs = (e) => {
    const key = e.target.name
    const value = e.target.value
    setUpdatedPost(state => ({
      ...state,
      [key]: value
    }))
  }

  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0])
    setPostImage(URL.createObjectURL(event.target.files[0]))
  }

  const updatePost = () => {

    let body = { ...post, ...updatedPost, blog: { id: selectedBlog.id } }

    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("post", JSON.stringify(body))

    console.log({ body })
    mainAxios.post(`/posts/${post?.id}`, formData)
      .then(res => {    
        console.log({res})   
        history.push("/");
      })
  }

  const deletePost = () => {
    mainAxios.delete(`/posts/${post?.id}`)
    .then(res => {    
      console.log({res})   
      history.push("/");
    })
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={postImage ? postImage : `data:image/jpeg;base64,${post?.image}`}
          alt=""
        />
        <input
          type="file"
          name="image"
          id="file"
          accept=".jpeg, .png, .jpg"
          onChange={fileSelectedHandler}
          class="writePPInput"
        />
        <div className="singlePostTitleWrapper">
          <input
            className="singlePostTitle"
            placeholder="Add custom title"
            name="title"
            type="text"
            autoFocus={true}
            defaultValue={post?.title}
            onChange={handlePostInputs}
          />
          <button className="singlePostEdit" onClick={updatePost}>
            <Publish />
          </button>
          <button className="singlePostEdit" onClick={updatePost}>
            <Delete className="deleteBtn" onClick={deletePost}/>
          </button>
        </div>


        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                {user?.firstName + " " + user?.lastName}
              </Link>
            </b>
          </span>
          <span>{postDate}</span>
        </div>
        <textarea
          className="singlePostText singlePostTextArea"
          placeholder="Tell your story..."
          name="content"
          type="text"
          defaultValue={post?.content}
          autoFocus={true}
          onChange={handlePostInputs}
        />
        <div class="comments">
          <div class="comments-details">
            <span class="total-comments comments-sort">117 Comments</span>   
          </div>
          <div class="comment-box add-comment">
            <span class="commenter-pic">
              <img src={postImage ? postImage : `data:image/jpeg;base64,${post?.image}`} className="img-fluid" alt=""/>
            </span>
            <span class="commenter-name">
              <input type="text" placeholder="Add a public comment" name="Add Comment"/>
              <button type="submit" class="btn btn-default">Comment</button>
              <button type="cancel" class="btn btn-default">Cancel</button>
            </span>
          </div>
          <div class="comment-box">
            <span class="commenter-pic">
              <img src={postImage ? postImage : `data:image/jpeg;base64,${post?.image}`} className="img-fluid" alt=""/>
            </span>
            <span class="commenter-name">
              <a href="#">Happy markuptag</a> <span class="comment-time">2 hours ago</span>
            </span>       
            <p class="comment-txt more">Suspendisse massa enim, condimentum sit amet maximus quis, pulvinar sit amet ante. Fusce eleifend dui mi, blandit vehicula orci iaculis ac.</p>
            <div class="comment-meta">
              <button class="comment-like"><ThumbUp/> 99</button>
              <button class="comment-dislike"><ThumbDown/> 149</button> 
              <button class="comment-reply reply-popup"><Reply/> Reply</button>         
            </div>
            {/* <div class="comment-box add-comment reply-box">
              <span class="commenter-pic">
                <img src={postImage ? postImage : `data:image/jpeg;base64,${post?.image}`} className="img-fluid" alt=""/>
              </span>
              <span class="commenter-name">
                <input type="text" placeholder="Add a public reply" name="Add Comment"/>
                <button type="submit" class="btn btn-default">Reply</button>
                <button type="cancel" class="btn btn-default reply-popup">Cancel</button>
              </span>
          </div> */}
        </div>
      </div>
        {/* <p className="singlePostDesc">{post?.content}</p> */}
      </div>
    </div>
  );
}
