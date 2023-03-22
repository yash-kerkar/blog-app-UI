import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Container,
  CardImg,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Services/helper";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../Css/Landing.css";

export const Post = (props) => {
  return (
    <Container>
      <TransitionGroup>
        <CSSTransition
          in={true}
          appear={true}
          timeout={1000}
          classNames="slide"
        >
          <Card
            style={{ backgroundColor: "white", border: "1px solid black" }}
            className="mt-3 rounded-0"
          >
            <CardImg
              alt="Card image cap"
              className="rounded-0"
              src={
                BASE_URL +
                "post/image/" +
                (props.post.imageName ? props.post.imageName : "Default.webp")
              }
              style={{
                height: 180,
              }}
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag={"h1"}>{props.post.title}</CardTitle>
              <CardText>
                <p>
                  {new Date(props.post.date).toLocaleString("default", {
                    month: "long",
                  }) +
                    " " +
                    new Date(props.post.date).getDate() +
                    " " +
                    new Date(props.post.date).getFullYear()}
                </p>
              </CardText>
              <CardText
                style={{ borderTop: "1px solid black" }}
                dangerouslySetInnerHTML={{
                  __html: props.post.content.substring(0, 20),
                }}
              ></CardText>
              <div>
                <Link
                  to={"/posts/" + props.post.id}
                  color="secondary"
                  className="btn btn-secondary"
                >
                  Read More
                </Link>
                {props.delete_edit && (
                  <>
                    <Button
                      className="ml-1"
                      color="secondary"
                      onClick={() => props.deletePost(props.post.id)}
                    >
                      Delete Post
                    </Button>
                    <Button
                      className="ml-2"
                      color="secondary"
                      tag={Link}
                      to={props.post.id + "/edit"}
                    >
                      Edit Post
                    </Button>
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </CSSTransition>
      </TransitionGroup>
    </Container>
  );
};
