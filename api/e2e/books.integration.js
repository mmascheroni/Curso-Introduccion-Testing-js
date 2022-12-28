// Integration Tests
const request = require("supertest");

const mockGetAll = jest.fn();

const createApp = require("../src/app");
const { generateManyBooks } = require("../src/fake/book.fake");

jest.mock("../src/lib/mongo.lib.js", () =>
  jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll, create: () => {} };
  })
);

describe("Test for hello endpoint", () => {
  let app = null;
  let server = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3000);
  });

  afterAll(async () => {
    await server.close();
  });

  // Con dicho endpoint consultamos a la BD, l ocual se deberia evitar las consultas a la BD
  // describe("test for [GET] /api/v1/books", () => {
  //   test("should return a list books /", () => {
  //     return request(app)
  //       .get("/api/v1/books")
  //       .expect(200)
  //       .then(({ body }) => {
  //         console.log(body);
  //         expect(body.length).toEqual(1);
  //       });
  //   });
  // });

  describe("test for [GET] /api/v1/books", () => {
    test("should return a list books /", async () => {
      // Arrange - Given
      const fakeBooks = generateManyBooks(20);
      mockGetAll.mockResolvedValue(fakeBooks);

      // Act - When
      const { body } = await request(app).get("/api/v1/books").expect(200);
      console.log(body);
      // Assert - Then
      expect(body.length).toEqual(fakeBooks.length);
    });
  });
});
