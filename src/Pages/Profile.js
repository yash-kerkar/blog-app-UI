import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Row, Container } from "reactstrap";
import Base from "../Components/Base";
import { NewFeed } from "../Components/NewFeed";
import UserInfo from "../Components/UserInfo";
import MyPosts from "./MyPosts";
import { Userdashboard } from "./user-routes/Userdashboard";
import "../Css/Landing.css";

function Profile() {
  const [about, setAbout] = useState(true);
  const { id } = useParams();
  return (
    <Base>
      <Row
        className="margin-fix"
        style={{ paddingTop: "2%", marginBottom: "2%" }}
      >
        <Col className="text-center" md={{ size: 4, offset: 4 }}>
          <span
            className={about ? "bg-primary p-3" : "bg-light p-3"}
            style={{ cursor: "pointer" }}
            onClick={() => setAbout(true)}
          >
            About
          </span>
          <span
            className={!about ? "bg-primary p-3" : "bg-light p-3"}
            style={{ cursor: "pointer" }}
            onClick={() => setAbout(false)}
          >
            Posts
          </span>
        </Col>
        <Container></Container>
      </Row>
      <Row className="mt-2">
        <Col md={{ size: 6, offset: 3 }}>
          {about ? <UserInfo id={id} /> : <NewFeed user={id} />}
        </Col>
      </Row>
    </Base>
  );
}

export default Profile;
