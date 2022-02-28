import { useState, useEffect } from "react";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

import { fetchPosts, fetchPrivatePosts } from "../api/posts";

const PostsHomePage = () => {
  const [posts, setPosts] = useState([]);
  const [toGetPrivatePost, setToGetPrivatePost] = useState(false);

  const getPosts = async () => {
    try {
      const response = await fetchPosts(localStorage.getItem("token"));
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrivatePosts = async () => {
    try {
      const response = await fetchPrivatePosts(localStorage.getItem("token"));
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTogglePosts = (e) => {
    if (!toGetPrivatePost) {
      getPrivatePosts();
    } else {
      getPosts();
    }

    setToGetPrivatePost(!toGetPrivatePost);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "15vw" }} />

      {/* main content */}
      <div style={{ flexGrow: 1, padding: "5rem 0rem" }}>
        <PostForm callback={getPosts} />
        <div>
          <label>Posts</label>
          {/* <select
            style={{ marginLeft: "1rem" }}
            value={toGetPrivatePost}
            onChange={onSelectChange}
          >
            <option value={true}>Private Posts</option>
            <option value={false}>Public Posts</option>
          </select> */}
          <button style={{ marginLeft: "1rem" }} onClick={handleTogglePosts}>
            {toGetPrivatePost ? "Private Posts" : "Public Posts"}
          </button>
        </div>
        {posts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            message={post.message}
            author={post.author}
            isPrivate={post.isPrivate}
            callback={getPosts}
          />
        ))}
      </div>

      <div style={{ width: "15vw" }} />
    </div>
  );
};

export default PostsHomePage;
