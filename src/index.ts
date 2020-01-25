class BaseVector {
    protected components: number[];
    constructor(..._components: number[]) {
        this.components = _components;
    }
    public toArray(): number[] {
        return this.components;
    }
    public get(index: number) {
        return this.components[index];
    }
    public get size(): number {
        return this.components.length;
    }
    public equals(other: Vector): boolean {
        let o = other.toArray();
        return this.components.every((c, i) => c === o[i]);
    }
    public n2(): number {
        return this.components.reduce((sum, c) => sum + c * c, 0);
    }
    public norm(): number {
        return Math.sqrt(this.n2());
    }
    public dot(other: Vector) {
        if (other.size !== this.size) {
            throw new Error(
                `can only dot product vectors of same size, got ${this.size} and ${other.size}`
            );
        }
        let o = other.toArray();
        return this.components.reduce((sum, c, i) => sum + c * o[i], 0);
    }
    public plus(other: Vector) {
        if (other.size !== this.size) {
            throw new Error(
                `can only dot product vectors of same size, got ${this.size} and ${other.size}`
            );
        }
        let o = other.toArray();
        return vector(...this.components.map((c, i) => c + o[i]));
    }
    public times(scalar: number) {
        return vector(...this.components.map(c => c * scalar));
    }
    public minus(other: Vector) {
        return this.plus(other.times(-1));
    }
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
    get y() {
        return this.components[1];
    }
}
class BaseVector3 extends BaseVector2 {
    get z() {
        return this.components[2];
    }
    get r() {
        return this.components[0];
    }
    get g() {
        return this.components[1];
    }
    get b() {
        return this.components[2];
    }
}
class BaseVector4 extends BaseVector3 {
    get a() {
        return this.components[3];
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
            // console.log("getting", prop, "from", obj);
            if (obj[prop]) {
                return obj[prop];
            } else if (prop.length > 1 && prop.match(/[xyz]+|[rgba]+/)) {
                let names = prop.split("");
                let values = names.map(name => obj[name]);
                return new BaseVector(...values);
            }
        }
    });
};

export const vector = (...components: number[]): Vector => {
    return extendVector(new BaseVector(...components)) as Vector;
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
