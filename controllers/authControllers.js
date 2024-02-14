import catchAsync from "../helpers/catchAsync.js";
import { signup, login } from "../services/usersServices.js";
import { User } from "../models/userModel.js";

export const registerUser = catchAsync(async (req, res) => {
  const { email } = await signup(req.body);

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, token } = await login(req.body);

  res.status(200).json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
});

export const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

export const logoutUser = catchAsync(async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
});
