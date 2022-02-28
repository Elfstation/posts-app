const baseURL = "http://localhost:9999";

export const fetchPosts = async (token) => {
  return await fetch(`${baseURL}/posts/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const fetchPrivatePosts = async (token) => {
  return await fetch(`${baseURL}/posts/private`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const createPost = async (token, payload) => {
  return await fetch(`${baseURL}/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const updatePost = async (token, id, payload) => {
  return await fetch(`${baseURL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const deletePost = async (token, id) => {
  return await fetch(`${baseURL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};
