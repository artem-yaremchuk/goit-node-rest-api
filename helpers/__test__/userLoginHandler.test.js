import request from "supertest";
import app from "../../app.js";
import * as usersService from "../../services/usersServices.js";

const userPayload = {
  email: "test@example.com",
  subscription: "starter",
};

describe("test POST /users/login", () => {
  beforeAll(() => {
    console.log("BEFORE ALL");

    jest
      .spyOn(usersService, "login")
      .mockReturnValue({ user: userPayload, token: "jwt.token.string" });
  });

  it("should return bad request error - invalid password", async () => {
    const testData = {
      email: "test@example.com",
      password: "Pass1234",
    };

    const res = await request(app).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(400);
  });

  it("should return bad request error - invalid email", async () => {
    const testData = {
      email: "testexample.com",
      password: "Pass_1234",
    };

    const res = await request(app).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(400);
  });

  it("should return a user object and a token", async () => {
    const correctUserData = {
      email: "test@example.com",
      password: "Pass_1234",
    };

    const res = await request(app)
      .post("/api/users/login")
      .send(correctUserData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      }),
    );
  });
});
