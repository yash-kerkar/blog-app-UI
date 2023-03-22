import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  Container,
  Input,
  Form,
  CardTitle,
  CardFooter,
  Row,
  Col,
} from "reactstrap";
import Base from "../Components/Base";
import { getPost, postComment } from "../Services/post-service";
import { toast } from "react-toastify";
import { BASE_URL, profilePhoto } from "../Services/helper";
import { Comments } from "../Components/Comments";
import { getComments } from "../Services/post-service";
import { isLoggedIn } from "../Services/auth";
import "../Css/Landing.css";

export const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);

  useEffect(() => {
    getComments1();
  }, []);

  useEffect(() => {
    getPost(id)
      .then((resp) => {
        console.log(resp);
        setPost(resp);
      })
      .catch((err) => {
        toast.error("Error in loading post");
      });
  }, []);

  const getComments1 = () => {
    getComments(id)
      .then((resp) => {
        setComments(resp);
      })
      .catch((err) => {
        console.log("Error fetching comments");
      });
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    if (!isLoggedIn()) {
      toast.error("Please login first");
      return;
    }

    if (comment.trim() == "") {
      toast.error("Comment cannot be empty");
      return;
    }
    postComment(post, comment)
      .then((resp) => {
        toast.success("Comment posted!");
        getComments1();
      })
      .catch((err) => {
        toast.error("Error posting comment");
      });
  };

  return (
    <Base>
      <div
        className="margin-fix blog"
        style={{ paddingTop: "1%", margin: "auto" }}
      >
        <Card className="border-0">
          {post && (
            <CardBody>
              <CardText>
                <b>
                  {new Date(post.date).toLocaleString("default", {
                    month: "long",
                  }) +
                    " " +
                    new Date(post.date).getDate() +
                    " " +
                    new Date(post.date).getFullYear()}
                  <span className="text-muted"> / #{post.category.name}</span>
                </b>
              </CardText>
              <CardTitle style={{ fontSize: "55px" }} tag={"h1"}>
                {post.title}
              </CardTitle>
              <CardText>
                <img
                  style={{ width: "5%" }}
                  src={`${BASE_URL}post/image/${profilePhoto}`}
                ></img>
                <Button
                  tag={Link}
                  to={"/viewProfile/" + post.user.id}
                  style={{ background: "none", border: "none", color: "black" }}
                >
                  <b>{post.user.name}</b>
                </Button>
              </CardText>
              <div className="image-container">
                <img
                  className="img-fluid mt-3"
                  style={{ width: "100%", height: "auto" }}
                  src={
                    BASE_URL +
                    "post/image/" +
                    (post.imageName ? post.imageName : "Default.webp")
                  }
                ></img>
              </div>
              <CardText
                className="mt-5"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></CardText>
              <CardFooter
                style={{
                  marginTop: "5%",
                  padding: "2%",
                  borderBottom: "1px solid black",
                  borderTop: "1px solid black",
                }}
              >
                <Row>
                  <Col sm={{ size: 2 }}>
                    <img
                      style={{ width: "70%" }}
                      src={`${BASE_URL}post/image/${profilePhoto}`}
                    ></img>
                  </Col>
                  <Col sm={{ size: 10 }}>
                    <Row>
                      <Button
                        tag={Link}
                        to={"/viewProfile/" + post.user.id}
                        style={{
                          background: "none",
                          border: "none",
                          color: "black",
                          width: "30%",
                          textAlign: "left",
                        }}
                      >
                        <h4>{post.user.name}</h4>
                      </Button>
                    </Row>
                    <Row>
                      <p>{post.user.about}</p>
                    </Row>
                  </Col>
                </Row>
              </CardFooter>
              <CardText>
                <div className="mt-5 text-center">
                  <h2>
                    <b>Comments ({comments && comments.length})</b>
                  </h2>
                  {comments ? (
                    comments.map((comment) => (
                      <p className="mt-3">
                        <b>{comment.user.name} </b>
                        {comment.content}
                      </p>
                    ))
                  ) : (
                    <p>No Comments</p>
                  )}
                </div>
              </CardText>
              <CardText>
                <Input
                  type="textarea"
                  placeholder="Enter Comment"
                  onChange={(e) => onChangeComment(e)}
                  id="comment"
                ></Input>
                <Button className="mt-2" onClick={addComment}>
                  Post Comment
                </Button>
              </CardText>
            </CardBody>
          )}
        </Card>
      </div>
    </Base>
  );
};
