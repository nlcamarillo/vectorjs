const createIterator = (v: BaseVector) => {
    return function*() {
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
        return `Vector[${this.components.join(",")}]`;
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
     * heck whether a vector equals another
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
    public dot(other: Vector) {
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
    public plus(other: Vector) {
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
    public times(scalar: number) {
        return vector(...this.components.map(c => c * scalar));
    }
    /**
     * subtracts another vector from this one
     */
    public minus(other: Vector) {
        return this.plus(other.times(-1));
    }
    /**
     * normalizes the vector to length 1 or 0 if it was already 0
     */
    public normalize() {
        let n = this.norm();
        if (n === 0) return this;
        return this.times(1 / n);
    }
    public ⵙ = this.dot;
    public ⵜ = this.plus;
    public ᜭ = this.minus;
    public х = this.times;
}

class BaseVector2 extends BaseVector {
    get x() {
        return this.components[0];
    }
    set x(value: number) {
        this.components[0] = value;
    }
    get y() {
        return this.components[1];
    }
    set y(value: number) {
        this.components[1] = value;
    }
}
class BaseVector3 extends BaseVector2 {
    get z() {
        return this.components[2];
    }
    set z(value: number) {
        this.components[2] = value;
    }
    get r() {
        return this.components[0];
    }
    set r(value: number) {
        this.components[0] = value;
    }
    get g() {
        return this.components[1];
    }
    set g(value: number) {
        this.components[1] = value;
    }
    get b() {
        return this.components[2];
    }
    set b(value: number) {
        this.components[2] = value;
    }
}
class BaseVector4 extends BaseVector3 {
    get a() {
        return this.components[3];
    }
    set a(value: number) {
        this.components[3] = value;
    }
}

export interface Vector extends BaseVector {}
export interface Vector2 extends BaseVector2 {
    xy: Vector;
    xz: Vector;
    yx: Vector;
    yz: Vector;
    zx: Vector;
    zy: Vector;
}
export interface Vector3 extends Vector2, BaseVector3 {
    rg: Vector;
    rb: Vector;
    gr: Vector;
    gb: Vector;
    br: Vector;
    bg: Vector;

    rgb: Vector;
    rbg: Vector;

    grb: Vector;
    gbr: Vector;

    brg: Vector;
    bgr: Vector;
}

export interface Vector4 extends Vector3, BaseVector4 {
    ra: Vector;
    ga: Vector;
    ba: Vector;
    ar: Vector;
    ag: Vector;
    ab: Vector;

    rga: Vector;
    rba: Vector;
    rag: Vector;
    rab: Vector;

    gra: Vector;
    gba: Vector;
    gar: Vector;
    gab: Vector;

    bra: Vector;
    bga: Vector;
    bar: Vector;
    bag: Vector;

    arg: Vector;
    arb: Vector;
    agr: Vector;
    agb: Vector;
    abr: Vector;
    abg: Vector;
}

const extendVector = (v: BaseVector) => {
    return new Proxy(v, {
        get: (obj, prop: string) => {
            if (obj[prop]) {
                return obj[prop];
            } else if (typeof prop === "string") {
                if (prop.length > 1 && prop.match(/[xyz]+|[rgba]+/)) {
                    let names = prop.split("");
                    let values = names.map(name => obj[name]);
                    return vector(...values);
                } else if (prop.match(/\d+/)) {
                    return obj.get(parseInt(prop, 10));
                }
            }
        },
        set: (obj, prop: string, value: any, receiver: any) => {
            if (typeof prop === "string") {
                if (prop.length > 1 && prop.match(/[xyz]+|[rgba]+/)) {
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
        }
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
    return extendVector(new BaseVector2(...components)) as Vector2;
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
