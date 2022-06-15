import { useEffect, useState } from "react";
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { mainAxios } from '../../../mainAxios';

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const [users, setUsers] = useState([])

  useEffect(() => {
    mainAxios.get('/users')
      .then(res => {
        if(res?.status === 200) {
          setUsers([...res?.data])
        }
      })
  }, []);

  
  const handleDelete = (id) => {
    setUsers(users.filter((item) => item.id !== id));
    mainAxios.delete('/users/'+id)
      .then(res => {
      })
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.firstName + " " + params.row.lastName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "phoneNumber",
      headerName: "Phone",
      width: 180,
    },
      // {
      //   field: "action",
      //   headerName: "Action",
      //   width: 150,
      //   renderCell: (params) => {
      //     return (
      //       <>
      //         {/* <Link to={"/user/" + params.row.id}>
      //           <button className="userListEdit">Edit</button>
      //         </Link> */}
      //         <DeleteOutline
      //           className="userListDelete"
      //           onClick={() => handleDelete(params.row.id)}
      //         />
      //       </>
      //     );
      //   },
      // },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
