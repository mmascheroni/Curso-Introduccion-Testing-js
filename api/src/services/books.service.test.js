const BooksService = require("./books.service");
const { generateManyBooks } = require("../fake/book.fake.js");

// const fakeBooks = [
//   {
//     _id: 1,
//     name: "Harry Potter",
//   },
// ];

// Spy
const mockSpyGetAll = jest.fn();

// Stub - double
const MongoLibStub = {
  getAll: mockSpyGetAll,
  create: () => {},
};

jest.mock("../lib/mongo.lib.js", () =>
  jest.fn().mockImplementation(() => {
    return { getAll: mockSpyGetAll, create: () => {} };
  })
);

// Prueba Unitaria al metodo GET
describe("Test for BooksService", () => {
  let service;
  beforeEach(() => {
    service = new BooksService();
    jest.clearAllMocks(); // Clean all mock
  });

  describe("test for getBooks", () => {
    test("should return a list books", async () => {
      // Arrange - Given
      const fakeBooks = generateManyBooks(20);
      mockSpyGetAll.mockResolvedValue(fakeBooks);
      // Act - When
      const books = await service.getBooks({});
      console.log(books);
      // Assert - Then
      expect(books.length).toEqual(fakeBooks.length);
      expect(books[0].name).toEqual(fakeBooks[0].name);
      expect(mockSpyGetAll).toHaveBeenCalled();
      expect(mockSpyGetAll).toHaveBeenCalledWith("books", {});
    });
  });

  test("should return a list books", async () => {
    // Arrange - Given
    const fakeBooks = generateManyBooks(10);
    mockSpyGetAll.mockResolvedValue(fakeBooks);
    // mockSpyGetAll.mockResolvedValue([
    //   {
    //     _id: 2,
    //     name: "Jhon Wick 1",
    //   },
    // ]);
    // Act - When
    const books = await service.getBooks({});
    console.log(books);
    // Assert - Then
    expect(books.length).toEqual(fakeBooks.length);
    expect(books[0].name).toEqual(fakeBooks[0].name);
    expect(mockSpyGetAll).toHaveBeenCalled();
    expect(mockSpyGetAll).toHaveBeenCalledWith("books", {});
  });
});
