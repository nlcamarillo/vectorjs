import { vector, vector2, vector3, vector4 } from "../";

describe("generic vector", () => {
    test("component access", () => {
        let v = vector3(1, 2, 3);
        expect(v[0]).toBe(1);
        expect(v[1]).toBe(2);
        expect(v[2]).toBe(3);
    });
    test("component access", () => {
        let v = vector3(1, 2, 3);
        v[1] = 4;
        expect(v.y).toBe(4);
    });
    test("iterator pattern", () => {
        let v = vector3(1, 2, 3);
        expect([...v]).toStrictEqual([1, 2, 3]);
    });
    test("add different length vectors", () => {
        let v1 = vector(1, 2, 3);
        let v2 = vector(1, 2);
        expect(() => v1.plus(v2)).toThrow(
            "can only add product vectors of same size, got 3 and 2"
        );
    });
});

describe("vector3", () => {
    test("creating a 3 vector, checking xyz components getters", () => {
        let v = vector3(1, 2, 3);
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
        expect(v.z).toBe(3);
    });
    test("creating a 3 vector, checking xyz components setters", () => {
        let v = vector3(1, 2, 3);
        v.x = 4;
        v.y = 5;
        v.z = 6;
        expect([...v]).toStrictEqual([4, 5, 6]);
    });
});

describe("vector4", () => {
    test("creating a 4 vector, checking rgba components getters", () => {
        let v = vector4(1, 2, 3, 4);
        expect(v.r).toBe(1);
        expect(v.g).toBe(2);
        expect(v.b).toBe(3);
        expect(v.a).toBe(4);
    });
    test("creating a 4 vector, checking rgba components setters", () => {
        let v = vector4(1, 2, 3, 4);
        v.r = 5;
        v.g = 6;
        v.b = 7;
        v.a = 8;
        expect([...v]).toStrictEqual([5, 6, 7, 8]);
    });
    test("multiple components as subvector getters", () => {
        let v = vector4(1, 2, 3, 4);
        expect(v.rg.equals(vector2(1, 2))).toBe(true);
        expect(v.bgr.equals(vector3(3, 2, 1))).toBe(true);
    });
    test("multiple components as subvector setters", () => {
        let v = vector4(1, 2, 3, 4);
        v.gr = vector2(5, 6);
        expect([...v]).toStrictEqual([6, 5, 3, 4]);
        v.ba = v.ab;
        expect([...v]).toStrictEqual([6, 5, 4, 3]);
    });
});

describe("vector2", () => {
    test("dot product", () => {
        let v1 = vector(1, 2);
        let v2 = vector(1, 0);
        expect(v1.dot(v2)).toBe(1);
    });
    test("vector addition", () => {
        let v1 = vector2(1, 2);
        let v2 = vector2(1, 0);
        let res = v1.plus(v2);
        expect(res.x).toBe(2);
        expect(res.y).toBe(2);
    });
    test("vector subtraction", () => {
        let v1 = vector2(1, 2);
        let v2 = vector2(1, 0);
        let res = v1.minus(v2);
        expect(res.x).toBe(0);
        expect(res.y).toBe(2);
    });
    test("vector type after operations", () => {
        let v1 = vector2(1, 2);
        let v2 = vector2(1, 0);
        let v3 = v1.plus(v2).times(1);
        expect(v3.x).toBe(2);
        expect(v3.y).toBe(2);
    });
    test("2D rotation", () => {
        let v1 = vector2(1, 0);
        let v2 = v1.rotate(Math.PI / 2);
        expect(v2.x).toBeCloseTo(0);
        expect(v2.y).toBeCloseTo(1);
    });
    test("zero vector", () => {
        let v1 = vector2(0, 0);
        expect(v1.x).toBe(0);
        expect(v1.y).toBe(0);
    });
    test("logging", () => {
        let v1 = vector2(1, 1);
        console.log(v1);
    });
    test("cross product", () => {
        let v1 = vector2(1, 0);
        let v2 = vector2(0, 1);
        expect(v1.cross(v2)).toBe(1);
        expect(v2.cross(v1)).toBe(-1);
    });
    test("angle", () => {
        let v1 = vector2(1, 0);
        expect(v1.angle()).toBe(0);
        let v2 = vector2(1, 1);
        expect(v2.angle()).toBe(Math.PI / 4);
        let v3 = vector2(0, 1);
        expect(v3.angle()).toBe(Math.PI / 2);
    });
});
