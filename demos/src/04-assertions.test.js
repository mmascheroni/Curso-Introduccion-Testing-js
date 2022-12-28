// Matchers

test("test obj", () => {
  const data = {
    name: "Mauro",
  };

  expect(data.name).toEqual("Mauro");
});

test("test obj 2", () => {
  const data = {
    name: "Mauro",
  };

  data.lastName = "Mascheroni";

  expect(data.name).toEqual("Mauro");
  expect(data.lastName).toEqual("Mascheroni");
});

test("test obj 3", () => {
  const data = {
    name: "Mauro",
  };

  data.lastName = "Mascheroni";

  expect(data).toEqual({
    name: "Mauro",
    lastName: "Mascheroni",
  });
});

test("null", () => {
  const data = null;

  expect(data).toBeNull();
  expect(data).toBeDefined();
  expect(data).not.toBeUndefined();
});

test("booleans", () => {
  expect(true).toEqual(true);
  expect(true).toBeTruthy();
  expect(false).toEqual(false);

  expect(0).toBeFalsy();
  expect("").toBeFalsy();
  expect(false).toBeFalsy();
});

test("string", () => {
  expect("Christopher").toMatch(/stopher/);
});
