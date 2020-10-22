---
title: Simple 3D Text Meshes in Three.js with React-Three-Fiber
date: "2020-10-22T01:05:58.805Z"
description: "The first time I encountered Three.js I was blown away. It was hard to believe that the intricate 3D scenes..."
---

The first time I encountered [Three.js](https://threejs.org/) I was blown away. It was hard to believe that the intricate 3D scenes I was looking at were not videos, they were being rendered directly in the browser! I wanted to make something with it, anything, just to understand what this technology was and where it fit in the ecosystem of HTML, CSS, and JS.

While there were a few exploratory attempts to incorporate Three.js into early iterations of my site, what's left now is the spinning text mesh on my site's [home page](https://ilyameerovich.com). In this post I'll walk through how we can replicate it using Three.js and React, using the amazing [react-three-fiber](https://github.com/pmndrs/react-three-fiber) library.

We'll be making most of what you can see in this [sandbox](https://codesandbox.io/s/recursing-sun-mc2ny), so if you're following along, you'll need a blank React project in order to use the code.

## Background

### Three.js

If you haven't come across Three.js before, it's an API for creating 3D scenes. It sits on top of the WebGL API that ships with most modern browsers, which in turn makes it possible to do GPU-accelerated 3D graphics programming in the browser.

On its own, 3D graphics programming is a colossal field, completely independent of web development, here we'll just focus on a relatively simple example that you can then extend later.

You can get a taste for the traditional flavour of Three.js by checking out the [tutorial](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) in their documentation. The rest of this post will make more sense if you have a read through first.

### React Three Fiber

Since my site is built with Gatsby, which uses React, I was thrilled to discover `react-three-fiber`. This is a package from Paul Henschel, the maker of [`react-spring`](https://www.react-spring.io/) and it allows us to compose Three.js scenes declaratively in the same component-based way that we're used to with React.

As Dan Abramov [explains](https://overreacted.io/how-does-setstate-know-what-to-do/):

> ever since the package split in React 0.14, the react package intentionally only exposes APIs for defining components. Most of the implementation of React lives in the "renderers". `react-dom`, `react-dom/server`, `react-native`, `react-test-renderer`, `react-art` are some examples of renderers (and you can [build your own](https://github.com/facebook/react/blob/master/packages/react-reconciler/README.md#practical-examples))

`react-three-fiber` is just such a renderer - taking JSX and translating it into Three.js code for the canvas.

To give a quick illustrative comparison, if we wanted to add a mesh to our scene, here's how we would do that using the conventional Three.js API\*:

```js
// Create a box geometry
const geometry = new THREE.BoxBufferGeometry(10, 10, 10);

// Create a material
const material = new THREE.MeshStandardMaterial();

// Create a mesh with the defined geometry and material
mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);
```

And then here's how we can achieve the same thing with react-three-fiber:

```js
<mesh>
  <boxBufferGemometry attach='geometry' args={[10, 10, 10]} />
  <meshBasicMaterial attach='material' />
</mesh>
```
##### \* more code is required to make these example into fully working Three.js scenes.

## Setting up our scene

To set up a scene on which we can display meshes we need three things - a scene, a camera, and a renderer. The scene contains all of our meshes, lights, etc., the camera represents the point of view that is perceiving the scene, and the renderer takes in all of that information, then 'decides' what should be rendered in the current frame, and renders everything to the canvas.

For our example, you'll first need to install the dependencies:

```bash
npm i three react-three-fiber
```

We'll import the `Canvas` component from `react-three-fiber` and render it.

The `Canvas` component takes a bunch of props for adjusting the renderer, camera, and other things, but `react-three-fiber` sets [default values](https://inspiring-wiles-b4ffe0.netlify.app/1-canvas) for us, so we don't have to do a thing! 

Our code now should look something like this:

```js
import React from 'react';
import { Canvas } from 'react-three-fiber';

export default function App() {
  return <Canvas></Canvas>;
}
```

## Adding our text mesh

A mesh in Three.js needs at least two properties:
1. a geometry that defines its shape, and 
2. a material that defines how it looks - its colour, how it interacts with lights, shadows, etc.

We are not going to sculpt each glyph from scratch for our text mesh, that would be a lot of work, indeed. 

Instead, we'll use [facetype.js](http://gero3.github.io/facetype.js/) - a service that takes a font file and generates a JSON file representing the coordinates of each in 3D space. We'll pass this JSON file to Three.js and it will construct a geometry for us.

I used a Roboto font file in my example. After getting the JSON file and importing it into my sandbox, we end up with:

```js
import React from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import Roboto from '../Roboto.json';

export default function App() {
  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(Roboto);

  // configure font geometry
  const textOptions = {
    font,
    size: 5,
    height: 1
  };

  return (
    <Canvas
      style={{ height: '100vh', width: '100vw' }} // stretch the canvas to the full viewport size
    >
      <mesh>
        <textGeometry attach='geometry' args={['three.js', textOptions]} />
        <meshStandardMaterial attach='material' />
      </mesh>
    </Canvas>
  );
}
```
And now we should see something on the screen!

There's lots of new code to unpack up there, though, so let's go through what's happening in our component, and then adjust our scene to look more like the example.

We're using the `THREE.FontLoader` class to parse the JSON file and return a [Font](https://threejs.org/docs/#api/en/extras/core/Font) object.

We have an options object where we specify that:
1.  `font` refers to this newly created Font object
2.  Our geometry has an arbitrary size 5,
3.  Our geometry's height is 1, meaning it is extruded an amount of 1. If this value was 0, our mesh would be completely 2D. Increasing this value increases the 'depth' of our glyphs

In our `App` component we return the `Canvas` component from before, but now it has a `mesh` child, which in turn has a geometry and a material. In `react-three-fiber` these attributes are passed in as children.

As far as the `attach` prop, the documentation doesn't explicitly state under what circumstances we must supply it. However, [this comment](https://github.com/pmndrs/react-three-fiber/blob/300b685c1a92a9a0d5029b7fddef3fe3a83d1adb/src/renderer.tsx#L370) and accompanying code indicates that this prop tells the reconciler to attach the component to its parent as whatever the value of `attach` happens to be. We don't have to do too much with this information, as long as we include it when we create geometries and materials, we should be okay.

You'll also note that the `textGeometry` component takes an `args` prop. Here we first pass in the string we want to make into a 3D mesh, and then the options object we created above.

Make sure that your mesh's string is made up of glyphs that are in your JSON font file, otherwise you'll get an error!

## Adjusting position

Right now, you most likely cannot see the entire mesh all at once. To adjust this, you can:

1. Adjust the `size` property of our `textOptions` object
2. Adjust the position of the camera. You can do this by passing in a `camera` prop to the Canvas component, like so: 

```js
...
<Canvas
  camera={{ position: [0, 0, 0] }}
>
...
```
Here, the `position` values correspond to the x, y, and z coordinates, respectively.

3. Adjust the position of your mesh. You can do this by passing in a `position` prop to the `mesh` component, like so:

```js
<mesh position={[0, 0, 0]}>
```
You can guess what these values refer to :)

## Animating

So now we can see our mesh...but it's not doing anything. To make it a little more interesting to look at, we can give it a simple animation and just have it rotate on its axis.

To do that, the first thing we should do is extract the mesh into its own component to make it easier to work with. Here's what our `TextMesh` component will look like:

```js
function TextMesh(props) {
  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(Roboto);

  // configure font geometry
  const textOptions = {
    font,
    size: 3,
    height: 1
  };

  return (
    <mesh position={[-5, 0, -10]}>
      <textGeometry attach='geometry' args={['three.js', textOptions]} />
      <meshStandardMaterial attach='material' />
    </mesh>
  )
}
```
Now, in order to animate it, we need to make sure that the WebGL renderer understands what needs to be changed from frame to frame. So, we will import and use the `useFrame` hook from `react-three-fiber` to specify what updates need to take place before the next frame is rendered. 

All of this will take place inside our `TextMesh` component, so you might be wondering, what exactly is the thing that will be animated? The mesh? The geometry? Well, we're going to be making the updates on a reference to our mesh, and we will get that reference by creating a ref with another React hook, `useRef`.

So now, our updated component can look something like:

```js
function TextMesh(props) {
  const mesh = useRef(null)

  useFrame(() => {
    // animation code goes here
  })

  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(Roboto);

  // configure font geometry
  const textOptions = {
    font,
    size: 3,
    height: 1
  };

  return (
    <mesh position={[-5, 0, -10]} ref={mesh}> 
      <textGeometry attach='geometry' args={['three.js', textOptions]} />
      <meshStandardMaterial attach='material' />
    </mesh>
  )
}
```
We've created a ref and passed it into our `mesh` component. We also have a function that will be called each frame where we will perform our updates. 

If you add the following inside of the `useFrame` callback, you should see some movement!

```js
mesh.current.rotation.x += 0.01
mesh.current.rotation.y += 0.01
mesh.current.rotation.z += 0.01
```
Make sure to also add 

```js
mesh.current.geometry.center
``` 
to ensure that the rotation of the mesh happens around the axis, and not a corner.

## Adding a texture

The last thing I'd like to do is add a texture to our mesh. This means that we'll take a 2D image and stretch it around our mesh like a skin. You could also add different effects by changing the colour and the material so that it will react differently to the light in the scene. Here, we'll limit ourselves to changing the texture.

In general terms, we're going to load in a texture image with a Three.js loader, just as we did with the font. Then, we'll apply that texture to the material.

### Loading the texture

There are plenty of texture images available online. A quick search will turn up hundreds. In this example I'm using a lava texture, but you can use whatever you like. 

First, we'll import the texture into our project. Then we'll use the Three.js texture loader class to turn it into a Texture object.

```js
  import texture from 'path/to/texture.jpg'
  // ...
  const three_texture = new THREE.TextureLoader().load(texture)
```

The next step may vary depending on the texture that you choose. In the code below, we are ensuring that the texture wraps repeatedly both horizontally (wrapS) and vertically (wrapT) over the mesh. We also specify how many times we want the texture to wrap.

```js
three_texture.wrapS = THREE.RepeatWrapping
three_texture.wrapT = THREE.RepeatWrapping
three_texture.repeat.set(0.1, 0.1);
```
For more information on `Texture` properties, the [docs](https://threejs.org/docs/#api/en/textures/Texture) are a great place to start. There are also fascinating explanations [here](https://threejsfundamentals.org/threejs/lessons/threejs-textures.html) and [here](https://discoverthreejs.com/book/first-steps/textures-intro/).

### Applying the texture

The final step in making our texture visible is just to add it to our material. We do this by passing an `args` prop to our material, just as we did with our geometry. The prop will contain an object with a `map` key, and the value is our texture. 

Our material should look like this now: 

```js
<meshBasicMaterial attach='material' args={{ map: three_texture }}/>
```
With that, we should now see the finished product on the screen - an animated 3D text mesh with a texture applied to it. The final code should be similar to this:

```js
import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import Roboto from '../Roboto.json';
import texture from '../lavatile.jpg'
import * as THREE from 'three';

function TextMesh(props) {
  const mesh = useRef(null)

  useFrame(() => {
    mesh.current.rotation.x += 0.01
    mesh.current.rotation.y += 0.01
    mesh.current.rotation.z += 0.01
    mesh.current.geometry.center()
  })

  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(Roboto);

  // configure font geometry
  const textOptions = {
    font,
    size: 10,
    height: 1
  };

  const three_texture = new THREE.TextureLoader().load(texture)
  three_texture.wrapS = THREE.RepeatWrapping
  three_texture.wrapT = THREE.RepeatWrapping
  three_texture.repeat.set(0.1, 0.1);

  return (
    <mesh position={[0, 0, -10]} ref={mesh}>
      <textGeometry attach='geometry' args={['three.js', textOptions]} />
      <meshBasicMaterial attach='material' args={{ map: three_texture }}/>
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas
      style={{
        height: '100vh',
        width: '100vw'
      }}
      camera={{ position: [0, 0, 10] }}
    >
      <TextMesh />
    </Canvas>
  );
}
```
## Conclusion

By building this scene out together we've introduced `react-three-fiber` and its relationship to React. We've learned how to add text meshes to a Three.js scene and animate them. And we talked a tiny bit about textures.

You may have noticed that the code above is different from the [sandbox](https://codesandbox.io/s/recursing-sun-mc2ny) mentioned in the beginning. The differences have much more to do with React than with Three.js _per se_, so the reader is encouraged to extend the example and make it their own.

Not every project calls for 3D graphics to spice it up. But by using Three.js, you're able to achieve a much greater (almost infinite!) range of effects for styling text than is possible with CSS alone. 