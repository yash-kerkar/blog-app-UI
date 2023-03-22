import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardImgOverlay,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  InputGroup,
  Input,
  InputGroupText,
} from "reactstrap";
import "../Css/Landing.css";
import {
  BASE_URL,
  BlogsPageBackground,
  HomePageHeaderBG,
} from "../Services/helper";
import Base from "../Components/Base";
import {
  CategoriesScroll,
  HomeTitle,
  PopularPost,
  PopularPostTitle,
  Search,
  StyleGrid,
  TrendingCategory,
} from "../Components/HomeStyles";
import { useEffect, useState } from "react";
import { getAllposts, getPostsByCategory } from "../Services/post-service";
import { json, Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getAllCategories, getCategory } from "../Services/category-service";
import { toast } from "react-toastify";
import { useInView } from "react-intersection-observer";

const Landing = () => {
  const [posts, setPosts] = useState(null);
  const [trending, setTrending] = useState(null);
  const [categories, setCategories] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState(null);

  const [counters1, setCounters1] = useState(0);
  const [counters2, setCounters2] = useState(0);
  const [counters3, setCounters3] = useState(0);
  const actual = {
    first: 683,
    second: 100,
    third: 422,
  };
  let count = 0;

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  const duration = 5000;
  useEffect(() => {
    if (inView2) {
      let counter1 = 0;
      let counter2 = 0;
      let counter3 = 0;
      let step1 = Math.abs(Math.floor(duration / actual.first));
      let step2 = Math.abs(Math.floor(duration / actual.second));
      let step3 = Math.abs(Math.floor(duration / actual.third));
      const timer1 = setInterval(() => {
        if (counter1 > actual.first) clearInterval(timer1);
        setCounters1(counter1);
        counter1 += 2;
      }, step1);
      const timer2 = setInterval(() => {
        if (counter2 > actual.second) return clearInterval(timer2);
        setCounters2(counter2);
        counter2 += 2;
      }, step2);
      const timer3 = setInterval(() => {
        if (counter3 > actual.third) return clearInterval(timer3);
        setCounters3(counter3);
        counter3 += 2;
      }, step3);
    }
  }, [inView2]);

  useEffect(() => {
    getAllposts(1, 5, "Date", "desc")
      .then((resp) => {
        setPosts(resp.content);
        let temp = [resp.content[0], resp.content[1]];
        setTrending(temp);
      })
      .catch((err) => {
        toast.error("Error loading trending products");
      });
    getAllCategories()
      .then((resp) => {
        setCategories(resp);
      })
      .catch((err) => {
        toast.error("Error loading categories");
      });
    getPostsByCategory(2, 0, 3, "Date", "desc")
      .then((resp) => {
        setCategory(resp.content);
      })
      .catch((err) => {
        toast.error("Error loading trending category");
      });
  }, []);

  useEffect(() => {
    let counter = 2;
    const interval = setInterval(() => {
      if (counter == 1) {
        let temp = [posts[0], posts[1]];
        setTrending(temp);
        counter = 2;
      } else {
        let temp = [posts[2], posts[3]];
        setTrending(temp);
        counter = 1;
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [posts]);

  return (
    <Base>
      <div
        className="background"
        style={{
          paddingTop: "2%",
          paddingLeft: "5%",
          paddingBottom: "2%",
          backgroundImage: `url("${BASE_URL}post/image/${HomePageHeaderBG}")`,
        }}
      >
        <Row className="m-0 p-0">
          <Col className="text-center" md={{ size: 6 }}>
            <HomeTitle className="homeTitle">
              Thoughts & ideas around the things that actually matter.
            </HomeTitle>
            <Search>
              <InputGroup style={{ width: "70%", margin: "16% auto" }}>
                <Input
                  onChange={(e) => handleChange(e)}
                  placeholder="Search Title or Keyword here"
                />
                <Button tag={Link} to={"/search/" + searchKey}>
                  Explore
                </Button>
              </InputGroup>
            </Search>
          </Col>
          <Col>
            <PopularPostTitle>Trending on Blogster</PopularPostTitle>
            <StyleGrid>
              {trending && (
                <TransitionGroup>
                  <CSSTransition
                    key={trending[0].id}
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="transition"
                  >
                    <div>
                      <PopularPost className="popularPost">
                        <Card
                          className="m-3  border-0"
                          style={{ backgroundColor: "#fcfcfc" }}
                        >
                          <CardImg
                            src={
                              BASE_URL +
                              "post/image/" +
                              (trending[0].imageName
                                ? trending[0].imageName
                                : "default.webp")
                            }
                          ></CardImg>
                          <CardImgOverlay>
                            <Button
                              tag={Link}
                              to={"/posts/" + trending[0].id}
                              style={{
                                textAlign: "right",
                                marginLeft: "99%",
                                marginTop: "25%",
                                backgroundColor: "black",
                                border: "none",
                                borderRadius: "25px",
                                width: "12%",
                                height: "12%",
                              }}
                            >
                              🡽
                            </Button>
                          </CardImgOverlay>
                          <CardBody>
                            <Row>
                              <Col>
                                <CardTitle tag="h3">
                                  {trending[0].title}
                                </CardTitle>
                              </Col>
                              <Col
                                style={{
                                  textAlign: "right",
                                  paddingRight: "15px",
                                }}
                              >
                                <Row>
                                  <CardTitle tag="h4">
                                    {new Date(trending[0].date).getDate()}
                                  </CardTitle>
                                </Row>
                                <Row>
                                  <CardTitle tag="h5">
                                    {new Date(trending[0].date).toLocaleString(
                                      "default",
                                      {
                                        month: "long",
                                      }
                                    ) +
                                      " " +
                                      new Date(trending[0].date).getFullYear()}
                                  </CardTitle>
                                </Row>
                              </Col>
                            </Row>
                          </CardBody>
                          <CardFooter
                            tag="h6"
                            style={{ backgroundColor: "#fcfcfc" }}
                          >
                            {trending[0].user.name +
                              " ·  6 min read  ·  " +
                              trending[0].category.name}
                          </CardFooter>
                        </Card>
                      </PopularPost>
                      <PopularPost className="popularPost">
                        <Card
                          className="m-3 border-0"
                          style={{ backgroundColor: "#fcfcfc" }}
                        >
                          <CardImg
                            src={
                              BASE_URL +
                              "post/image/" +
                              (trending[1].imageName
                                ? trending[1].imageName
                                : "default.webp")
                            }
                          ></CardImg>
                          <CardImgOverlay>
                            <Button
                              tag={Link}
                              to={"/posts/" + trending[1].id}
                              style={{
                                textAlign: "right",
                                marginLeft: "99%",
                                marginTop: "25%",
                                backgroundColor: "black",
                                border: "none",
                                borderRadius: "25px",
                                width: "12%",
                                height: "12%",
                              }}
                            >
                              🡽
                            </Button>
                          </CardImgOverlay>
                          <CardBody>
                            <Row>
                              <Col>
                                <CardTitle tag="h3">
                                  {trending[1].title}
                                </CardTitle>
                              </Col>
                              <Col
                                style={{
                                  textAlign: "right",
                                  paddingRight: "15px",
                                }}
                              >
                                <Row>
                                  <CardTitle tag="h4">
                                    {new Date(trending[1].date).getDate()}
                                  </CardTitle>
                                </Row>
                                <Row>
                                  <CardTitle tag="h5">
                                    {new Date(trending[1].date).toLocaleString(
                                      "default",
                                      {
                                        month: "long",
                                      }
                                    ) +
                                      " " +
                                      new Date(trending[1].date).getFullYear()}
                                  </CardTitle>
                                </Row>
                              </Col>
                            </Row>
                          </CardBody>
                          <CardFooter
                            tag="h6"
                            style={{ backgroundColor: "#fcfcfc" }}
                          >
                            {trending[1].user.name +
                              " ·  6 min read  ·  " +
                              trending[1].category.name}
                          </CardFooter>
                        </Card>
                      </PopularPost>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              )}
            </StyleGrid>
          </Col>
        </Row>
      </div>
      <div
        style={{
          backgroundImage: `url("${BASE_URL}post/image/${BlogsPageBackground}")`,
        }}
        className="background1"
      >
        <CategoriesScroll
          ref={ref}
          style={{
            width: "100%",
            backgroundColor: "#F1F3F6",
            padding: "2%",
          }}
          className={`text-center transition-opacity ${
            inView ? "opacity-1" : "opacity-0"
          }`}
        >
          <h2>Blog Category</h2>
          <Row className="mt-5 mb-4">
            {categories &&
              categories.map((category) => (
                <Col>
                  <Button
                    style={{
                      background: "none",
                      border: "0",
                      color: "black",
                    }}
                    tag={Link}
                    to={"/categories/" + category.id}
                  >
                    <h4>{category.name}</h4>
                  </Button>
                </Col>
              ))}
          </Row>
        </CategoriesScroll>
        <TrendingCategory
          ref={ref1}
          className={`text-center mt-5 transition-opacity1 ${
            inView1 ? "opacity-11" : "opacity-01"
          } `}
        >
          <h2>Trending Category</h2>
          {categories && (
            <Row style={{ marginTop: "4%" }}>
              <Col md={{ size: 4, offset: 1 }}>
                <Row>
                  <h3 style={{ fontSize: "50px" }}>{categories[0].name}</h3>
                </Row>
                <Row style={{ marginTop: "8%", color: "white" }}>
                  <Col style={{ borderRight: "2px solid #E4E9EF" }}>
                    <p>
                      <b>41K</b>
                    </p>
                    <p>Articles</p>
                  </Col>
                  <Col>
                    <p>
                      <b>23K</b>
                    </p>
                    <p>Writers</p>
                  </Col>
                </Row>
                <Row
                  style={{ marginTop: "8%", borderTop: "2px solid #E4E9EF" }}
                >
                  <p>
                    <b>Related Category</b>
                    <br></br>
                    <Button className="m-1">Business</Button>
                    <Button className="m-1">Finance</Button>
                    <Button className="m-1">Sports</Button>
                  </p>
                </Row>
              </Col>
              <Col md={{ size: 6 }}>
                {category &&
                  category.map((cat) => (
                    <Card
                      style={{
                        marginLeft: "7%",
                        border: "0",
                        marginBottom: "2%",
                      }}
                      className="popularPost1"
                    >
                      <Button
                        className="styleButton"
                        tag={Link}
                        to={"/posts/" + cat.id}
                      >
                        <CardTitle
                          style={{ textAlign: "left", marginLeft: "5%" }}
                        >
                          <h4>
                            <span> 0{(count += 1)} </span>
                            <span style={{ marginLeft: "2%" }}>
                              {"   " + cat.title}
                            </span>
                          </h4>
                        </CardTitle>
                      </Button>
                      <CardFooter
                        tag="h6"
                        style={{ backgroundColor: "#FFFFFF" }}
                      >
                        <Row>
                          <Col>
                            {cat.user.name +
                              " ·  6 min read  ·  " +
                              cat.category.name}
                          </Col>
                          <Col>
                            {new Date(cat.date).getDate() +
                              " " +
                              new Date(cat.date).toLocaleString("default", {
                                month: "long",
                              }) +
                              " " +
                              new Date(cat.date).getFullYear()}
                          </Col>
                        </Row>
                      </CardFooter>
                    </Card>
                  ))}
              </Col>
            </Row>
          )}
        </TrendingCategory>
        <div>
          <div
            className="text-center mt-5"
            style={{
              width: "100%",
              backgroundColor: "black",
              color: "white",
              height: "150px",
            }}
          >
            <h2 style={{ paddingTop: "2%" }}>
              Subscribe to get daily-free ebook
            </h2>
          </div>
          <div
            className="text-center subscribe"
            style={{
              backgroundColor: "#F1F3F6",
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingTop: "2%",
              paddingBottom: "2%",
              borderRadius: "70px 70px 70px 70px",
            }}
          >
            <Row>
              <Col md={{ size: 6 }}>
                <Input
                  style={{
                    background: "none",
                    borderBottom: "1px solid black",
                    borderRadius: "0",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    color: "black",
                  }}
                  type="text"
                  placeholder="Type your name"
                ></Input>
              </Col>
              <Col md={{ size: 6 }}>
                <Input
                  style={{
                    background: "none",
                    borderBottom: "1px solid black",
                    borderRadius: "0",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    color: "black",
                  }}
                  type="text"
                  placeholder="Type your email address"
                ></Input>
              </Col>
            </Row>
            <Button
              style={{
                marginTop: "2%",
                backgroundColor: "black",
                borderRadius: "70px 70px 70px 70px",
              }}
            >
              Subscribe now
            </Button>
          </div>
        </div>
        <div
          style={{ marginTop: "7%" }}
          ref={ref3}
          className={` transition-opacity1 ${
            inView3 ? "opacity-11" : "opacity-01"
          } `}
        >
          <Row className="text-center">
            <Col>
              <h2>We tackle interesting topics everyday</h2>
            </Col>
          </Row>
          <TransitionGroup>
            <Row
              className="mt-3 text-center"
              style={{ overflow: "hidden", width: "85%", margin: "auto" }}
            >
              {trending && (
                <CSSTransition
                  key={trending[0].id}
                  in={true}
                  appear={true}
                  timeout={1000}
                  classNames="slide"
                >
                  <div>
                    <Row>
                      <Col
                        className="text-center"
                        sm={{ size: 12 }}
                        lg={{ size: 6 }}
                        style={{
                          borderRight: "1px solid black",
                          marginTop: "5px",
                        }}
                      >
                        <Card
                          style={{ margin: "auto" }}
                          className="border-1 popularPost2"
                        >
                          <CardImg
                            src={
                              BASE_URL +
                              "post/image/" +
                              (trending[0].imageName
                                ? trending[0].imageName
                                : "default.webp")
                            }
                          ></CardImg>
                          <CardImgOverlay>
                            <Button
                              tag={Link}
                              to={"/posts/" + trending[0].id}
                              style={{
                                textAlign: "right",
                                marginLeft: "99%",
                                marginTop: "25%",
                                backgroundColor: "black",
                                border: "none",
                                borderRadius: "25px",
                                width: "12%",
                                height: "12%",
                              }}
                            >
                              🡽
                            </Button>
                          </CardImgOverlay>
                          <CardBody>
                            <CardTitle>
                              <Row>
                                <Col style={{ textAlign: "left" }}>
                                  <h4>{trending[0].title}</h4>
                                </Col>
                                <Col style={{ textAlign: "right" }}>
                                  {new Date(trending[0].date).getDate() +
                                    " " +
                                    new Date(trending[0].date).toLocaleString(
                                      "default",
                                      {
                                        month: "long",
                                      }
                                    ) +
                                    " " +
                                    new Date(trending[0].date).getFullYear()}
                                </Col>
                              </Row>
                            </CardTitle>
                            <CardFooter style={{ background: "none" }}>
                              {trending[0].user.name +
                                " ·  6 min read  ·  " +
                                trending[0].category.name}
                            </CardFooter>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col
                        sm={{ size: 12 }}
                        lg={{ size: 6 }}
                        style={{
                          marginTop: "5px",
                        }}
                        className="text-center"
                      >
                        <Card
                          style={{ margin: "auto" }}
                          className="border-1 popularPost2"
                        >
                          <CardImg
                            src={
                              BASE_URL +
                              "post/image/" +
                              (trending[1].imageName
                                ? trending[1].imageName
                                : "default.webp")
                            }
                          ></CardImg>
                          <CardImgOverlay>
                            <Button
                              tag={Link}
                              to={"/posts/" + trending[1].id}
                              style={{
                                textAlign: "right",
                                marginLeft: "99%",
                                marginTop: "25%",
                                backgroundColor: "black",
                                border: "none",
                                borderRadius: "25px",
                                width: "12%",
                                height: "12%",
                              }}
                            >
                              🡽
                            </Button>
                          </CardImgOverlay>
                          <CardBody>
                            <CardTitle>
                              <Row>
                                <Col style={{ textAlign: "left" }}>
                                  <h4>{trending[0].title}</h4>
                                </Col>
                                <Col style={{ textAlign: "right" }}>
                                  {new Date(trending[1].date).getDate() +
                                    " " +
                                    new Date(trending[1].date).toLocaleString(
                                      "default",
                                      {
                                        month: "long",
                                      }
                                    ) +
                                    " " +
                                    new Date(trending[1].date).getFullYear()}
                                </Col>
                              </Row>
                            </CardTitle>
                            <CardFooter style={{ background: "none" }}>
                              {trending[1].user.name +
                                " ·  6 min read  ·  " +
                                trending[1].category.name}
                            </CardFooter>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </CSSTransition>
              )}
            </Row>
          </TransitionGroup>
        </div>
        <div ref={ref2} style={{ marginTop: "6%", color: "white" }}>
          <Row className="text-center">
            <Col>
              <h1>{counters1}K</h1>
              <p>Articles posted</p>
            </Col>
            <Col>
              <h1>{counters2}K</h1>
              <p>Monthly readers</p>
            </Col>
            <Col>
              <h1>{counters3}K</h1>
              <p>Writers joined</p>
            </Col>
          </Row>
        </div>
      </div>
    </Base>
  );
};

export default Landing;
