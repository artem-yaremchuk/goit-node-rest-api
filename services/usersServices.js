import { User } from "../models/userModel.js";
import { signToken } from "../services/jwtService.js";
import HttpError from "../helpers/HttpError.js";

async function signup(userData) {
  const newUser = await User.create(userData);

  return newUser;
}

async function login({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email or password is wrong");

  const isPasswordValid = await user.checkPassword(password, user.password);

  if (!isPasswordValid) throw HttpError(401, "Email or password is wrong");

  const token = signToken(user.id);

  await User.findByIdAndUpdate(user.id, { token });

  return { email, token };
}

export { signup, login };
