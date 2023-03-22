import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import { getAllCategories } from "../Services/category-service";

function CategorySideMenu(props) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getAllCategories()
      .then((resp) => {
        setCategories(resp);
      })
      .catch((err) => {
        toast.error("Error in loading categories");
      });
  }, []);

  return (
    <Row style={{ height: "100%", padding: "0 3% 0 3%" }}>
      <Col
        style={{ margin: "0 auto 0 auto" }}
        sm={{ size: 8 }}
        md={{ size: 8 }}
      >
        <ListGroup className="mt-3 ml-2 mr-2">
          {props.id ? (
            <ListGroupItem action tag={Link} to="/feed">
              All Blogs
            </ListGroupItem>
          ) : (
            <ListGroupItem active action tag={Link} to="/feed">
              All Blogs
            </ListGroupItem>
          )}
          {categories &&
            categories.map((category) =>
              props.id == category.id ? (
                <ListGroupItem
                  active
                  tag={Link}
                  to={"/categories/" + category.id}
                  action
                >
                  {category.name}
                </ListGroupItem>
              ) : (
                <ListGroupItem
                  tag={Link}
                  to={"/categories/" + category.id}
                  action
                >
                  {category.name}
                </ListGroupItem>
              )
            )}
        </ListGroup>
      </Col>
    </Row>
  );
}

export default CategorySideMenu;
