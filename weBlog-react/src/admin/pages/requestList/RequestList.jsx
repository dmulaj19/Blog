import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { mainAxios } from '../../../mainAxios';

export default function RequestList() {
  //const [data, setData] = useState(productRows);
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    mainAxios.get('/requests')
      .then(res => {
        if (res?.status === 200) {
          //const requests = res?.data.filter(req => req.processed === 0)
          setRequests([...res?.data])
        }
      })
  }, [loading]);

  const handleDelete = (id) => {
    setRequests(requests.filter((item) => item.id !== id));
  };

  const activateBlog = (request) => {
    setLoading(true)
    let blog = {
      user: {
        id: request.userId
      },
      request: {
        id: request.id
      },
      name: request.blogName,
      domain: request.blogDomain,
      active: 1
    }

    mainAxios.post(`/requests/${request.id}`, blog)
      .then(res => {
        setLoading(false)
      })
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "blogName",
      headerName: "Blog Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.blogName}
          </div>
        );
      },
    },
    //new Date(post.createdDate).toLocaleDateString("en-US")
    {
      field: "createdDate",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {new Date(params.row.createdDate).toLocaleDateString("en-US")}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {
              params.row.processed === 0 ?
                <button
                  className="productListEdit"
                  onClick={() => activateBlog(params.row)}
                >
                  Activate Blog
                </button>
                :
                <>Already activated</>
            }
            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={requests}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  )
}
