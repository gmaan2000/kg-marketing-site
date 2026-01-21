// Flickering Grid Background Effect
let gridSquares = [];
const GRID_SIZE = 50; // matches CSS grid size
const FLICKER_INTERVAL = 200; // ms between flicker updates (halved speed)
const ACTIVE_SQUARES = 20; // number of squares lit at once

export function initFlickeringGrid() {
    // Create grid overlay
    const gridContainer = document.createElement('div');
    gridContainer.id = 'flickering-grid';
    gridContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;

    document.body.appendChild(gridContainer);

    // Calculate grid dimensions
    const cols = Math.ceil(window.innerWidth / GRID_SIZE);
    const rows = Math.ceil(window.innerHeight / GRID_SIZE);
    const totalSquares = cols * rows;

    // Create grid squares
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        const x = (i % cols) * GRID_SIZE;
        const y = Math.floor(i / cols) * GRID_SIZE;

        square.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${GRID_SIZE}px;
            height: ${GRID_SIZE}px;
            background: transparent;
            transition: background-color 0.3s ease;
        `;

        gridContainer.appendChild(square);
        gridSquares.push(square);
    }

    // Start flickering animation
    startFlickering();

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            gridContainer.remove();
            gridSquares = [];
            initFlickeringGrid();
        }, 250);
    });
}

function startFlickering() {
    setInterval(() => {
        // Reset all squares
        gridSquares.forEach(square => {
            square.style.background = 'transparent';
        });

        // Light up random squares with neon green
        const activeIndices = new Set();
        while (activeIndices.size < ACTIVE_SQUARES) {
            activeIndices.add(Math.floor(Math.random() * gridSquares.length));
        }

        activeIndices.forEach(index => {
            const square = gridSquares[index];
            const intensity = 0.1 + Math.random() * 0.15; // 0.1 to 0.25
            square.style.background = `rgba(0, 255, 136, ${intensity})`;
        });
    }, FLICKER_INTERVAL);
}
