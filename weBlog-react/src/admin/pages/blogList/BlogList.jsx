import "./blogList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { mainAxios } from '../../../mainAxios';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
 
toast.configure()

export default function BlogList() {
  //const [data, setData] = useState(productRows);
  const [blogs, setBlogs] = useState([])


  useEffect(() => {

    mainAxios.get('/blogs')
      .then(res => {
        if (res?.status === 200) {
          setBlogs([...res?.data])
        }
      })
  }, []);

  const handleDelete = (id) => {
    setBlogs(blogs.filter((item) => item.id !== id));
    mainAxios.delete('/blogs/' + id)
      .then(res => {
        toast.success('Blog deleted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      })
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Blog",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {params.row.name}
          </div>
        );
      },
    },
    { field: "domain", headerName: "Domain", width: 200 },
    {
      field: "active",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => params.row.active === 1 ? 'Active' : "Not active"


    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link> */}
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const notify = () => {
    toast.success('Blog deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })

  };

  return (

    <div className="blogList">
      {/* <button onClick={notify}>Notify</button>; */}       
      <DataGrid
        rows={blogs}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
