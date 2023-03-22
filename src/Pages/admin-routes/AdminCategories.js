import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import Base from "../../Components/Base";
import {
  deleteCategory,
  getAllCategories,
} from "../../Services/category-service";

function AdminCategories() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getAllCategories()
      .then((resp) => {
        setCategories(resp);
      })
      .catch((err) => {
        toast.error("Error loading categories");
      });
  }, []);

  const handleDelete = (id) => {
    deleteCategory(id)
      .then((resp) => {
        toast.success("Category deleted");
      })
      .catch((err) => {
        toast.error("Error deleting category");
      });

    getAllCategories()
      .then((resp) => {
        setCategories(resp);
      })
      .catch((err) => {
        toast.error("Error loading categories");
      });
  };

  return (
    <Base>
      <Container className="text-center">
        <h2>Categories</h2>
        <Container className="text-center mt-3">
          <Button className="btn-primary" tag={Link} to="add">
            Add Category
          </Button>
        </Container>
        <div className="mt-3 m">
          <Row>
            {categories &&
              categories.map((category) => (
                <Col md={{ size: 4, offset: 4 }}>
                  <Card className="mt-2">
                    <CardTitle>
                      <h4>{category.name}</h4>
                    </CardTitle>
                    <CardBody>
                      <CardText>
                        <p>
                          <b>Description:</b> {category.description}
                        </p>
                      </CardText>
                      <CardText>
                        <Button
                          color="success"
                          tag={Link}
                          to={`${category.id}/edit`}
                        >
                          Edit Category
                        </Button>
                        <Button
                          color="danger"
                          className="m-2"
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete Category
                        </Button>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    </Base>
  );
}

export default AdminCategories;
