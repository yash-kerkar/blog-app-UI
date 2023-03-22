import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Base from "../Components/Base";
import { Row, Col } from "reactstrap";
import CategorySideMenu from "../Components/CategorySideMenu";
import { getPostsByCategory } from "../Services/post-service";
import { useState } from "react";
import { Post } from "../Components/Post";
import { Container } from "reactstrap";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import { NewFeed } from "../Components/NewFeed";

function Categories() {
  const { id } = useParams();
  return (
    <Base>
      <Row>
        <Col md={3} className="border">
          <CategorySideMenu id={id}></CategorySideMenu>
        </Col>
        <Col md={9}>
          <NewFeed category={id}></NewFeed>
        </Col>
      </Row>
    </Base>
  );
}

export default Categories;
