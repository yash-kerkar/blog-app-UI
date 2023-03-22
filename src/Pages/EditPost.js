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
import { useEffect, useRef, useState } from "react";
import { getAllCategories } from "../Services/category-service";
import JoditEditor from "jodit-react";
import {
  createPost,
  editPostByUser,
  getPost,
  replaceImage,
  uploadImage,
} from "../Services/post-service";
import { toast } from "react-toastify";
import { getCurrentUser } from "../Services/auth";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import { BASE_URL } from "../Services/helper";

const EditPost = () => {
  const { postId } = useParams();
  const userContent = useContext(UserContext);
  const editor = useRef(null);
  const [post, setPost] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getPost(postId)
      .then((resp) => {
        console.log(resp);
        setPost(resp);
      })
      .catch((err) => {
        toast.error("error loading post");
      });
    getAllCategories()
      .then((resp) => {
        setCategories(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [image, setImage] = useState(null);

  const acceptedFileType = /image*/;

  const handleChange = (e, property) => {
    setPost({ ...post, [property]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setPost({ ...post, category: { id: e.target.value } });
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

    if (image) {
      if (!acceptedFileType.test(image.type)) {
        toast.error("Please select only Image file type in Banner");
        return;
      }
    }

    editPostByUser(postId, post)
      .then((resp) => {
        if (image) {
          replaceImage(postId, image)
            .then((resp) => {
              toast.success("Banner Image updated !");
            })
            .catch((err) => {
              toast.error("Error uploading image");
            });
        }
        toast.success("Post updated!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 10, offset: 1 }}>
            {post && (
              <Card color="dark" outline>
                <CardHeader>
                  <h2>Update Post</h2>
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
                        onChange={(e) => handleCategoryChange(e)}
                      >
                        {categories.map((cat) =>
                          post.category.id == cat.id ? (
                            <option selected value={cat.id} key={cat.id}>
                              {cat.name}
                            </option>
                          ) : (
                            <option value={cat.id} key={cat.id}>
                              {cat.name}
                            </option>
                          )
                        )}
                      </Input>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label for="image">
                        Update Banner Image (*If Required*)
                      </Label>
                      <Input
                        type="file"
                        id="image"
                        onChange={onFileChange}
                      ></Input>
                    </FormGroup>
                    <Container className="mb-3">
                      <p>
                        <b>Existing Banner Image:</b>
                      </p>
                      <img
                        className="img-thumbnail"
                        src={
                          BASE_URL +
                          "post/image/" +
                          (post.imageName ? post.imageName : "Default.webp")
                        }
                      ></img>
                    </Container>
                    <Container className="text-center">
                      <Button
                        color="primary"
                        style={{ border: "2px solid black" }}
                      >
                        Update Post
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default EditPost;
