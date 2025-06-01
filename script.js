// Initialize PIXI.js renderer and stage
let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x70d9ff, // Background color
    resolution: window.devicePixelRatio || 1
});

// Append the PIXI canvas to the background div
document.getElementById("background").appendChild(app.view);

// Load the image for pixelation
let imageUrl = "/assets/websiteBG";  // Replace with your image URL
let image = new Image();
image.src = imageUrl;
image.onload = function() {
    // Once the image is loaded, create a PIXI texture from it
    let texture = PIXI.Texture.from(image);

    // Set up a grid of sprites (pixels) for pixelation
    let gridRows = 64; // Number of rows
    let gridCols = 64; // Number of columns
    let spriteWidth = image.width / gridCols;
    let spriteHeight = image.height / gridRows;

    // Create a container for the grid of sprites
    let container = new PIXI.Container();
    app.stage.addChild(container);

    // Create the pixelated grid (each pixel is a sprite)
    for (let i = 0; i < gridCols; i++) {
        for (let j = 0; j < gridRows; j++) {
            let sprite = new PIXI.Sprite(texture);

            // Crop the texture to create individual "pixels"
            sprite.texture.frame = new PIXI.Rectangle(i * spriteWidth, j * spriteHeight, spriteWidth, spriteHeight);

            // Position the sprite on the grid
            sprite.x = i * spriteWidth;
            sprite.y = j * spriteHeight;

            // Add the sprite to the container
            container.addChild(sprite);
        }
    }

    // Make sure the container is responsive to window resizing
    window.addEventListener("resize", function() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    // Mouse interaction - zoom in/out pixels based on mouse movement
    let mouseSensitivity = 0.1;
    let zoomFactor = 1;

    app.stage.interactive = true;
    app.stage.on('mousemove', (e) => {
        let mouseX = e.data.global.x;
        let mouseY = e.data.global.y;

        // Apply some zoom effect to the pixels based on mouse position
        zoomFactor = 1 + (mouseX / window.innerWidth * mouseSensitivity);

        // Update the scale of the sprites based on the zoom factor
        container.children.forEach(sprite => {
            sprite.scale.set(zoomFactor);
        });
    });
};
