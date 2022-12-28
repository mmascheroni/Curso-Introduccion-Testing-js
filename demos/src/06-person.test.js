const Person = require("./06-person");

describe("Test for imc person", () => {
  let person;

  beforeEach(() => {
    person = new Person("Matias", 45, 1.7);
  });

  test("should return down", () => {
    person.weight = 45;
    const imc = person.calcIMC();

    expect(imc).toBe("down");
  });

  test("should return normal", () => {
    person.weight = 60;
    const imc = person.calcIMC();

    expect(imc).toBe("normal");
  });

  test("should return overweight", () => {
    person.weight = 75;
    const imc = person.calcIMC();

    expect(imc).toBe("overweight");
  });

  test("should return overweight level 1", () => {
    person.weight = 80;
    const imc = person.calcIMC();

    expect(imc).toBe("overweight level 1");
  });

  test("should return overweight level 2", () => {
    person.weight = 90;
    const imc = person.calcIMC();

    expect(imc).toBe("overweight level 2");
  });

  test("should return overweight level 3", () => {
    person.weight = 115;
    const imc = person.calcIMC();

    expect(imc).toBe("overweight level 3");
  });

  test("should return no found", () => {
    person.weight = -115;
    const imc = person.calcIMC();

    expect(imc).toBe("no found");
  });
});
