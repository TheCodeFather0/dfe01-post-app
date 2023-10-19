import React, { useEffect, useState } from "react";
import Post from "../Post";
import "./style.css";
import axios from "axios";
import { v4 } from "uuid";

const _url = "http://localhost:3000/posts/";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get(_url).then(({ data }) => {
      setPosts(data);
    });
  }, []);

  const getAllData = () => {
    axios.get(_url).then(({ data }) => {
      setPosts(data);
    });
  };
  const addUser = (e) => {
    e.preventDefault();
    let newPost = {
      id: v4(),
      username: username,
      url: imageUrl,
      description: description,
    };
    axios.post(_url, newPost).then((response) => {
      if (response.statusText === "Created") {
        alert("user elave edildi...");
        getAllData();
      }
    });

    setUsername("");
    setImageUrl("");
    setDescription("");
  };

  const deletePostFunc = (id) => {
    const isAgree = confirm("qardas silmek isteyirsenmi?");
    if (isAgree) {
      axios.delete(_url + id).then(({ statusText }) => {
        if (statusText === "OK") {
          alert("ugurla silindi...");
          getAllData();
        }
      });
    } else {
      alert("hecne silinmedi");
    }
  };

  const editPostFunc = (_id, _username, _imageSource, _description) => {
    const newUsername = prompt("yeni istifadeci adi daxil edin", _username);
    const newDescription = prompt("yeni aciqlama daxil edin", _description);
    const newUrl = prompt("yeni seklin menbeyini daxil edin", _imageSource);

    let updatePost = {
      username: newUsername,
      url: newUrl,
      description: newDescription,
    };
    axios.put(_url + _id, updatePost).then(({ statusText }) => {
      if (statusText === "OK") {
        alert("post update edildi");
        getAllData();
      }
    });
  };
  return (
    <>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="text"
          placeholder="image url"
          value={imageUrl}
          onChange={({ target }) => setImageUrl(target.value)}
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        ></textarea>
        <input type="submit" value="Add post" />
      </form>
      <h1>My Posts</h1>
      <div className="posts">
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              deletePost={deletePostFunc}
              editPost={editPostFunc}
            />
          );
        })}
      </div>
    </>
  );
};

export default Posts;
