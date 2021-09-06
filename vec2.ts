namespace warm.math {
    export function sign(v: number): number {
        return v >= 0 ? 1 : -1;
    }
    export function signum(v: number): number {
        if (v > 0) return 1;
        if (v < 0) return -1;
        return 0;
    }
    export function sin(a: number): number {
        return Math.sin(a * Math.PI / 180);
    }
    export function cos(a: number): number {
        return Math.cos(a * Math.PI / 180);
    }
}
namespace warm {
    export class Vec2 {
        public readonly: boolean;
        private changed: () => void;

        public get x() { return this.x_; }
        public set x(v: number) {
            if (this.readonly) throw "hey";
            const dirty = this.x_ !== v;
            this.x_ = v;
            if (dirty) { this.changed(); }
        }
        public get y() { return this.y_; }
        public set y(v: number) {
            if (this.readonly) throw "hey";
            const dirty = this.x_ !== v;
            this.y_ = v;
            if (dirty) { this.changed(); }
        }

        constructor(public x_ = 0, public y_ = 0) {
            this.changed = () => { };
        }

        public onChanged(handler: () => void) {
            this.changed = handler;
        }

        public clone(): Vec2 {
            return new Vec2(this.x, this.y);
        }

        public copyFrom(v: Vec2): this {
            this.x = v.x;
            this.y = v.y;
            return this;
        }

        public set(x: number, y: number): this {
            this.x = x;
            this.y = y;
            return this;
        }

        public magSq(): number {
            return this.x * this.x + this.y * this.y;
        }

        public mag(): number {
            return Math.sqrt(this.magSq());
        }

        public floor(): this {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this;
        }

        public add(v: Vec2): this {
            this.x = this.x * v.x;
            this.y = this.y * v.y;
            return this;
        }

        public static ZeroToRef(ref: Vec2): Vec2 {
            return ref.set(0, 0);
        }

        public static RotateToRef(v: Vec2, angle: number, ref: Vec2): Vec2 {
            const s = math.sin(angle);
            const c = math.cos(angle);
            const xp = v.x * c - v.y * s;
            const yp = v.x * s + v.y * c;
            ref.x = xp;
            ref.y = yp;
            return ref;
        }

        public static TranslateToRef(v: Vec2, p: Vec2, ref: Vec2): Vec2 {
            ref.x = v.x + p.x;
            ref.y = v.y + p.y;
            return ref;
        }

        public static ScaleToRef(v: Vec2, scale: number, ref: Vec2): Vec2 {
            ref.x = v.x * scale;
            ref.y = v.y * scale;
            return ref;
        }

        public static FloorToRef(v: Vec2, ref: Vec2): Vec2 {
            ref.x = Math.floor(v.x);
            ref.y = Math.floor(v.y);
            return ref;
        }

        public static SetLengthToRef(v: Vec2, len: number, ref: Vec2): Vec2 {
            Vec2.NormalizeToRef(v, ref);
            Vec2.ScaleToRef(ref, len, ref);
            return ref;
        }

        public static NormalizeToRef(v: Vec2, ref: Vec2): Vec2 {
            const lenSq = v.magSq();
            if (lenSq !== 0) {
                const len = Math.sqrt(lenSq);
                ref.x = v.x / len;
                ref.y = v.y / len;
            }
            return ref;
        }

        public static MaxToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = Math.max(a.x, b.x);
            ref.y = Math.max(a.y, b.y);
            return ref;
        }

        public static MinToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = Math.min(a.x, b.x);
            ref.y = Math.min(a.y, b.y);
            return ref;
        }

        public static SubToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = a.x - b.x;
            ref.y = a.y - b.y;
            return ref;
        }

        public static AddToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = a.x + b.x;
            ref.y = a.y + b.y;
            return ref;
        }

        public static MulToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = a.x * b.x;
            ref.y = a.y * b.y;
            return ref;
        }

        public static DivToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = b.x !== 0 ? a.x / b.x : 0;
            ref.y = b.y !== 0 ? a.y / b.y : 0;
            return ref;
        }

        public static AbsToRef(v: Vec2, ref: Vec2): Vec2 {
            ref.x = Math.abs(v.x);
            ref.y = Math.abs(v.y);
            return ref;
        }

        public static InvToRef(s: number, v: Vec2, ref: Vec2): Vec2 {
            ref.x = v.x !== 0 ? s / v.x : 0;
            ref.y = v.y !== 0 ? s / v.y : 0;
            return ref;
        }

        public static SignToRef(v: Vec2, ref: Vec2): Vec2 {
            ref.x = math.sign(v.x);
            ref.y = math.sign(v.y);
            return ref;
        }

        public static SignumToRef(v: Vec2, ref: Vec2): Vec2 {
            ref.x = math.signum(v.x);
            ref.y = math.signum(v.y);
            return ref;
        }

        public static RandomRangeToRef(xmin: number, xmax: number, ymin: number, ymax: number, ref: Vec2): Vec2 {
            ref.x = Math.randomRange(xmin, xmax);
            ref.y = Math.randomRange(ymin, ymax);
            return ref;
        }

        public static Dot(a: Vec2, b: Vec2): number {
            return a.x * b.y + a.y * b.x;
        }

        public static Edge(a: Vec2, b: Vec2, c: Vec2): number {
            return (c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x);
        }

        public static MinOfToRef(arr: Vec2[], ref: Vec2): Vec2 {
            ref.x = 10000;
            ref.y = 10000;
            for (const v of arr) {
                if (v.x < ref.x) { ref.x = v.x; }
                if (v.y < ref.y) { ref.y = v.y; }
            }
            return ref;
        }

        public static MaxOfToRef(arr: Vec2[], ref: Vec2): Vec2 {
            ref.x = -10000;
            ref.y = -10000;
            for (const v of arr) {
                if (v.x > ref.x) { ref.x = v.x; }
                if (v.y > ref.y) { ref.y = v.y; }
            }
            return ref;
        }
    }
}
