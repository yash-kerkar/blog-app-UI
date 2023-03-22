import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "./Components/Base";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AddPost from "./Components/AddPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./Components/PrivateRoute";
import { Userdashboard } from "./Pages/user-routes/Userdashboard";
import { PostPage } from "./Pages/PostPage";
import { UserProvider } from "./Context/UserProvider";
import Categories from "./Pages/Categories";
import MyPosts from "./Pages/MyPosts";
import EditPost from "./Pages/EditPost";
import Profile from "./Pages/Profile";
import AdminDashboard from "./Pages/admin-routes/AdminDashboard";
import AdminRoute from "./Components/AdminRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login2, selectUser } from "./features/userSlice";
import { getCurrentUser, isAdmin, isLoggedIn } from "./Services/auth";
import AdminCategories from "./Pages/admin-routes/AdminCategories";
import AddCategory from "./Pages/admin-routes/AddCategory";
import EditCategory from "./Pages/admin-routes/EditCategory";
import Landing from "./Pages/Landing";

function App() {
  const userRedux = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      login2({
        data: getCurrentUser(),
        login: isLoggedIn(),
        isAdmin: isAdmin(),
      })
    );
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/feed" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/posts/:id" element={<PostPage />}></Route>
        <Route path="/categories/:id" element={<Home />}></Route>
        <Route path="/search/:keyword" element={<Home />}></Route>
        <Route path="/viewProfile/:id" element={<Profile />}></Route>
        <Route path="/user" element={<PrivateRoute />}>
          <Route path=":id" element={<Userdashboard />}></Route>
          <Route path="add-post" element={<AddPost />}></Route>
          <Route path=":id/posts" element={<MyPosts />}></Route>
          <Route path=":id/posts/:postId/edit" element={<EditPost />}></Route>
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="categories" element={<AdminCategories />}></Route>
          <Route path="categories/add" element={<AddCategory />}></Route>
          <Route path="categories/:id/edit" element={<EditCategory />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
