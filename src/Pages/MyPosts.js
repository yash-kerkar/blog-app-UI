import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Base from "../Components/Base";

import { NewFeed } from "../Components/NewFeed";

function MyPosts(props) {
  const { id } = useParams();

  return (
    <Base>
      <Row>
        <Col md={{ size: 7, offset: 3 }}>
          <NewFeed user={id} delete_edit={true} />
        </Col>
      </Row>
    </Base>
  );
}

export default MyPosts;
