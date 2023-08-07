import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { assertIsDefined } from "../util/assertIsDefined";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    const user = await UserModel.findById(authenticatedUserId)
      .select("+email +tags")
      .exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();

    if (existingUsername) {
      createHttpError(
        409,
        "Username already taken. Please choose a different one."
      );
    }

    const existingEmail = await UserModel.findOne({
      email: email,
    }).exec();

    if (existingEmail) {
      createHttpError(
        409,
        "Email already in use. Please choose a different one."
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
      tags: [],
    });

    req.session.userId = newUser._id;

    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
      tags: newUser.tags,
    });
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await UserModel.findOne({ username: username })
      .select("+password +email +tags")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    console.log("User tags", user.tags);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;

    const userData = {
      username: user.username,
      email: user.email,
      tag: user.tags,
    };

    res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};

// export const getTags: RequestHandler = async (req, res, next) => {
//   console.log("at least oyu ttreid!!");
//   const authenticatedUserId = req.session.userId;

//   try {
//     assertIsDefined(authenticatedUserId);
//     const user = await UserModel.find({
//       userId: authenticatedUserId,
//     }).exec();

//     console.log(user);

//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

interface addTagBody {
  tag?: string;
}

export const addTag: RequestHandler<
  unknown,
  unknown,
  addTagBody,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const tag = req.body;

  console.log("New tag", tag);

  try {
    const user = await UserModel.findById(authenticatedUserId)
      .select("+email +tags")
      .exec();

      console.log("hello my dude")
    console.log("user", user);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface deleteTagBody {
  tag?: string;
}

export const deleteTag: RequestHandler<
  unknown,
  unknown,
  deleteTagBody,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const tag = req.body.tag;

  console.log("New tag", tag);

  try {
    assertIsDefined(authenticatedUserId);
    const user = await UserModel.find({
      userId: authenticatedUserId,
    }).exec();

    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
