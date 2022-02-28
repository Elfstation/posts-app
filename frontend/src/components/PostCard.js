import { useState } from "react";

import { updatePost, deletePost } from "../api/posts";
import { getUserDetails } from "../api/users";

const PostCard = ({ id, message, isPrivate, author, callback }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState("");
  const [editedPrivate, setEditedPrivate] = useState(isPrivate);

  const ifPostisOwned = () => {
    if (getUserDetails().id !== author) return false;

    return true;
  };

  const handleSave = async () => {
    const payload = {
      message: editedPost === "" ? message : editedPost,
      isPrivate: editedPrivate,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await updatePost(token, id, payload);
      if (response.status === 200) {
        setIsEditing(false);
        callback();
      } else alert("there was an error");
    } catch (error) {
      alert("there was an error");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await deletePost(token, id);
      if (response.status === 200) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid",
        padding: "1rem",
        margin: "1rem",
      }}
    >
      {isEditing ? (
        <input
          type={"text"}
          placeholder={message}
          style={{ flexGrow: 1, marginRight: "1rem" }}
          value={editedPost}
          onChange={(e) => setEditedPost(e.currentTarget.value)}
        />
      ) : (
        <div style={{ flexGrow: 1 }}>{message}</div>
      )}
      {isEditing && (
        <>
          <input
            type="checkbox"
            id="privatePostCard"
            checked={editedPrivate}
            onChange={(e) => setEditedPrivate(!editedPrivate)}
          />
          <label style={{ marginRight: "1rem" }} htmlFor="privatePostCard">
            Private post
          </label>
        </>
      )}
      {ifPostisOwned() && (
        <>
          <button
            onClick={(e) => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            style={{ marginRight: "1rem" }}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          {isEditing && (
            <button
              onClick={(e) => {
                setEditedPost("");
                setIsEditing(false);
                setEditedPrivate(isPrivate);
              }}
              style={{ marginRight: "1rem" }}
            >
              Cancel
            </button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default PostCard;
