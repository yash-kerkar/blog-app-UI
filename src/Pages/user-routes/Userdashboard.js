import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardBody,
  CardSubtitle,
  CardText,
} from "reactstrap";
import Base from "../../Components/Base";
import UserInfo from "../../Components/UserInfo";
import { UserContext } from "../../Context/UserProvider";

export const Userdashboard = () => {
  const { id } = useParams();
  return (
    <Base>
      <UserInfo id={id} />
    </Base>
  );
};
