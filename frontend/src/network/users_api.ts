import { User } from "../models/user";

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
  const response = await fetchData(
    "https://tscookbook-api.onrender.com/api/users",
    {
      method: "GET",
      // credentials: "include",
    }
  );

  console.log(response);

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
  const response = await fetchData(
    "https://tscookbook-api.onrender.com/api/users/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  return response.json();
};

interface LoginCredentials {
  username: string;
  password: string;
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await fetchData(
    "https://tscookbook-api.onrender.com/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  return response.json();
};

export const logout = async () => {
  await fetchData("https://tscookbook-api.onrender.com/api/users/logout", {
    method: "POST",
  });
};
