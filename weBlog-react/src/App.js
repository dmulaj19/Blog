import Sidebar from "./admin/components/sidebar/Sidebar";
import Topbar from "./admin/components/topbar/Topbar";
import "./App.css";
import Home from "./admin/pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./admin/pages/userList/UserList";
import User from "./admin/pages/user/User";
import NewUser from "./admin/pages/newUser/NewUser";
import BlogList from "./admin/pages/blogList/BlogList";
import Product from "./admin/pages/product/Product";
import NewProduct from "./admin/pages/newProduct/NewProduct";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <BlogList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
        </Switch>
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;
