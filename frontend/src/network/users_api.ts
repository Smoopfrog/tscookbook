import { User } from "../models/user";
const env = process.env.NODE_ENV || "development";
const localApi = "http://localhost:5000";
const server = "https://tscookbook-api.onrender.com";
let address: string;

if (env === "development") {
  address = localApi;
} else {
  address = server;
}

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    
    throw Error(errorMessage);
  }
};

export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData(`${address}/api/users`, {
    method: "GET",
    credentials: "include",
  });

  return response.json();
};

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (
  credentials: SignUpCredentials
): Promise<User> => {
  const response = await fetchData(`${address}/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  return response.json();
};

interface LoginCredentials {
  username: string;
  password: string;
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await fetchData(`${address}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });
  
  return response.json();
};

export const logout = async () => {
  await fetchData(`${address}/api/users/logout`, {
    method: "POST",
    credentials: "include",
  });
};

interface TagInterface {
  tag: string;
}

export const addTag = async (tag: TagInterface) => {
  const response = await fetchData(`${address}/api/users/tags`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });

  return response.json();
};

export const deleteTag = async (tag: string) => {
  const response = await fetchData(`${address}/api/users/tags`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tag }),
  });

  return response.json();
};
