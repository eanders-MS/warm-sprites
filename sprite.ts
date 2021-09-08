namespace warm {
    const SCREEN_HALF_WIDTH = screen.width >> 1;
    const SCREEN_HALF_HEIGHT = screen.height >> 1;

    export class Sprite extends scene.Renderable {
        private xfrm_: Transform;
        private src: Vec2[]; // const
        private verts: Vec2[];

        public get xfrm() { return this.xfrm_; }

        constructor(private img: Image, z: number = scene.SPRITE_Z) {
            super(
                (_1, _2) => {},
                () => true,
                z);
            this.xfrm_ = new Transform();
            this.setImage(img);
        }

        public setImage(img: Image) {
            this.img = img;
            const w2 = img.width / 2;
            const h2 = img.height / 2;
            // Vertices in clockwise order
            this.src = [
                new Vec2(-w2, -h2),
                new Vec2(w2, -h2),
                new Vec2(w2, h2),
                new Vec2(-w2, h2),
            ];
            this.verts = this.src.map(v => v.clone());
        }

        __update(camera: scene.Camera, _2: any) {
            for (let i = 0; i < this.src.length; ++i) {
                this.xfrm_.transformToRef(this.src[i], this.verts[i]);
                this.verts[i].x = camera.drawOffsetX + SCREEN_HALF_WIDTH + this.verts[i].x;
                this.verts[i].y = camera.drawOffsetY + SCREEN_HALF_HEIGHT + this.verts[i].y;
            }
        }

        __drawCore(_1: any) {
            screen.drawQuad(
                this.img,
                Math.floor(this.verts[0].x),
                Math.floor(this.verts[0].y),
                Math.floor(this.verts[1].x),
                Math.floor(this.verts[1].y),
                Math.floor(this.verts[2].x),
                Math.floor(this.verts[2].y),
                Math.floor(this.verts[3].x),
                Math.floor(this.verts[3].y));
        }
    }
}
