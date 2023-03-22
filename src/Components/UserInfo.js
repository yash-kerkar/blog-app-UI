import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardBody,
  CardSubtitle,
  CardText,
} from "reactstrap";
import Base from "../Components/Base";
import { UserContext } from "../Context/UserProvider";
import { getUserById } from "../Services/user-service";

export default function UserInfo(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(props.id).then((resp) => {
      setUser(resp);
    });
  }, []);

  return (
    <Row className="mt-3">
      {user && (
        <Col md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader className="text-center">
              <h2>Profile</h2>
            </CardHeader>
            <CardBody className="text-center">
              <CardText>
                <p>
                  <b>Name:</b> {user.name}
                </p>
              </CardText>
              <CardText>
                <p>
                  <b>Email ID:</b> {user.email}
                </p>
              </CardText>
              <CardText>
                <p>
                  <b>About:</b> {user.about}
                </p>
              </CardText>
              <CardText>
                <p>
                  <b>Number of Blogs Posted:</b> 1
                </p>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  );
}
