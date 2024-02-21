import catchAsync from "../helpers/catchAsync.js";
import {
  signup,
  verify,
  reverify,
  login,
  updateAvatar,
} from "../services/usersServices.js";
import { User } from "../models/userModel.js";
import { Email } from "../services/emailService.js";

export const registerUser = catchAsync(async (req, res) => {
  const newUser = await signup(req.body);
  const { email, verificationToken } = newUser;

  try {
    const url = `${req.protocol}://${req.get("host")}/users/verify/${verificationToken}`;

    await new Email(newUser, url).sendVerification();
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
});

export const verifyUser = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;
  console.log(req.params);

  await verify(verificationToken);

  res.status(200).json({
    message: "Verification successful",
  });
});

export const reverifyUser = catchAsync(async (req, res) => {
  const user = await reverify(req.body);

  const { verificationToken } = user;

  try {
    const url = `${req.protocol}://${req.get("host")}/users/verify/${verificationToken}`;

    await new Email(user, url).sendVerification();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({
    message: "Verification email sent",
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

export const updateUserAvatar = catchAsync(async (req, res) => {
  const { avatarURL } = await updateAvatar(req.user, req.file);

  res.status(200).json({
    avatarURL,
  });
});
