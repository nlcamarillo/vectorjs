import { vector, vector2, vector3, vector4 } from "../";

test("component access", () => {
    let v = vector3(1, 2, 3);
    expect(v[0]).toBe(1);
    expect(v[1]).toBe(2);
    expect(v[2]).toBe(3);
});
test("iterator pattern", () => {
    let v = vector3(1, 2, 3);
    expect([...v]).toStrictEqual([1, 2, 3]);
});

test("creating a 3 vector, checking xyz components", () => {
    let v = vector3(1, 2, 3);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
});
test("creating a 4 vector, checking rgba components", () => {
    let v = vector4(1, 2, 3, 4);
    expect(v.r).toBe(1);
    expect(v.g).toBe(2);
    expect(v.b).toBe(3);
    expect(v.a).toBe(4);
});
test("multiple components as subvector", () => {
    let v = vector4(1, 2, 3, 4);
    expect(v.rg.equals(vector2(1, 2))).toBe(true);
    expect(v.bgr.equals(vector3(3, 2, 1))).toBe(true);
});
test("dot product", () => {
    let v1 = vector(1, 2);
    let v2 = vector(1, 0);
    expect(v1.dot(v2)).toBe(1);
});
test("vector addition", () => {
    let v1 = vector(1, 2);
    let v2 = vector(1, 0);
    expect(v1.plus(v2).equals(vector2(2, 2))).toBe(true);
});
test("vector subtraction", () => {
    let v1 = vector(1, 2);
    let v2 = vector(1, 0);
    expect(v1.minus(v2).equals(vector2(0, 2))).toBe(true);
});
test("special character methods", () => {
    let v1 = vector(1, 2);
    let v2 = vector(1, 0);
    expect(v1.ⵙ(v2)).toBe(1);
    expect(v1.ⵜ(v2).equals(vector2(2, 2))).toBe(true);
    expect(
        v1
            .ᜭ(v2)
            .х(2)
            .toArray()
    ).toStrictEqual([0, 4]);
});

console.log(vector(1, 2, 3));
