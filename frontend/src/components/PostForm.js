import { useState } from "react";

import { getUserDetails, logout } from "../api/users";
import { createPost } from "../api/posts";

const PostForm = ({ callback }) => {
  const [text, setText] = useState("");
  const [isPrivatePost, setIsPrivatePost] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === "") {
      alert("Please put a message");
      return;
    }

    const payload = { message: text, isPrivate: isPrivatePost };

    try {
      const response = await createPost(localStorage.getItem("token"), payload);

      if (response.status === 200) {
        callback();

        //cleanup form
        setText("");
      } else alert("there was an error");
    } catch (error) {
      alert("there was an error");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <label>{`Hello ${getUserDetails()?.username}`}</label>
          <button
            style={{ width: "5rem", marginLeft: "1rem" }}
            onClick={logout}
          >
            log out
          </button>
        </div>
        <textarea
          style={{ width: "30vw", marginTop: "1rem" }}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          placeholder="Write your posts here"
          rows={5}
          cols={40}
        />
        <div style={{ marginTop: "1rem" }}>
          <button
            style={{ width: "10rem" }}
            type="submit"
            onClick={handleSubmit}
          >
            Post
          </button>
          <input
            style={{ marginLeft: "2rem" }}
            type="checkbox"
            id="privatePost"
            checked={isPrivatePost}
            onChange={(e) => setIsPrivatePost(!isPrivatePost)}
          />
          <label htmlFor="privatePost">Private post</label>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
