"use strict";
const supertest = require("supertest");
const { app } = require("../src/server");
const mock = supertest(app);

describe("API server", () => {
  it("POST to /signup to create a new user", async () => {
    const data = { username: "test", password: "123" };
    const response = await mock.post("/signup").send(data);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual(data.username);
  });

  it("POST to /signin to login as a user", async () => {
    const data = { username: "test", password: "123" };
    const response2 = await mock
      .post("/signin")
      .set({ Authorization: `Basic dGVzdDoxMjM=` });
    expect(response2.status).toEqual(201);
    expect(response2.name).toEqual(data.name);
  });
});

describe("Middleware and routes tests", () => {
  it("Send error when authorization headers are bad", async () => {
    const res = await mock
      .post("/signin")
      .set({ Authorization: `Bearer dGVzdDoxMjM=` });
    expect(res.status).toEqual(500);
    expect(res.text).toEqual("WRONG Authorization headers");
  });

  it("Send error when username is wrong", async () => {
    const res = await mock
      .post("/signin")
      .set({ Authorization: `Basic dGszdDoxMjM=` });
    expect(res.status).toEqual(500);
    expect(res.text).toEqual("WRONG username / password");
  });

  it("Send error when password is wrong", async () => {
    const res = await mock
      .post("/signin")
      .set({ Authorization: `Basic dGVzdDoxMlM=` });
    expect(res.status).toEqual(500);
    expect(res.text).toEqual("WRONG username / password");
  });
});
