const createIterator = (v: BaseVector) => {
    return function* () {
        for (let i = 0; i < v.size; i++) {
            yield v.get(i);
        }
    };
};

class BaseVector {
    protected components: number[];
    constructor(..._components: number[]) {
        this.components = _components;
    }
    // implementing the iterator protocol
    [Symbol.iterator] = createIterator(this);
    public inspect() {
        return `Vector(${this.components.join(",")})`;
    }
    /**
     * returns the components in an array. Note you can also use the iterator pattern
     */
    public toArray(): number[] {
        return this.components;
    }
    /**
     * get a component from the vector
     */
    public get(index: number) {
        return this.components[index];
    }
    /**
     * set a component of the vector
     */
    public set(index: number, value: number) {
        this.components[index] = value;
    }
    /**
     * the dimensionality of the vector
     */
    public get size(): number {
        return this.components.length;
    }
    /**
     * check whether a vector equals another
     */
    public equals(other: Vector): boolean {
        let o = other.toArray();
        return this.components.every((c, i) => c === o[i]);
    }
    /**
     * squared norm of the vector
     */
    public n2(): number {
        return this.components.reduce((sum, c) => sum + c * c, 0);
    }
    /**
     * norm of the vector
     */
    public norm(): number {
        return Math.sqrt(this.n2());
    }
    /**
     * inner product with another vector
     */
    public dot(other: Vector): number {
        if (other.size !== this.size) {
            throw new Error(
                `can only dot product vectors of same size, got ${this.size} and ${other.size}`
            );
        }
        let o = other.toArray();
        return this.components.reduce((sum, c, i) => sum + c * o[i], 0);
    }
    /**
     * adds another vector to this one
     */
    public plus(other: Vector): Vector {
        if (other.size !== this.size) {
            throw new Error(
                `can only add product vectors of same size, got ${this.size} and ${other.size}`
            );
        }
        let o = other.toArray();
        return vector(...this.components.map((c, i) => c + o[i]));
    }
    /**
     * multiplies by a scalar
     */
    public times(scalar: number): Vector {
        return vector(...this.components.map((c) => c * scalar));
    }
    /**
     * subtracts another vector from this one
     */
    public minus(other: Vector): Vector {
        return this.plus(other.times(-1));
    }
    /**
     * normalizes the vector to length 1 or 0 if it was already 0
     */
    public normalize(): Vector {
        let n = this.norm();
        if (n === 0) return this;
        return this.times(1 / n);
    }
}

class BaseVector2 extends BaseVector {
    /**
     * the x (0) component
     */
    get x() {
        return this.components[0];
    }
    set x(value: number) {
        this.components[0] = value;
    }
    /**
     * the y (1) component
     */
    get y() {
        return this.components[1];
    }
    set y(value: number) {
        this.components[1] = value;
    }
}
class RealVector2 extends BaseVector2 {
    /**
     * rotate the vector
     */
    public rotate(angle: number): Vector2 {
        let ca = Math.cos(angle);
        let sa = Math.sin(angle);
        return vector2(this.x * ca - this.y * sa, this.x * sa + this.y * ca);
    }
    public cross(other: Vector2): number {
        return this.x * other.y - this.y * other.x;
    }
    public angle(): number {
        return Math.atan2(this.y, this.x);
    }
}
class BaseVector3 extends BaseVector2 {
    /**
     * the z (2) component
     */
    get z() {
        return this.components[2];
    }
    set z(value: number) {
        this.components[2] = value;
    }
    /**
     * the red (0) component
     */
    get r() {
        return this.components[0];
    }
    set r(value: number) {
        this.components[0] = value;
    }
    /**
     * the green (1) component
     */
    get g() {
        return this.components[1];
    }
    set g(value: number) {
        this.components[1] = value;
    }
    /**
     * the blue (2) component
     */
    get b() {
        return this.components[2];
    }
    set b(value: number) {
        this.components[2] = value;
    }
}
class BaseVector4 extends BaseVector3 {
    /**
     * the alpha (3) component
     */
    get a() {
        return this.components[3];
    }
    set a(value: number) {
        this.components[3] = value;
    }
}

export interface Vector extends BaseVector {}
interface BaseVector2WithAccessors extends BaseVector2 {
    /**
     * the x and y component as Vector2
     */
    xy: Vector2;
    /**
     * the x and z component as Vector2
     */
    xz: Vector2;
    /**
     * the y and x component as Vector2
     */
    yx: Vector2;
    /**
     * the y and z component as Vector2
     */
    yz: Vector2;
    /**
     * the z and x component as Vector2
     */
    zx: Vector2;
    /**
     * the z and y component as Vector2
     */
    zy: Vector2;
}
export interface Vector2 extends BaseVector2WithAccessors, RealVector2 {
    plus(other: Vector2): Vector2;
    times(scalar: number): Vector2;
    minus(other: Vector2): Vector2;
    normalize(): Vector2;
}
interface BaseVector3WithAccessors
    extends BaseVector2WithAccessors,
        BaseVector3 {
    /**
     * the red and green component as Vector2
     */
    rg: Vector2;
    /**
     * the red and blue component as Vector2
     */
    rb: Vector2;
    /**
     * the green and red component as Vector2
     */
    gr: Vector2;
    /**
     * the green and blue component as Vector2
     */
    gb: Vector2;
    /**
     * the blue and red component as Vector2
     */
    br: Vector2;
    /**
     * the blue and green component as Vector2
     */
    bg: Vector2;

    /**
     * the red, green and blue component as Vector3
     */
    rgb: Vector3;
    /**
     * the red, blue and green component as Vector3
     */
    rbg: Vector3;

    /**
     * the green, red and blue component as Vector3
     */
    grb: Vector3;
    /**
     * the green, blue and red component as Vector3
     */
    gbr: Vector3;

    /**
     * the blue, red and green component as Vector3
     */
    brg: Vector3;
    /**
     * the blue, green and red component as Vector3
     */
    bgr: Vector3;
}
export interface Vector3 extends BaseVector3WithAccessors {
    plus(other: Vector3): Vector3;
    times(scalar: number): Vector3;
    minus(other: Vector3): Vector3;
    normalize(): Vector3;
}

