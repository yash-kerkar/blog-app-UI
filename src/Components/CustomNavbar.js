import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { doLogout, getCurrentUser, isLoggedIn } from "../Services/auth";
import { useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout2 } from "../features/userSlice";
import { selectUser } from "../features/userSlice";
import { BASE_URL, brand } from "../Services/helper";

const CustomNavbar = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const userRedux = useSelector(selectUser);

  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const logout = () => {
    doLogout(() => {
      dispatch(logout2());
      toast.success("Logged out!");
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <Navbar
      style={{ backgroundColor: "white" }}
      color="faded"
      light
      expand="md"
      fixed="top"
    >
      <NavbarBrand tag={ReactLink} to="/">
        <img
          alt="logo"
          src={BASE_URL + "post/image/" + brand}
          style={{
            height: 40,
            width: 40,
            background: "transparent",
          }}
        />
        logster
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={ReactLink} to="/feed">
              New Feed
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/about">
              About
            </NavLink>
          </NavItem>
          {userRedux.isAdmin && (
            <NavItem>
              <NavLink tag={ReactLink} to="/admin/dashboard">
                Admin Dashboard
              </NavLink>
            </NavItem>
          )}
          {userRedux.login && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/user/add-post">
                  Create Blog
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={ReactLink}
                  to={"/user/" + userRedux.data.id + "/posts"}
                >
                  My Posts
                </NavLink>
              </NavItem>
            </>
          )}
          {/*<UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>*/}
        </Nav>
        <Nav>
          {userRedux.login && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to={"/user/" + userRedux.data.id}>
                  My Profile
                </NavLink>
              </NavItem>
            </>
          )}
          {!userRedux.login && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/signup">
                  Sign up
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
        <NavbarText></NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
