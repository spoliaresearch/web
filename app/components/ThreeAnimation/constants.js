// List of images to load from three_images folder
export const IMAGE_PATHS = [
  "/three_images/05.jpg",
  "/three_images/DSC02213-2.jpg",
  "/three_images/DSCF1215.jpg",
  "/three_images/IMG_7810.jpeg",
  "/three_images/MotionPicturesFigure1.jpg",
  "/three_images/MotionPicturesFigure3.jpg",
  "/three_images/pasted-movie.png",
  "/three_images/pasted-movie-2.png",
  "/three_images/pasted-movie-3.png",
  "/three_images/pasted-movie-4.png",
  "/three_images/pasted-movie-5.png",
  "/three_images/pasted-movie-6.png",
  "/three_images/pasted-movie-7.png",
  "/three_images/pasted-movie-8.png",
  "/three_images/pasted-movie-9.png",
  "/three_images/pasted-movie-10.png",
  "/three_images/pasted-movie-11.png",
  "/three_images/pasted-movie-12.png",
  "/three_images/Screenshot 2024-02-24 at 17.13.49.png",
  "/three_images/Screenshot 2024-03-07 at 10.22.12 AM.png",
  "/three_images/Screenshot 2025-01-29 at 2.08.49 PM.png",
  "/three_images/Screenshot 2025-01-29 at 2.09.10 PM.png",
  "/three_images/Vercoe, Garrett_1.png",
  "/three_images/07_BEACON_FRONT (1).png",
];

// Layout configuration
export const LAYOUT_CONFIG = {
  radius: 4, // Reduced radius for tighter circle with more overlap
  spacing: 2.5, // Reduced spacing for more overlap
};

// Animation configuration
export const ANIMATION_CONFIG = {
  imageScaleDuration: 400, // Base duration for image scale animation
  imageScaleDelay: 20, // Delay increment between images
  cursorOffset: 0.64, // Max cursor offset for images
};

// Animation phases and timing
export const ANIMATION_PHASES = {
  CIRCULAR: "circular",
  SCATTERED: "scattered",
};

export const PHASE_TIMING = {
  initialDelay: 2000, // Wait 2 seconds after initial load
  transitionDelay: 1000, // Wait 1 second before switching to scattered
};

// Camera configuration
export const CAMERA_CONFIG = {
  position: [0, 0, 20],
  fov: 60,
};

// Scene configuration
export const SCENE_CONFIG = {
  backgroundColor: "#302C1E",
};
