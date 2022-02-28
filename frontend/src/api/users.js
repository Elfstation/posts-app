import { Buffer } from "buffer";

const baseURL = "http://localhost:9999";

export const login = async (payload) => {
  return await fetch(`${baseURL}/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const signup = async (payload) => {
  return await fetch(`${baseURL}/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const getUserDetails = () => {
  const token = localStorage.getItem("token").split(".")[1];
  return JSON.parse(Buffer.from(token, "base64").toString("utf8"));
};

export const logout = () => localStorage.removeItem("token");
