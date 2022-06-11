import { Link } from "react-router-dom";
import "./singlePost.css";
import { useAppContext } from '../../../context/context'
import { useState, useEffect } from 'react'
import { Edit, Delete, Publish, ThumbUp, ThumbDown, Reply } from "@material-ui/icons";
import { mainAxios } from '../../../mainAxios';
import { useHistory } from "react-router-dom";
import Comment from "../comment/Comment";

export default function SinglePost({ post }) {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  const [postImage, setPostImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [updatedPost, setUpdatedPost] = useState({});
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    if (post) {
      mainAxios.get(`/comments/postId?postId=${post?.id}`)
        .then(res => {
          if (res?.status === 200) {
            console.log({ comments: res?.data })
            setComments(res?.data)
          }
        })
    }
  }, [post, newComment]);

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
        history.push("/");
      })
  }

  const deletePost = () => {
    mainAxios.delete(`/posts/${post?.id}`)
      .then(res => {
        history.push("/");
      })
  }

  const handleCommentInput = (e) => {
    setNewComment(e?.target?.value)
  }

  const submitComment = () => {
    let comment = {
      user: {
        id: user?.id
      },
      post: {
        id: post?.id
      },
      content: newComment
    }

    mainAxios.post(`/comments`, comment)
      .then(res => {
        if (res?.status === 201) setNewComment("")
      })
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="userImage"
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
            <Delete className="deleteBtn" onClick={deletePost} />
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
            <span class="total-comments comments-sort">{comments?.length} {comments.length === 1 ? "Comment" : "Comments"}</span>
          </div>
          <div class="comment-box add-comment">
            <span class="commenter-pic">
              <img src={postImage ? postImage : `data:image/jpeg;base64,${post?.image}`} className="userImage" alt="" />
            </span>
            <span class="commenter-name">
              <input type="text" placeholder="Add a public comment" name="Add Comment" value={newComment} onChange={handleCommentInput} />
              <button type="submit" class="btn btn-default" onClick={submitComment}>Comment</button>
              <button type="cancel" class="btn btn-default" onClick={() => setNewComment("")}>Cancel</button>
            </span>
          </div>
          {
            comments?.map(comment => <Comment comment={comment} />)
          }
        </div>
      </div>
    </div>
  );
}
