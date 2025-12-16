import { it, eq, log } from "./testing";

log("<h2>CLASSES</h2>");

// TASK: Complete refactoring of Shape App with OOP and classes

// 1) Implement classes for each Shape type (Square, Triangle)

// 2) Add constructors, methods calculateArea() and draw() for each class

abstract class Shape {
  abstract calculateArea(): number;
  private _color: string = "";

  draw() {
    let className = Object.getPrototypeOf(this).constructor.name;
    log("Drawing " + className);
    log("With color " + this._color);
  }

  setColor(color: string): this {
    this._color = color;
    return this;
  }

  static createShape(
    kind: "circle" | "square" | "triangle",
    second: number,
    third?: number
  ) {
    if (kind === "circle") return new Circle(second);
    if (kind === "square") return new Square(second);
    if (kind === "triangle" && third !== undefined)
      return new Triangle(second, third);
    throw Error("unknown type");
  }
}

class Circle extends Shape {
  private _radius: number;

  constructor(radius: number) {
    super();
    this._radius = radius;
  }

  override draw() {
    super.draw();
    log("With radius: " + this.radius);
  }

  calculateArea(): number {
    return this.radius ** 2 * Math.PI;
  }

  set radius(radius) {
    if (radius <= 0) throw Error("radious should be positive");
    this._radius = radius;
  }
  get radius() {
    return this._radius;
  }
}

class Square extends Shape {
  private _sideLength: number;

  constructor(sideLength: number) {
    super();
    this._sideLength = sideLength;
  }

  override draw() {
    super.draw();
    log("With side length: " + this.sideLength);
  }

  calculateArea(): number {
    return this.sideLength ** 2;
  }

  set sideLength(sideLength: number) {
    if (sideLength <= 0) throw Error("sideLength should be positive");
    this._sideLength = sideLength;
  }
  get sideLength() {
    return this._sideLength;
  }
}

class Triangle extends Shape {
  private _base: number;
  private _height: number;

  constructor(base: number, height: number) {
    super();
    this._base = base;
    this._height = height;
  }

  override draw() {
    super.draw();
    log("With base: " + this.base + " and height: " + this.height);
  }

  calculateArea(): number {
    return (this.base * this.height) / 2;
  }

  set base(base: number) {
    if (base <= 0) throw Error("base should be positive");
    this._base = base;
  }
  get base() {
    return this._base;
  }

  set height(height: number) {
    if (height <= 0) throw Error("height should be positive");
    this._height = height;
  }
  get height() {
    return this._height;
  }
}

// 3) add support of Square and Triangle to the static method createShape

let s = Shape.createShape("circle", 5);
s.calculateArea();

// 4) Use shape methods to create Square and Triangle shapes,
// set color and draw, and calculate areas
let shape = Shape.createShape("circle", 10);
shape.setColor("blue").draw();
log(shape.calculateArea());

shape = Shape.createShape("square", 8);
shape.setColor("red").draw();
log(shape.calculateArea());

shape = Shape.createShape("triangle", 6, 12);
shape.setColor("yellow").draw();
log(shape.calculateArea());

// 5) Implement sideLength getter and setter for Square
// add tests for sideLength (sideLength should not be negative)
const circleForTest = Shape.createShape("circle", 10) as Circle;

it("set radius to 0 with exception", () => {
  try {
    circleForTest.radius = 0; // should throw exception
  } catch (e) {
    return true;
  }
  return false;
});

it("set radius to 3 with no exception", () => {
  circleForTest.radius = 3; // should not throw exception
  return circleForTest.radius == 3;
});

const squareForTest = Shape.createShape("square", 10) as Square;
it("set sideLength to 0 with exception", () => {
  try {
    squareForTest.sideLength = 0; // should throw exception
  } catch (e) {
    return true;
  }
  return false;
});

it("set sideLength to 3 with no exception", () => {
  squareForTest.sideLength = 3; // should not throw exception
  return squareForTest.sideLength == 3;
});
