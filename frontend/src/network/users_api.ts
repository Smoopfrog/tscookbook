import { User } from "../models/user";

const localApi = "http://localhost:5000";
const server = "https://tscookbook-api.onrender.com";

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
  const response = await fetchData(`${localApi}/api/users`, {
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
  const response = await fetchData(`${localApi}/api/users/signup`, {
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
  const response = await fetchData(`${localApi}/api/users/login`, {
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
  await fetchData(`${localApi}/api/users/logout`, {
    method: "POST",
  });
};
