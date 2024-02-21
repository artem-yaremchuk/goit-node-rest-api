import { User } from "../models/userModel.js";
import { signToken } from "../services/jwtService.js";
import HttpError from "../helpers/HttpError.js";
import { ImageService } from "../services/imageService.js";
import { v4 } from "uuid";

async function signup(userData) {
  userData.verificationToken = v4();

  const newUser = await User.create(userData);

  return newUser;
}

async function verify(verificationToken) {
  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, "User not found");

  user.verificationToken = null;
  user.verify = true;

  return user.save();
}

async function reverify({ email }) {
  const user = await User.findOne({ email });

  if (user.verify) throw HttpError(400, "Verification has already been passed");

  return user;
}

async function login({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email or password is wrong");

  if (!user.verify) throw HttpError(401, "User is not verified");

  const isPasswordValid = await user.checkPassword(password, user.password);

  if (!isPasswordValid) throw HttpError(401, "Email or password is wrong");

  const token = signToken(user.id);

  await User.findByIdAndUpdate(user.id, { token });

  return { email, token };
}

async function updateAvatar(user, file) {
  if (file) {
    user.avatarURL = await ImageService.saveImage(
      file,
      {
        maxFileSize: 2,
        width: 250,
        height: 250,
      },
      "avatars",
    );
  }

  return user.save();
}

export { signup, verify, reverify, login, updateAvatar };
