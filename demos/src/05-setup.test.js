describe("Set", () => {
  beforeAll(() => {
    console.log("Before All");
  });

  beforeEach(() => {
    console.log("Before each");
  });

  test("case 1", () => {
    expect(1 + 1).toBe(2);
  });

  test("case 2", () => {
    expect(2 + 1).toBe(3);
  });

  describe("other group", () => {
    test("case 3", () => {
      expect(3 - 1).toBe(2);
    });
  });
});
