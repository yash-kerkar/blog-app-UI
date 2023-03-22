import React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
import Base from "../../Components/Base";
import { UserContext } from "../../Context/UserProvider";
import { selectUser } from "../../features/userSlice";

function AdminDashboard() {
  return (
    <Base>
      <div className="text-center mt-2">
        <Card>
          <CardTitle>
            <h2>Admin Dashboard</h2>
          </CardTitle>
          <CardBody>
            <Row>
              <Col md={{ size: 3, offset: 3 }}>
                <Link to="/">
                  <h4 className="bg-dark p-2 font-italic">Blogs</h4>
                </Link>
              </Col>
              <Col md={{ size: 3 }}>
                <Link to="/admin/categories">
                  <h4 className="bg-dark p-2 font-italic">Categories</h4>
                </Link>
              </Col>
            </Row>
            <Row className="mt-3 text-center">
              <Col md={{ size: 3, offset: 4 }}>
                <Link>
                  <h4 className="bg-dark p-2 font-italic">Users</h4>
                </Link>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </Base>
  );
}

export default AdminDashboard;
