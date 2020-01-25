import { vector, vector3, vector4 } from "../";

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
    expect(v.rg.toArray()).toStrictEqual([1, 2]);
    expect(v.bgr.toArray()).toStrictEqual([3, 2, 1]);
});
test("dot product", () => {
    let v1 = vector(1, 2);
    let v2 = vector(1, 0);
    expect(v1.dot(v2)).toBe(1);
});
test("vector addition", () => {
    let v1 = vector(1, 2);
    let v2 = vector(1, 0);
    expect(v1.plus(v2).toArray()).toStrictEqual([2, 2]);
});
test("vector subtraction", () => {
    let v1 = vector(1, 2);
    let v2 = vector(1, 0);
    expect(v1.minus(v2).toArray()).toStrictEqual([0, 2]);
});
test("special character methods", () => {
    let v1 = vector(1, 2);
    let v2 = vector(1, 0);
    expect(v1.ⵙ(v2)).toBe(1);
    expect(v1.ⵜ(v2).toArray()).toStrictEqual([2, 2]);
    expect(
        v1
            .ᜭ(v2)
            .х(2)
            .toArray()
    ).toStrictEqual([0, 4]);
});
