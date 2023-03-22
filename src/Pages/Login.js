import Base from "../Components/Base";
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
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { login as login1 } from "../Services/user-service";
import { doLogin } from "../Services/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import { useDispatch } from "react-redux";
import { login2 } from "../features/userSlice";
import { isAdmin } from "../Services/auth";
import "../Css/Landing.css";
import { BASE_URL, BlogsPageBackground } from "../Services/helper";

const Login = () => {
  const userContent = useContext(UserContext);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e, property) => {
    setLogin({ ...login, [property]: e.target.value });
  };

  const handleReset = () => {
    setLogin({
      username: "",
      password: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (login.username == "") {
      toast.error("Username is required");
      return;
    }
    if (login.password == "") {
      toast.error("Password is required");
      return;
    }

    login1(login)
      .then((resp) => {
        doLogin(resp, () => {
          toast.success("Logged in sucesfully!");
          navigate("/");
        });
        let isAdmin1 = isAdmin();
        dispatch(
          login2({
            data: resp.user,
            login: true,
            isAdmin: isAdmin1,
          })
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card style={{ margin: "2%" }} color="dark" outline>
              <CardHeader>
                <h2>Login</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      id="email"
                      onChange={(e) => handleChange(e, "username")}
                      value={login.username}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={login.password}
                    ></Input>
                  </FormGroup>
                  <FormFeedback></FormFeedback>
                  <Container className="text-center">
                    <Button
                      color="primary"
                      style={{ border: "2px solid black" }}
                    >
                      Login
                    </Button>
                    <Button
                      style={{ border: "2px solid black" }}
                      type="reset"
                      color="secondary"
                      className="ms-2"
                      onClick={handleReset}
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

export default Login;
