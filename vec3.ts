namespace warm {
    export class Vec3 {
        public get x() { return this.x_; }
        public set x(v) { this.x_ = v; }
        public get y() { return this.y_; }
        public set y(v) { this.y_ = v; }
        public get z() { return this.z_; }
        public set z(v) { this.z_ = v; }
        constructor(
            public x_ = 0,
            public y_ = 0,
            public z_ = 0
        ) { }
        public set(x: number, y: number, z: number): this {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
        public static ZeroToRef(ref: Vec3): Vec3 {
            return ref.set(0, 0, 0);
        }
    }
}
