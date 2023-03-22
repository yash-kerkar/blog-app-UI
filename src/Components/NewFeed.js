import {
  deletePostByUser,
  getAllposts,
  getPostsByUser,
  searchPostsByKeyword,
} from "../Services/post-service";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { Container, Input } from "reactstrap";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getPostsByCategory } from "../Services/post-service";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const NewFeed = (props) => {
  const [posts, setPosts] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    pageNumber: "",
    lastPage: "",
  });

  const [sort, setSort] = useState({
    sortBy: "Date",
    sortDir: "desc",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    changePage();
  }, [props.category, props.search]);

  const changePage = (pageNumber = 0, pageSize = 6, filter) => {
    if (props.category) {
      getPostsByCategory(
        props.category,
        pageNumber,
        pageSize,
        sort.sortBy,
        sort.sortDir
      )
        .then((resp) => {
          setPosts(resp);
          window.scroll(0, 0);
        })
        .catch((err) => {
          toast.error("Error loading posts");
        });
    } else if (props.search) {
      searchPostsByKeyword(
        props.search,
        pageNumber,
        pageSize,
        sort.sortBy,
        sort.sortDir
      )
        .then((resp) => {
          setPosts(resp);
          window.scroll(0, 0);
        })
        .catch((err) => {
          toast.error("Error loading posts");
        });
    } else if (props.user) {
      getPostsByUser(
        props.user,
        pageNumber,
        pageSize,
        sort.sortBy,
        sort.sortDir
      )
        .then((resp) => {
          setPosts(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAllposts(pageNumber, pageSize, sort.sortBy, sort.sortDir)
        .then((resp) => {
          setPosts(resp);
          window.scroll(0, 0);
        })
        .catch((err) => {
          toast.error("Error loading posts");
        });
    }

    if (filter) toast.success("Filter applied");
  };

  const changeSort = (value) => {
    setSort({
      sortBy: value,
      sortDir: value == "title" ? "asc" : "desc",
    });
  };

  const [keyword, setKeyword] = useState(null);
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const navigate = useNavigate();
  const searchPosts = () => {
    navigate(`/search/${keyword}`);
  };

  const deletePost = (id) => {
    deletePostByUser(id)
      .then((resp) => {
        toast.success("Post Deleted");
      })
      .catch((err) => {
        toast.error("Error deleting post");
      });
    changePage();
  };

  return (
    <Row className="mt-4">
      <Col style={{ padding: "0 7% 0 7%" }}>
        {!props.user && <h1 className="text-center">Latest Blogs</h1>}
        <Row>
          <Col sm={{ size: 2 }}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>Sort By</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Select property</DropdownItem>
                <DropdownItem
                  active={sort.sortBy == "Date"}
                  onClick={() => changeSort("Date")}
                >
                  Date
                </DropdownItem>
                <DropdownItem
                  active={sort.sortBy == "title"}
                  onClick={() => changeSort("title")}
                >
                  Title
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col>
            <Button color="primary" onClick={() => changePage(0, 5, true)}>
              Apply filter
            </Button>
          </Col>
          {!props.user && (
            <Col md={{ size: 6 }} className="m-1">
              <Row>
                <Col>
                  <Input
                    type="text"
                    placeholder="Enter Keyword"
                    onChange={changeKeyword}
                  ></Input>
                </Col>
                <Col>
                  <Button onClick={searchPosts}>Search Posts</Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
        <Row>
          {posts.content.map((post) => (
            <Col md={{ size: 6 }}>
              <Post
                post={post}
                key={post.id}
                delete_edit={props.delete_edit ? true : false}
                deletePost={deletePost}
              />
            </Col>
          ))}
        </Row>
        <Container className="mt-2">
          <Pagination aria-label="Page navigation example" size="sm">
            <PaginationItem onClick={() => changePage(0)}>
              <PaginationLink first />
            </PaginationItem>
            <PaginationItem
              onClick={() => changePage(posts.pageNumber - 1)}
              disabled={posts.pageNumber == 0}
            >
              <PaginationLink previous />
            </PaginationItem>
            {[...Array(posts.totalPages)].map((item, index) => (
              <PaginationItem
                onClick={() => changePage(index)}
                active={index == posts.pageNumber}
              >
                <PaginationLink>{index + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem
              disabled={posts.lastPage}
              onClick={() => changePage(posts.pageNumber + 1)}
            >
              <PaginationLink next />
            </PaginationItem>
            <PaginationItem onClick={() => changePage(posts.totalPages - 1)}>
              <PaginationLink last />
            </PaginationItem>
          </Pagination>
        </Container>
      </Col>
    </Row>
  );
};
