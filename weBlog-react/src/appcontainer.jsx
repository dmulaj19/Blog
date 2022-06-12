import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Sidebar from "./admin/components/sidebar/Sidebar";
import Home from "./admin/pages/home/Home";
import AdminLogin from "./admin/pages/adminLogin/AdminLogin";
import NewProduct from "./admin/pages/newProduct/NewProduct";
import NewUser from "./admin/pages/newUser/NewUser";
import Product from "./admin/pages/product/Product";
import BlogList from "./admin/pages/blogList/BlogList";
import RequestList from "./admin/pages/requestList/RequestList";

import User from "./admin/pages/user/User";
import UserList from "./admin/pages/userList/UserList";
import Topbar from "./admin/components/topbar/Topbar";
import TopbarBlog from "./client/components/topbarBlog/Topbar";

import Homepage from "./client/pages/homepage/Homepage";
import Login from "./client/pages/login/Login";
import Register from "./client/pages/register/Register";
import Settings from "./client/pages/settings/Settings";
import Single from "./client/pages/single/Single";
import Write from "./client/pages/write/Write";
import "./App.css";

import { useAppContext } from './context/context'
import HomepageVisitor from "./blogVisitor/pages/homepage/HomepageVisitor";
import RegisterVisitor from "./blogVisitor/pages/register/RegisterVisitor";
import LoginVisitor from "./blogVisitor/pages/login/LoginVisitor";
import TopbarVisitor from "./blogVisitor/components/topbarBlog/TopbarVisitor";
import PostsVisitor from "./blogVisitor/components/posts/PostsVisitor";
import SingleVisitor from "./blogVisitor/pages/single/SingleVisitor";

const AppContainer = function (props) {
    const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()
    const bloggerLoggedIn = user && user?.role?.id === 2;
    const blogVisitorLoggedIn = user && user?.role?.id === 3;
    const adminLoggedIn = user && user?.role?.id === 1;

    console.log({ bloggerLoggedIn, adminLoggedIn, blogVisitorLoggedIn })

    if (props) {
        const url = props.location.pathname.split("/")[1];
        console.log({ url })
        return (
            <Router>
                {
                    url === "admin" ? (
                        <>
                            <Topbar />
                            <div className="container">
                                {adminLoggedIn ? <Sidebar /> : <></>}
                                <Switch>
                                    <Route exact path="/admin">
                                        {adminLoggedIn ? <Home /> : <AdminLogin />}
                                    </Route>
                                    {/* <Route path="/adminLogin"> <AdminLogin /></Route> */}
                                    <Route path="/admin/users">
                                        <UserList />
                                    </Route>
                                    <Route path="/admin/requests">
                                        <RequestList />
                                    </Route>
                                    <Route path="/user/:userId">
                                        <User />
                                    </Route>
                                    <Route path="/admin/newUser">
                                        <NewUser />
                                    </Route>
                                    <Route path="/admin/blogs">
                                        <BlogList />
                                    </Route>
                                    <Route path="/blog/:blogId">
                                        <Product />
                                    </Route>
                                    <Route path="/admin/newproduct">
                                        <NewProduct />
                                    </Route>
                                </Switch>
                            </div>

                        </>
                    ) :
                        (
                            url !== "weblog" ? (
                                <div>
                                    <TopbarBlog />
                                    <Switch>
                                        <Route exact path="/">
                                            {/* {bloggerLoggedIn ? <Homepage /> : <Register />} */}
                                            <Homepage />
                                        </Route>
                                        <Route path="/posts">
                                            <Homepage />
                                        </Route>
                                        <Route path="/register">
                                            {bloggerLoggedIn ? <Homepage /> : <Register />}
                                        </Route>
                                        <Route path="/login"> <Login /></Route>
                                        <Route path="/post/:id">
                                            <Single />
                                        </Route>
                                        <Route path="/write">{bloggerLoggedIn ? <Write /> : <Login />}</Route>
                                        <Route path="/settings">
                                            {bloggerLoggedIn ? <Settings /> : <Login />}
                                        </Route>
                                    </Switch>
                                </div>
                            ) : (
                                <div>
                                    <TopbarVisitor />
                                    <Switch>
                                        <Route exact path="/weblog">
                                            <HomepageVisitor />
                                        </Route>
                                        <Route path="/weblog/register">
                                            {blogVisitorLoggedIn ? <HomepageVisitor /> : <RegisterVisitor />}
                                        </Route>
                                        <Route path="/weblog/login"> <LoginVisitor /></Route>
                                        <Route path="/weblog/blog/:id">
                                            <PostsVisitor/>
                                        </Route>
                                        <Route path="/weblog/post/:id">
                                            <SingleVisitor/>
                                        </Route>
                                    </Switch>
                                </div>
                            )
                        )}
            </Router>
        );
    }
    return null;
};

export default AppContainer;