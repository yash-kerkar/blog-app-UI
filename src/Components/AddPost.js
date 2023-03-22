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
import Base from "./Base";
import { useEffect, useRef, useState } from "react";
import { getAllCategories } from "../Services/category-service";
import JoditEditor from "jodit-react";
import { createPost, uploadImage } from "../Services/post-service";
import { toast } from "react-toastify";
import { getCurrentUser } from "../Services/auth";
import "../Css/Landing.css";
import { BASE_URL, BlogsPageBackground } from "../Services/helper";

const AddPost = () => {
  const editor = useRef(null);
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [user, setUser] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((resp) => {
        setCategories(resp);
        setPost({ ...post, categoryId: resp[0].id });
      })
      .catch((err) => {
        console.log(err);
      });
    setUser(getCurrentUser());
  }, []);

  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const acceptedFileType = /image*/;

  const handleChange = (e, property) => {
    setPost({ ...post, [property]: e.target.value });
  };

  const handleContentChange = (data) => {
    setPost({ ...post, content: data });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (post.title.trim() == "") {
      toast.error("Title cannot be empty");
      return;
    }

    if (post.content.trim() == "") {
      toast.error("Content cannot be empty");
      return;
    }

    if (!image) {
      toast.error("Please select a Banner Image");
      return;
    }

    if (!acceptedFileType.test(image.type)) {
      toast.error("Please select only Image file type in Banner");
      return;
    }

    post.userId = user.id;
    createPost(post)
      .then((resp) => {
        uploadImage(resp.id, image)
          .then((resp) => {
            toast.success("Image uploaded!");
          })
          .catch((err) => {
            toast.error("Error uploading Image");
          });
        toast.success("Post Created!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error creating post");
      });
  };

  const handleReset = () => {
    setPost({
      title: "",
      content: "",
      categoryId: categories[0].id,
    });
  };

  const onFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <Base>
      <div
        className="background"
        style={{
          backgroundImage: `url("${BASE_URL}post/image/${BlogsPageBackground}")`,
        }}
      >
        <Row className="margin-fix">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card style={{ margin: "2%" }} color="dark" outline>
              <CardHeader>
                <h2>Whats on your Mind ?</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="name">Enter Title</Label>
                    <Input
                      type="text"
                      id="title"
                      onChange={(e) => handleChange(e, "title")}
                      name="title"
                      value={post.title}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">Enter Content</Label>
                    <JoditEditor
                      ref={editor}
                      value={post.content}
                      onChange={handleContentChange}
                    ></JoditEditor>
                  </FormGroup>
                  <FormGroup>
                    <Label for="categoryId" sm={2}>
                      Select Category
                    </Label>
                    <Input
                      id="categoryId"
                      type="select"
                      onChange={(e) => handleChange(e, "categoryId")}
                    >
                      {categories.map((cat) => (
                        <option value={cat.id} key={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup className="mt-3">
                    <Label for="image">Upload Banner Image</Label>
                    <Input
                      type="file"
                      id="image"
                      onChange={onFileChange}
                    ></Input>
                  </FormGroup>
                  <Container className="text-center">
                    <Button
                      color="primary"
                      style={{ border: "2px solid black" }}
                    >
                      Create Post
                    </Button>
                    <Button
                      style={{ border: "2px solid black" }}
                      type="reset"
                      color="secondary"
                      className="ms-2"
                      onClick={() => handleReset()}
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

export default AddPost;
