import { useState } from 'react'
import axios from 'axios'
import "./write.css";
import { mainAxios } from '../../../mainAxios';
import { useHistory } from "react-router-dom";
import { useAppContext } from '../../../context/context'
import { CloudUpload } from "@material-ui/icons";

export default function Write() {

  let history = useHistory();
  const [post, setPost] = useState({});
  const [postImage, setPostImage] = useState("https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
  const [selectedFile, setSelectedFile] = useState(null)
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  const handlePostInputs = (e) => {
    const key = e.target.name
    const value = e.target.value

    setPost(state => ({
      ...state,
      [key]: value
    }))
  }

  const fileSelectedHandler = event => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
    setPostImage(URL.createObjectURL(event.target.files[0]))
  }

  const submitPost = (e) => {
    e.preventDefault();

    let body = { ...post, blog: { id: selectedBlog?.id } }

    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("post", JSON.stringify(body))

    mainAxios.post('/posts', formData)
      .then(res => {
        console.log({ res })
        history.push("/");
      })
  }

  return (
    <div className="write">
      <div className='writePP'>
        <img
          className="writeImg"
          src={postImage}
          alt=""
        />
        {/* <input
          type="file"
          name="image"
          id="file"
          accept=".jpeg, .png, .jpg"
          onChange={fileSelectedHandler}
          class="writePPInput"
        /> */}
        <label className="custom-file-upload">
          <input
            style={{display: 'none'}}
            type="file"
            name="image"
            id="file"
            accept=".jpeg, .png, .jpg"
            onChange={fileSelectedHandler}
            class="writePPInput"
          />
          <CloudUpload className="uploadIcon" /> Upload Photo of Post
        </label>
      </div>
      <form className="writeForm" onSubmit={submitPost}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} />
          <input
            className="writeInput"
            placeholder="Title"
            name="title"
            type="text"
            autoFocus={true}
            onChange={handlePostInputs}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            name="content"
            type="text"
            autoFocus={true}
            onChange={handlePostInputs}
          />
        </div>
        <button className="writeSubmit">
          Publish
        </button>
      </form>
    </div>
  );
}
