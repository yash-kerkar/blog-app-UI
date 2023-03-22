import { useContext } from "react";
import { Card, CardText, CardTitle, Row, Col, CardFooter } from "reactstrap";
import Base from "../Components/Base";
import { UserContext } from "../Context/UserProvider";
import "../Css/Landing.css";
import { BASE_URL, BlogsPageBackground } from "../Services/helper";

const About = () => {
  const user = useContext(UserContext);
  return (
    <Base>
      <Row
        className="margin-fix background"
        style={{
          backgroundImage: `url("${BASE_URL}post/image/${BlogsPageBackground}")`,
        }}
      >
        <Col
          md={{ size: 10 }}
          className="text-center"
          style={{
            margin: "auto",
            paddingTop: "3%",
            paddingBottom: "3%",
          }}
        >
          <Card className="border-0">
            <CardTitle>
              <h1>About Blogster</h1>
            </CardTitle>
            <CardText>
              <p style={{ fontSize: "18px" }}>
                <i>
                  Blog website for thoughts & ideas around the things that
                  actually matter.
                </i>
              </p>
            </CardText>
            <CardFooter>
              <p>
                <b>Designed and developed by Yash Kerkar</b>
              </p>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Base>
  );
};

export default About;
