// e2e - Recorren todo el camino incluyendo la BD
const request = require("supertest");
const { MongoClient } = require("mongodb"); // Para hacer consultas a la base de datos

const createApp = require("../src/app");
const { config } = require("../src/config");

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe("Test for hello endpoint", () => {
  let app = null;
  let server = null;
  let database = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3000);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await database.collection("books").drop(); // Clean database after our tests
  });

  // Con dicho endpoint consultamos a la BD, l ocual se deberia evitar las consultas a la BD
  describe("test for [GET] /api/v1/books", () => {
    test("should return a list books /", async () => {
      // Arrange - Given
      const seedData = await database.collection("books").insertMany([
        { name: "Book1", year: 1997, author: "Mauro" },
        { name: "Book2", year: 1997, author: "Mauro" },
      ]);

      console.log(seedData);
      // Act - When
      return request(app)
        .get("/api/v1/books")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          // Assert - Then
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });

  // --> INTEGRATION NOT TOUCH THE DATABASE
  // describe("test for [GET] /api/v1/books", () => {
  //   test("should return a list books /", async () => {
  //     // Arrange - Given
  //     const fakeBooks = generateManyBooks(20);
  //     mockGetAll.mockResolvedValue(fakeBooks);

  //     // Act - When
  //     const { body } = await request(app).get("/api/v1/books").expect(200);
  //     console.log(body);
  //     // Assert - Then
  //     expect(body.length).toEqual(fakeBooks.length);
  //   });
  // });
});
