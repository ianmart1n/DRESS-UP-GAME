# DRESS UP GAME

Made by IAN MARTIN for _Whose Please is it Anyway?_

Based on Collar Me Impressed by Sweetheart Squad.

Coding help from Sean S. Leblanc.

Music by Kevin Macleod.

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
