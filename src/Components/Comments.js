import { useEffect } from "react";
import { useState } from "react";
import { CardText } from "reactstrap";
import { getComments } from "../Services/post-service";

export const Comments = (postId) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    getComments(postId.postId).then((resp) => {
      setComments(resp);
    });
  }, []);

  return (
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
  );
};
