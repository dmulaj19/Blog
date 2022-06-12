import "./header.css";
import { useAppContext } from '../../../context/context'
import { Link, useHistory } from "react-router-dom";
import { CloudUpload } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { mainAxios } from '../../../mainAxios';

export default function Header() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()
  const [selectedFile, setSelectedFile] = useState(null)
  const [postImage, setPostImage] = useState("https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")

  const fileSelectedHandler = event => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
    setPostImage(URL.createObjectURL(event.target.files[0]))
  }


  useEffect(() => {
    if (selectedFile) {
      console.log("just uploaded a blog picture")
      let formData = new FormData();
      formData.append("file", selectedFile);

      mainAxios.put(`/blogs/${selectedBlog?.id}/uploadPhoto`, formData)
      .then(res => {
        console.log({ res })       
      })
    }
  }, [selectedFile]);

  return (
    <div className="header">
      <div className="headerTitles">
        {!user ?
          <>
            <span className="headerTitleSm">
              Create a blog to start sharing your thoughts
            </span>
            <Link to="/register">
              <button className="getStartedBtn">Get Started</button>
            </Link>
          </>
          :
          <></>
        }
      </div>
      <div className="headerTitles">
        <span className="headerTitleLg">{selectedBlog?.name}</span>
      </div>
      <img
        className="headerImg"
        src={postImage}
        // src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
      {user && <label className="custom-file-upload">
        <input
          style={{ display: 'none' }}
          type="file"
          name="image"
          id="file"
          accept=".jpeg, .png, .jpg"
          onChange={fileSelectedHandler}
          class="writePPInput"
        />
        <CloudUpload className="uploadIcon" /> Upload Photo of Blog
      </label>}
    </div>
  );
}
