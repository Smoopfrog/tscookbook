import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import RecipeModel from "../models/recipe";

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
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one."
      );
    }

    const existingEmail = await UserModel.findOne({
      email: email,
    }).exec();

    if (existingEmail) {
      throw createHttpError(
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

export const deleteAccount: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    const user = await UserModel.findById(authenticatedUserId).exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    if (!user._id.equals(authenticatedUserId)) {
      throw createHttpError(401, "Not authorized to access this account.");
    }

    await RecipeModel.deleteMany({
      userId: authenticatedUserId,
    }).exec();

    await user.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

interface changePasswordBody {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const changePassword: RequestHandler<
  unknown,
  unknown,
  changePasswordBody,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  try {
    if (!currentPassword || !newPassword || !confirmPassword) {
      throw createHttpError(400, "Parameters missing");
    }

    if (newPassword !== confirmPassword) {
      throw createHttpError(401, "Passwords don't match");
    }

    const user = await UserModel.findOne({ _id: authenticatedUserId })
      .select("+password")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid password");
    }

    if (currentPassword === newPassword) {
      throw createHttpError(401, "Password must be different from previous one");

    }

 
    const passwordHashed = await bcrypt.hash(newPassword, 10);

    user.password = passwordHashed;

    await user.save();

    res.sendStatus(204);
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
  const tag = req.body.tag;

  try {
    assertIsDefined(authenticatedUserId);

    if (!tag) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select("+email +tags")
      .exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    if (user.tags.includes(tag)) {
      throw createHttpError(409, "Tag already exists");
    }

    user.tags = [...user.tags, tag];

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
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

  try {
    assertIsDefined(authenticatedUserId);

    if (!tag) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select("+email +tags")
      .exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const index = user.tags.indexOf(tag);

    if (index > -1) {
      user.tags.splice(index, 1);
    } else {
      throw createHttpError(404, "Tag not found");
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
