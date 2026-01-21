import createGlobe from 'cobe';

let phi = 0;
let globe = null;

// City coordinates [latitude, longitude]
// Neon green: rgb(0, 255, 136) = [0, 1, 0.533] normalized
const cities = [
    { name: 'Sydney', coords: [-33.8688, 151.2093], color: [0, 1, 0.533] },
    { name: 'London', coords: [51.5074, -0.1278], color: [0, 1, 0.533] },
    { name: 'Warsaw', coords: [52.2297, 21.0122], color: [0, 1, 0.533] },
    { name: 'Guadalajara', coords: [20.6597, -103.3496], color: [0, 1, 0.533] }
];

// Convert lat/lng to radians and correct format for COBE
const formatMarkers = (cities) => {
    return cities.map(city => ({
        location: [city.coords[0], city.coords[1]],
        size: 0.08,
        color: city.color
    }));
};

export function initGlobe(canvasElement) {
    if (!canvasElement) return;

    // Destroy existing globe if any
    if (globe) {
        globe.destroy();
    }

    globe = createGlobe(canvasElement, {
        devicePixelRatio: 1.5, // Reduced for better performance
        width: canvasElement.clientWidth * 2,
        height: canvasElement.clientHeight * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 12000, // Reduced for better performance
        mapBrightness: 6,
        baseColor: [0.05, 0.1, 0.05], // Darker green tint
        markerColor: [0, 1, 0.533], // Neon green
        glowColor: [0, 0.4, 0.2], // Green glow
        markers: formatMarkers(cities),
        onRender: (state) => {
            // Auto-rotate (faster)
            state.phi = phi;
            phi += 0.032; // Doubled rotation speed again

            // Auto-update size
            state.width = canvasElement.clientWidth * 2;
            state.height = canvasElement.clientHeight * 2;
        }
    });

    return globe;
}

export function destroyGlobe() {
    if (globe) {
        globe.destroy();
        globe = null;
    }
}

// Handle window resize
export function handleGlobeResize(canvasElement) {
    if (!canvasElement || !globe) return;

    // COBE handles resize internally via onRender
    // Just trigger a re-render
    canvasElement.style.width = '100%';
    canvasElement.style.height = '100%';
}
