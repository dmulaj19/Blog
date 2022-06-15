import { Link } from "react-router-dom";
import "./singlePost.css";
import { useAppContext } from '../../../context/context'
import { useState, useEffect } from 'react'
import { Edit, Delete, Publish, ThumbUp, ThumbDown, Reply } from "@material-ui/icons";
import { mainAxios } from '../../../mainAxios';
import { useHistory } from "react-router-dom";
import Comment from "../comment/Comment";
import Select from "react-select";
import Multiselect from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default function SinglePost({ post }) {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  const [postImage, setPostImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [updatedPost, setUpdatedPost] = useState({});
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState([]);
  const [selectedValues, setSelectedValues] = useState([])

  useEffect(() => {
    if (post) {
      mainAxios.get(`/comments/postId?postId=${post?.id}`)
        .then(res => {
          if (res?.status === 200) {
            let comments = res?.data.map((comment) => {
              return (
                {
                  ...comment,
                  liked: false,
                  disliked: false
                }

              )
            })
            setComments(comments)
          }
        })
    }
  }, [post, newComment]);



  useEffect(() => {
    mainAxios.get(`/categories`)
      .then(res => {
        if (res?.status === 200) {
          let cats = res?.data.map(category => {
            return {
              cat: category?.id,
              key: category?.name
            }
          })
          setCategories(cats)
        }
      })
  }, []);

  useEffect(() => {

    let selectedCats = post?.assignedCategories.map(category => {
      return {
        cat: category?.id,
        key: category?.name
      }
    })

    setSelectedValues(selectedCats)
  }, [post])

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

    mainAxios.post(`/posts/${post?.id}`, formData)
      .then(res => {
        console.log({res})
        toast.success('Post updated successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
          // setTimeout(()=>{history.push("/")},4000)

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

  const onValueChange = (event) => {
    setSelected(event.target.value)
  }
  const formSubmit = (event) => {
    event.preventDefault();
    //console.log({ selected })
  }



  const onSelectCat = (list, item) => {
    //console.log({ list, item })

    mainAxios.put(`/posts/${post?.id}/categories/${item?.cat}`)
      .then(res => {
        //console.log({ res })

      })
  }
  const onRemoveCat = (list, item) => {
    //console.log({ list, item })

    mainAxios.delete(`/posts/${post?.id}/categories/${item?.cat}`)
      .then(res => {
        //console.log({ res })
      })
  }

  console.log({imggg: `data:image/jpeg;base64,${post?.image}`})

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {<img
          className="singlePostImg"
          src={postImage ? postImage : `data:image/jpeg;base64,${post?.image}`}
          alt=""
        />}
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
        <div className="categories-div">
          <label className="categories-label">Categories</label>
          <Multiselect
            selectedValues={selectedValues}
            displayValue="key"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={onRemoveCat}
            onSearch={function noRefCheck() { }}
            onSelect={onSelectCat}
            options={categories}
          />
          {/* {categories &&
            <div className="categories-select">
              <MultiSelect
                options={categories}
                value={selected}
                onChange={selectCategories}
                labelledBy="Select"
              />
            </div>
          } */}
        </div>
        <div class="comments">
          <div class="comments-details">
            <span class="total-comments comments-sort">{comments?.length} {comments.length === 1 ? "Comment" : "Comments"}</span>
          </div>
          <div class="comment-box add-comment">
            <span class="commenter-pic">
              <img src={postImage ? postImage : `data:image/jpeg;base64,${user?.image}`} className="userImage" alt="" />
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
