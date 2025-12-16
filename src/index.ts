import { it, eq, log } from "./testing";

// TASK 1
// Define TypeScript interfaces for Square, and Triangle shapes
// with appropriate properties
// (sideLength for Square, base & height for Triangle).
// HINT: use kind property to define a type

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}
// extend Shape to support all types of shapes

type Shape = Circle | Square | Triangle;

// TASK 2
// Implement type guard functions for each shape:
// isCircle, isSquare, and isTriangle.

function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}

function isSquare(shape: Shape): shape is Circle {
  return shape.kind === "square";
}

function isTriangle(shape: Shape): shape is Circle {
  return shape.kind === "triangle";
}

function calculateCircleArea(circle: Circle): number {
  return Math.PI * circle.radius ** 2;
}

function calculateTriangleArea(triangle: Triangle): number {
  return (triangle.base * triangle.height) / 2;
}

function calculateSquareArea(square: Square): number {
  return square.sideLength ** 2;
}

// TASK 3: implement universal method calculateArea
// which should be able to accept different shapes.
// Use type guards to narrow down the shape type
// Return shape.sideLength ** 2 for Square.
// Return (shape.base * shape.height) / 2 for Triangle.

function calculateArea(shape: Shape): number {
  if (isCircle(shape)) return calculateCircleArea(shape);
  if (isTriangle(shape)) return calculateTriangleArea(shape);
  if (isSquare(shape)) return calculateSquareArea(shape);
  throw new Error("Wrong shape");
}

// Testing

const circle = { kind: "circle", radius: 10 } satisfies Circle;
it("calculate circle area", () =>
  calculateArea(circle) === circle.radius ** 2 * Math.PI);

// TASK 4: Add tests for other shapes

const square = { kind: "square", sideLength: 10 } satisfies Square;
it("calculate square area", () =>
  calculateArea(square) === square.sideLength ** 2);

const triangle = { kind: "triangle", base: 10, height: 20 } satisfies Triangle;
it("calculate triangle area", () =>
  calculateArea(triangle) === (triangle.base * triangle.height) / 2);

// TASK 5: define a type ShapeWithProperties which allows to add
// any arbitary properties to the shape (use loose index signatures)
// HINT: use intersection Shape & { structural type }
type ShapeWithProperties = Shape & { [key: string]: any };

// TASK 6: create an object of type ShapeWithProperties with additional
// properties color and label,
// use spread operator to immutably copy existing properties of square to the new object
// test its usage with calculateArea
const squareWithLabelnColor: ShapeWithProperties = {
  ...square,
  color: "blue",
  label: "blue square",
};

it("area of blue square", () => calculateArea(squareWithLabelnColor) === 100);
it("color of blue square", () => squareWithLabelnColor.color === "blue");
it("label of blue square", () => squareWithLabelnColor.label === "blue square");

// ----------

// TASK 7: add more overloaded signatures for different types
// HINT: a common mistake is to add more than 3 arguments to createShape() implementation
// instead, you need to add thirdArgument (optional) and use these arguments
// to create Square and Triangle

function createShape(
  kind: "circle" | "square" | "triangle",
  secondArgument: number,
  thirdArgument?: number
): Shape {
  if (kind === "circle") {
    return { kind: "circle", radius: secondArgument } as Circle;
  } else if (kind === "square") {
    return { kind: "square", sideLength: secondArgument } as Square;
  } else if (kind === "triangle" && thirdArgument !== undefined) {
    return {
      kind: "triangle",
      base: secondArgument,
      height: thirdArgument,
    } as Triangle;
  }
  throw new Error("Invalid arguments");
}

it("create shape circle", () =>
  eq(createShape("circle", 5), { kind: "circle", radius: 5 }));

// TASK 8: add tests for triangle and square
// e.g. createShape("square", 3) should return square with a side 3
it("create shape square with side length 3", () =>
  eq(createShape("square", 3), { kind: "square", sideLength: 3 }));
it("create shape triangle", () =>
  eq(createShape("triangle", 3, 6), { kind: "triangle", base: 3, height: 6 }));

// TASK 9: implement function printShapesInfo(...shapes) which takes
// shapes array as an argument and prints all shapes with the use of printShapeInfo()

function printShapesInfo(...shapes: Shape[]): void {
  for (const shape of shapes) {
    if (isCircle(shape)) {
      log(`circle with radius: ${shape.radius}`);
    } else if (isSquare(shape)) {
      log(`square with side length: ${shape.sideLength}`);
    } else if (isTriangle(shape)) {
      log(`triangle with base: ${shape.base} and height: ${shape.height}`);
    }
  }
}

// Example usage: printShapesInfo(circle, square, triangle);
printShapesInfo(circle, square, triangle);

// TASK 10: we have a function printProperties() which takes 2 arguments:
// 1) object with property "kind" and any number of other properties
// 2) function to process every option and return a string representation
// function should print the complete information about an object and
// all its properties

// TODO: specify argument types (instead of any)

function printProperties(
  obj: ShapeWithProperties,
  getProperty: (propName: string, propValue: any) => string
) {
  for (const propName in obj) {
    if (propName !== "kind") {
      const propValue = obj[propName];
      const processedPropValue = getProperty(propName, propValue);
      log(`${processedPropValue}`);
    }
  }
}
// TASK 11: define the enumeration for type ShapeEnum
// (with values Circle, Square, Triangle)
// Implement a function which takes ShapeEnum and return number of angles.
enum ShapeEnum {
  Circle,
  Square,
  Triangle,
}

function getNumberOfAngles(shape: ShapeEnum): number {
  switch (shape) {
    case ShapeEnum.Circle:
      return 0;
    case ShapeEnum.Square:
      return 4;
    case ShapeEnum.Triangle:
      return 3;
    default:
      throw new Error("Unknown shape");
  }
}

// TASK 12: implement tests for function getNumberOfAngles, e.g.
// getNumberOfAngles(ShapeEnum.Circle) === 0
// getNumberOfAngles(ShapeEnum.Square) === 4
it("circle should have 0 angle", () =>
  getNumberOfAngles(ShapeEnum.Circle) === 0);
it("square should have 4 angles", () =>
  getNumberOfAngles(ShapeEnum.Square) === 4);
it("triangle should have 3 angles", () =>
  getNumberOfAngles(ShapeEnum.Triangle) === 3);