interface BaseVector4WithAccessors
    extends BaseVector3WithAccessors,
        BaseVector4 {
    /**
     * the red and alpha component as Vector2
     */
    ra: Vector2;
    /**
     * the green and alpha component as Vector2
     */
    ga: Vector2;
    /**
     * the blue and alpha component as Vector2
     */
    ba: Vector2;
    /**
     * the alpha and red component as Vector2
     */
    ar: Vector2;
    /**
     * the alpha and green component as Vector2
     */
    ag: Vector2;
    /**
     * the alpha and blue component as Vector2
     */
    ab: Vector2;

    /**
     * the red, green and alpha component as Vector3
     */
    rga: Vector3;
    /**
     * the red, blue and alpha component as Vector3
     */
    rba: Vector3;
    /**
     * the red, alpha and green component as Vector3
     */
    rag: Vector3;
    /**
     * the red, alpha and blue component as Vector3
     */
    rab: Vector3;

    /**
     * the green, red and alpha component as Vector3
     */
    gra: Vector3;
    /**
     * the green, blue and alpha component as Vector3
     */
    gba: Vector3;
    /**
     * the green, alpha and red component as Vector3
     */
    gar: Vector3;
    /**
     * the green, alpha and blue component as Vector3
     */
    gab: Vector3;

    /**
     * the blue, red and alpha component as Vector3
     */
    bra: Vector3;
    /**
     * the blue, green and alpha component as Vector3
     */
    bga: Vector3;
    /**
     * the blue, alpha and red component as Vector3
     */
    bar: Vector3;
    /**
     * the blue, alpha and green component as Vector3
     */
    bag: Vector3;

    /**
     * the alpha, red and green component as Vector3
     */
    arg: Vector3;
    /**
     * the alpha, red and blue component as Vector3
     */
    arb: Vector3;
    /**
     * the alpha, green and red component as Vector3
     */
    agr: Vector3;
    /**
     * the alpha, green and blue component as Vector3
     */
    agb: Vector3;
    /**
     * the alpha, blue and red component as Vector3
     */
    abr: Vector3;
    /**
     * the alpha, blue and green component as Vector3
     */
    abg: Vector3;
}
export interface Vector4 extends BaseVector4WithAccessors {
    plus(other: Vector4): Vector4;
    times(scalar: number): Vector4;
    minus(other: Vector4): Vector4;
    normalize(): Vector4;
}

const extendVector = (v: BaseVector) => {
    return new Proxy(v, {
        get: (obj, prop: string) => {
            if (obj[prop] !== undefined) {
                return obj[prop];
            } else if (typeof prop === "string") {
                if (prop.length > 1 && prop.match(/[xyz]{2,3}|[rgba]{2,4}/)) {
                    let names = prop.split("");
                    let values = names.map((name) => obj[name]);
                    return vector(...values);
                } else if (prop.match(/\d+/)) {
                    return obj.get(parseInt(prop, 10));
                }
            }
        },
        set: (obj, prop: string, value: any, receiver: any) => {
            if (typeof prop === "string") {
                if (prop.length > 1 && prop.match(/[xyz]{2,3}|[rgba]{2,4}/)) {
                    let names = prop.split("");
                    names.forEach((name, index) => {
                        obj[name] = value[index];
                    });
                    return true;
                } else if (prop.match(/\d+/)) {
                    obj.set(parseInt(prop, 10), value);
                    return true;
                }
            }
            return Reflect.set(obj, prop, value, receiver);
        },
    });
};

export const vector = (...components: number[]): Vector => {
    switch (components.length) {
        case 2:
            return vector2(...components);
        case 3:
            return vector3(...components);
        case 4:
            return vector4(...components);
        default:
            return extendVector(new BaseVector(...components)) as Vector;
    }
};

export const vector2 = (...components: number[]): Vector2 => {
    if (components.length !== 2) {
        throw new Error("vector2 expected 2 components");
    }
    let v2 = new RealVector2(...components);
    return extendVector(v2) as Vector2;
};

export const vector3 = (...components: number[]): Vector3 => {
    if (components.length !== 3) {
        throw new Error("vector3 expected 3 components");
    }
    return extendVector(new BaseVector3(...components)) as Vector3;
};

export const vector4 = (...components: number[]): Vector4 => {
    if (components.length !== 4) {
        throw new Error("vector4 expected 4 components");
    }
    return extendVector(new BaseVector4(...components)) as Vector4;
};

export default vector;
