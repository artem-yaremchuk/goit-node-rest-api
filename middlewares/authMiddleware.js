import HttpError from "../helpers/HttpError.js";
import catchAsync from "../helpers/catchAsync.js";
import { User } from "../models/userModel.js";
import {
  registerDataValidator,
  loginDataValidator,
} from "../helpers/userValidators.js";
import { checkToken } from "../services/jwtService.js";

export const checkRegisterData = catchAsync(async (req, res, next) => {
  const { value, error } = registerDataValidator(req.body);

  if (error) throw HttpError(400, error.message);

  const user = await User.findOne({ email: value.email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  req.body = value;

  next();
});

export const checkLoginData = (req, res, next) => {
  const { value, error } = loginDataValidator(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
};

export const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];
  const userId = checkToken(token);

  if (!userId) throw HttpError(401, "Not authorized");

  const currentUser = await User.findById(userId);

  if (!currentUser) throw HttpError(401, "Not authorized");

  req.user = currentUser;

  next();
});
