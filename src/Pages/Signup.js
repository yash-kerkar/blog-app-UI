import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  Label,
  Input,
  Form,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import Base from "../Components/Base";
import React, { useState } from "react";
import { signup } from "../Services/user-service";
import { toast } from "react-toastify";
import "../Css/Landing.css";
import { BASE_URL, BlogsPageBackground } from "../Services/helper";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    error: {},
    isError: false,
  });

  const handleChange = (e, property) => {
    setData({ ...data, [property]: e.target.value });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    /*if (error.isError) {
      toast.error("Invalid details, Please correct and submit !");
      setError({ ...error, isError: false });
      return;
    }*/
    signup(data)
      .then((response) => {
        console.log(response);
        toast.success("User is registered sucessfully!!");
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
        setError({
          error: {},
          isError: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setError({
          error: error,
          isError: true,
        });
        toast.error("Invalid details, Please correct and submit !");
      });
  };

  return (
    <Base>
      <div
        className="margin-fix background"
        style={{
          backgroundImage: `url("${BASE_URL}post/image/${BlogsPageBackground}")`,
        }}
      >
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card
              style={{ marginTop: "3%", marginBottom: "3%" }}
              color="dark"
              outline
            >
              <CardHeader>
                <h2>Register</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={error.error?.response?.data?.name ? true : false}
                    ></Input>
                    <FormFeedback>
                      {error.error?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.error?.response?.data?.email ||
                        error.error?.response?.data?.message
                          ? true
                          : false
                      }
                    ></Input>
                    <FormFeedback>
                      {error.error?.response?.data?.email}
                      {error.error?.response?.data?.message}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.error?.response?.data?.password ? true : false
                      }
                    ></Input>
                    <FormFeedback>
                      {error.error?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">Enter About</Label>
                    <Input
                      type="textarea"
                      id="about"
                      style={{ height: "200px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.error?.response?.data?.about ? true : false
                      }
                    ></Input>
                    <FormFeedback>
                      {error.error?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button
                      color="primary"
                      style={{ border: "2px solid black" }}
                    >
                      Register
                    </Button>
                    <Button
                      style={{ border: "2px solid black" }}
                      type="reset"
                      color="secondary"
                      className="ms-2"
                      onClick={() => resetData()}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Base>
  );
};

export default Signup;
