# DRESS UP GAME

based on Collar Me Impressed

## Setup

```sh
npm i
```

## Development

```sh
npm start
```

## Build

```sh
npm run build
```

## Data format

Source assets are placed in `/assets`, and include:

- `/audio/bgm.mp3`: looping background music
- `/audio/btn.mp3`: sound effect played when buttons are pressed
- `/audio/drop.mp3`: sound effect played when draggable item is dropped
- `/audio/pickup.mp3`: sound effect played when draggable item is picked up
- `/img/mouse/mouse_down.png`: texture for mouse when pressed down
- `/img/mouse/mouse_over.png`: texture for mouse when hovering over UI
- `/img/mouse/mouse_up.png`: texture for mouse in normal state
- `/img/arrow.png`: texture for cycle layer "next" arrow
- `/img/arrow_flipped.png`: texture for cycle layer "previous" arrow
- `/img/save.png`: texture for save button
- `/img/*.png`: any other textures referenced in `config.json`
- `/filters/*.glsl`: any fragment shaders referenced in `config.json`

Note that the center of the mouse images are used as the pointer; you can include transparent padding on the top-left to offset this for a more traditional pointer.

### `config.json`

```jsonc
{
	// resolution in pixels
	"size": {
		"x": 720,
		"y": 480
	},
	// scale mode (one of either "fit", "cover", "multiples", or "none")
	"scaleMode": "fit",
	// all layers and items have optional `x` and `y` attributes,
	// which set their position (as an offset from their parent)
	// they default to zero if not provided
	// they also have `scale`, which defaults to one
	"layers": {
		"static-example": {
			// static layers will simply render all items,
			// and offer no interaction
			// these can be used to create persistent decorative elements
			// if `ui` is set to `true`, this layer will be hidden when saved
			"type": "static",
			"x": 0.5,
			"y": 0.5,
			"data": {
				"ui": false,
				"items": [
					{
						"spr": "texture-name",
						"x": 0,
						"y": 0
					}
				]
			}
		},
		"animated-example": {
			// animated layers will automatically loop through each item as a frame of animation
			// and offer no interaction
			// these can be used to create persistent decorative elements
			// if `ui` is set to `true`, this layer will be hidden when saved
			"type": "static",
			"x": 0.5,
			"y": 0.5,
			"data": {
				"ui": false,
				"speed": 1,
				"items": [
					{
						"spr": "texture-name"
					}, {
						"spr": "texture-name"
					}
				]
			}
		},
		"cycle-example": {
			// cycle layers will render a single item,
			// along with next/previous arrows which cycle through the rest
			"type": "cycle",
			"x": 0.5,
			"y": 0.5,
			"data": {
				"arrowX": 0,
				"arrowY": 0,
				"arrowGap": 0.5,
				"items": [
					{
						"spr": "texture-name"
					}, {
						"spr": "texture-name"
					}
				]
			}
		},
		"drag-example": {
			// drag-and-drop layers will render all items,
			// each of which will create a draggable copy when selected
			// if an item has the `unique` flag,
			// it will be draggable itself instead of creating copies
			"type": "drag-and-drop",
			"data": {
				"arrowX": 0.1,
				"arrowY": 0.2,
				"arrowGap": 0.5,
				"items": [
					{
						"spr": "texture-name",
						"x": 0.1,
						"y": 0.0
					}, {
						"spr": "texture-name",
						"x": 0.2,
						"y": 0.0,
						"unique": true
					}
				]
			}
		},
		"filter-example": {
			// filter layers are an advanced variation of cycle layers,
			// that apply a filter using the provided fragment shader and uniforms
			// see the filter documentation below for shader details
			"type": "filter",
			"x": 0.5,
			"y": 0.5,
			"data": {
				"arrowX": 0,
				"arrowY": 0,
				"arrowGap": 0.5,
				"filters": [
					{
						"fragment": "shader-name"
					}, {
						"fragment": "shader-name",
						"uniforms": {
							"uniform": 1
						}
					}
				]
			}
		}
	}
}
```

### Filters

Boilerplate for a fragment shader:

```glsl
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float time;
uniform vec2 mouse;

void main(void){
	vec2 uvs = vTextureCoord.xy;
	vec4 rgba = texture2D(uSampler, uvs);
	gl_FragColor = rgba;
}
```

- `vTextureCoord`: the screen texture uvs, automatically provided by Pixi
- `uSampler`: the screen texture sampler, automatically provided by Pixi
- `time`: the time in milliseconds since the start of the game, automatically provided by the project
- `mouse`: the mouse position (top-left -> bottom-right : 0,0 -> 1,1), automatically provided by the project
