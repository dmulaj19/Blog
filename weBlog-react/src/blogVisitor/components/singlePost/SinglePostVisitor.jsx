import { Link } from "react-router-dom";
import "./singlePostVisitor.css";
import { useAppContext } from '../../../context/context'
import { useState, useEffect } from 'react'
import { Edit, Delete, Publish, ThumbUp, ThumbDown, Reply } from "@material-ui/icons";
import { mainAxios } from '../../../mainAxios';
import { useHistory } from "react-router-dom";
import Comment from "../comment/Comment";
import Select from "react-select";
import avatar from "../comment/cat_avatar.png"
import { MultiSelect } from "react-multi-select-component";

export default function SinglePostVisitor({ post }) {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  const [postImage, setPostImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [updatedPost, setUpdatedPost] = useState({});
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [blog, setBlog] = useState({})
  const [postWriter, setPostWriter] = useState({})

  useEffect(() => {
    if (post) {

      mainAxios.get(`http://localhost:8080/blogs/${post?.blogId}`)
        .then(res => {
          if (res?.status === 200) {
            setBlog(res?.data)

            mainAxios.get(`http://localhost:8080/users/${res?.data?.ownerId}`)
              .then(res => {
                if (res?.status === 200) {
                  setPostWriter(res?.data)
                }
              })

          }
        })
    }
  }, [post]);


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

  console.log({ post, blog, postWriter })
  // useEffect(() => {
  //   mainAxios.get(`/categories`)
  //     .then(res => {
  //       if (res?.status === 200) {
  //         let cats = res?.data.map(category => {
  //           return {
  //             value: category?.id,
  //             label: category?.name
  //           }
  //         })
  //         setCategories(cats)
  //       }
  //     })
  // }, []);

  // console.log({ categories })

  const postDate = new Date(post?.createdDate).toLocaleDateString("en-US")

  let history = useHistory();

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
          className="singlePostImg"
          src={postImage ? postImage : `data:image/jpeg;base64,${post?.image}`}
          alt=""
        />
        <h1 className="singlePostTitle">
          {post?.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                {postWriter?.firstName + " " + postWriter?.lastName}
              </Link>
            </b>
          </span>
          <span>{postDate}</span>
        </div>
        <p className="singlePostDesc">
          {post?.content}
        </p>
        {user ? (
          <div class="comments">
            <div class="comments-details">
              <span class="total-comments comments-sort">{comments?.length} {comments.length === 1 ? "Comment" : "Comments"}</span>
            </div>
            <div class="comment-box add-comment">
              <span class="commenter-pic">
                <img src={user?.image ? `data:image/jpeg;base64,${user?.image}` : avatar} className="userImage" alt="" />
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
        )
          :
          <span>Login to leave a comment</span>
        }
      </div>
    </div>
  );
}
