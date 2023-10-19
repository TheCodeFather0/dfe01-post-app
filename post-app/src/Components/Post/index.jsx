import React from "react";
import "./style.css";

const Post = ({
  post: { id, username, url, description },
  deletePost,
  editPost,
}) => {
  return (
    <div className="post">
      <h2>{username}</h2>
      <img src={url} alt="burda yaxsi sekil ola bilerdi..." />
      <p>{description}</p>
      <div>
        <button
          className="editPostButton"
          onClick={() => editPost(id, username, url, description)}
        >
          Edit post🖋️
        </button>
        <button onClick={() => deletePost(id)} className="deletePostButton">
          Delete post❌
        </button>
      </div>
    </div>
  );
};

export default Post;
