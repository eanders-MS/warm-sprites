namespace warm {
    export enum TransformMode {
        Normal, OnlyTranslation, NoRotationOrReflection, NoScale, NoScaleOrReflection
    }

    /**
     * A Transform is a set of affine transformations to be performed on a Vec2: translation, rotation, and scale. TODO: Add shear.
     * A Transform can have a parent Transform.
     */
    export class Transform {
        private localPos_: Vec2;
        private localRot_: number;
        private localScl_: Vec2;
        private parent_: Transform;
        private children_: Transform[];
        private dirty_: boolean;
        private worldPos_: Vec2;
        private worldRot_: number;
        private worldScl_: Vec2;
        public tag: string;

        public get dirty(): boolean {
            return this.dirty_;
        }
        public set dirty(v) {
            this.dirty_ = v;
            if (v) { this.children_.forEach(c => c.dirty = true); }
        }

        public get worldPos() {
            if (this.dirty) { this.recalc(); }
            return this.worldPos_;
        }
        public get worldRot() {
            if (this.dirty) { this.recalc(); }
            return this.worldRot_;
        }
        public get worldScl() {
            if (this.dirty) { this.recalc(); }
            return this.worldScl_;
        }

        public get localPos(): Vec2 { return this.localPos_; }
        public set localPos(v: Vec2) {
            this.localPos_.copyFrom(v);
        }

        public get localRot() { return this.localRot_; }
        public set localRot(v: number) {
            this.dirty = this.dirty_ || this.localRot_ !== v;
            this.localRot_ = v;
        }

        public get localScl() { return this.localScl_; }
        public set localScl(v: Vec2) {
            this.localScl_.copyFrom(v);
        }

        public get parent() { return this.parent_; }
        public set parent(p: Transform) {
            if (p === this.parent_) return;
            if (this.parent_) { this.parent_.unregChild(this); }
            if (p) { p.regChild(this); }
            this.parent_ = p;
            this.dirty = true;
        }

        constructor() {
            this.children_ = [];
            this.localPos_ = new Vec2();
            this.localRot_ = 0;
            this.localScl_ = new Vec2(1, 1);
            this.localPos_.onChanged(() => this.dirty = true);
            this.localScl_.onChanged(() => this.dirty = true);
            this.worldPos_ = new Vec2();
            this.worldRot_ = 0;
            this.worldScl_ = new Vec2(1, 1);
            this.dirty_ = true;
        }

        public regChild(t: Transform) {
            this.children_.push(t);
        }
        public unregChild(t: Transform) {
            this.children_ = this.children_.filter(c => c !== t);
        }

        public copyFrom(src: Transform): this {
            this.localPos.copyFrom(src.localPos);
            this.localRot = src.localRot;
            this.localScl.copyFrom(src.localScl);
            return this;
        }

        public clone(): Transform {
            const aff = new Transform();
            aff.copyFrom(this);
            return aff;
        }

        public recalc(force = false) {
            if (this.dirty || force) {
                this.dirty = false;
                if (this.parent) {
                    const ppos = this.parent.worldPos;
                    const prot = this.parent.worldRot;
                    const pscl = this.parent.worldScl;
                    Vec2.MulToRef(this.localScl, pscl, this.worldScl_);
                    this.worldRot_ = prot + this.localRot_;
                    // Yes, I know I *could* use a matrix for this.
                    // I'm lazy and don't want to make a Mat3x3 class.
                    Vec2.MulToRef(this.localPos, this.worldScl_, this.worldPos_);
                    Vec2.RotateToRef(this.worldPos_, this.parent.worldRot, this.worldPos_);
                    Vec2.TranslateToRef(this.worldPos_, ppos, this.worldPos_);
                } else {
                    this.worldScl_ = this.localScl_;
                    this.worldRot_ = this.localRot_;
                    Vec2.MulToRef(this.localPos, this.worldScl_, this.worldPos_);
                }
            }
        }

        public transformToRef(v: Vec2, ref: Vec2, transformMode = TransformMode.Normal): Vec2 {
            Vec2.MulToRef(v, this.worldScl, ref);
            Vec2.RotateToRef(ref, this.worldRot, ref);
            Vec2.TranslateToRef(ref, this.worldPos, ref);
            return ref;
        }
    }
}
