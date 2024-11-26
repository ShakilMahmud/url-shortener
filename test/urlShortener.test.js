const request = require("supertest");
const app = require("../src/app");

describe("URL Shortener Service", () => {
  it("should generate a short URL for a valid long URL", async () => {
    const res = await request(app)
      .post("/generate")
      .send({ longUrl: "https://www.google.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.shortUrl).toBeDefined();
    expect(res.body.data.longUrl).toBe("https://www.google.com");
  });

  it("should return an error for invalid URLs", async () => {
    const res = await request(app)
      .post("/generate")
      .send({ longUrl: "invalid-url" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid URL provided!");
  });

  it("should redirect to the original URL for a valid short URL", async () => {
    const generateRes = await request(app)
      .post("/generate")
      .send({ longUrl: "https://www.google.com" });

    const { shortUrl } = generateRes.body.data;

    const redirectRes = await request(app).get(`/${shortUrl}`);
    expect(redirectRes.statusCode).toBe(302);
    expect(redirectRes.headers.location).toBe("https://www.google.com");
  });

  it("should return an error for an invalid short URL", async () => {
    const res = await request(app).get("/invalidShortUrl");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Short URL not found");
  });
});
