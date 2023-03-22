import { Row, Col } from "reactstrap";
import Base from "../Components/Base";
import CategorySideMenu from "../Components/CategorySideMenu";
import { NewFeed } from "../Components/NewFeed";
import { useParams } from "react-router-dom";
import "../Css/Landing.css";
import { BASE_URL, BlogsPageBackground } from "../Services/helper";

const Home = () => {
  const { id, keyword } = useParams();
  console.log(keyword);
  return (
    <Base>
      <Row
        className="background1"
        style={{
          backgroundImage: `url("${BASE_URL}post/image/${BlogsPageBackground}")`,
        }}
      >
        <Col md={{ size: 3 }} className="border">
          <CategorySideMenu id={id}></CategorySideMenu>
        </Col>
        <Col md={{ size: 9 }}>
          <NewFeed category={id} search={keyword} />
        </Col>
      </Row>
    </Base>
  );
};

export default Home;
