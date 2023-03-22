import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";
import "../Css/Landing.css";

const Base = ({ title = "Welcome to website", children }) => {
  return (
    <div class="container-fluid p-0 m-0">
      <CustomNavbar />
      <div className="margin-fix">{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
