 

# HACK 2021 "Cool Sprites" Extension for Arcade

I should have named this **quad sprites**. This extension defines a new kind of **Sprite** that renders itself using a native method called `drawQuad`. `drawQuad` is a generalized rendering method that can rasterize a sprite at any rotation, scale, and quadrilateral shape (trapazoid, parallelogram, rhombus, etc). *It doesn't care.*

This extension also defines a **Transform** class for use with the new Sprite type, allowing the sprite to be freely **scaled**, **translated**, and **rotated**.

Transforms can be **parented**, allowing one sprite to be the **parent** of another. The **child** sprite will inherit movement, rotation, and scale from the parent, and add its own. You can think of it as being like the relationship between your arms and your body; whenever your body moves, your arms also move. They inherit the movement characteristics from the thing they're attached to.

`drawQuad` implementation is here: https://github.com/microsoft/pxt-common-packages/commit/152a418ededefc191d0e608521732ea5169cdcfa

**NOTE**: This extension must be used with a version of Arcade that includes the `drawQuad` function, like this one: https://arcade.makecode.com/app/7ae712dd21ba79dc363df2b2a802237a110571a2-2f277d2e1b

See the [demos](./demos) folder for some demos you can import into the above target, and see cool sprites in action!

![cool cow](./demos/arcade-cool-cow-hack-2021.png)
![cool ducks](./demos/arcade-cool-ducks-hack-2021.png)
![cool galaga bug](./demos/arcade-cool-galaga-bug-hack-2021.png)
![cool orrery](./demos/arcade-cool-orrery-hack-2021.png)
