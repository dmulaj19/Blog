import "./settings.css";
import Sidebar from "../../components/sidebarBlog/Sidebar";
import { useAppContext } from  '../../../context/context'
import { useState, useEffect } from "react";
import { mainAxios } from '../../../mainAxios';


export default function Settings() {
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(`data:image/jpeg;base64,${user?.image}`)
  const [userInput, setUserInput] = useState({})

  const [blogger, setBlogger] = useState({})

  useEffect(() => {
    mainAxios.get('/users/' + user?.id)
      .then(res => {
        setBlogger(res?.data)
        setPreviewImage(`data:image/jpeg;base64,${res?.data?.image}`)
      })
  }, []);

  // console.log({blogger})

  const handleUpdateInput = (e) => {
    const key = e.target.name
    const value = e.target.value

    setUserInput(state => ({
      ...state,
      [key]: value
    }))
  }

  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0])
    setPreviewImage(URL.createObjectURL(event.target.files[0]))
  }

  const updateUser = (e) => {
    e.preventDefault();


    let userJson = {
      ...user,
      ...userInput
    }
    delete userJson['role'];

    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user", JSON.stringify(userJson))
    mainAxios.post(`/users/upload/${user.id}`, formData)
      .then(res => {
        setUser(res?.data)
      })
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          {/* <span className="settingsTitleDelete">Delete Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={updateUser}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <div>
              <img class="settingsPPIcon" src={previewImage} alt="" />
            </div>
            <input
              type="file"
              name="image"
              id="file"
              accept=".jpeg, .png, .jpg"
              onChange={fileSelectedHandler}
              className="settingsPPInput"
            />
          </div>
          <label>First Name</label>
          <input type="text" defaultValue={user?.firstName} name="firstName" onChange={handleUpdateInput} />
          <label>Last Name</label>
          <input type="text" defaultValue={user?.lastName} name="lastName" onChange={handleUpdateInput} />
          <label>Phone Number</label>
          <input type="text" defaultValue={user?.phoneNumber} name="phoneNumber" onChange={handleUpdateInput} />
          <label>Email</label>
          <input autoComplete="off" type="email" defaultValue={user?.email} name="email" onChange={handleUpdateInput} />
          <label>Username</label>
          <input type="text" defaultValue={user?.username} disabled name="name" />
          {/* <label>Password</label>
          <input type="password" defaultValue={user?.password} name="password" style={{ pointerEvents: "none" }} /> */}
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
