import React, { useState } from "react";
import {
  FormGroup,
  Input,
  Label,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";
import Base from "../../Components/Base";
import { toast } from "react-toastify";
import { addCategory } from "../../Services/category-service";

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e, field) => {
    setCategory({ ...category, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.name.trim() == "") {
      toast.error("Category title cannot be blank");
      return;
    }
    if (category.description.trim() == "") {
      toast.error("Category description cannot be blank");
      return;
    }

    addCategory(category)
      .then((resp) => {
        toast.success("Category created");
      })
      .catch((err) => {
        toast.error("Error creating category");
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card color="dark" outline>
              <CardHeader>
                <h2>Create Category</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="name">Enter Title</Label>
                    <Input
                      type="text"
                      id="title"
                      onChange={(e) => handleChange(e, "name")}
                      name="title"
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Enter Description</Label>
                    <Input
                      type="textarea"
                      id="description"
                      onChange={(e) => handleChange(e, "description")}
                      name="description"
                    ></Input>
                  </FormGroup>
                  <Container className="text-center">
                    <Button
                      color="primary"
                      style={{ border: "2px solid black" }}
                    >
                      Submit
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default AddCategory;
