// Centralized image index for all projects
// Format: { filename: { number: "project.index.order", alt: "optional description" } }

export const imageIndex = {
  // Beacons Project (2.2.1)
  "beacons_wide": {
    number: "2.2.1.1",
    alt: ""
  },
  "Spolia_Beam_DEMO2025_4": {
    number: "2.2.1.2",
    alt: ""
  },
  "Spolia_Beam_DEMO2025_3": {
    number: "2.2.1.3",
    alt: ""
  },
  "image 93": {
    number: "2.2.1.4",
    alt: ""
  },
  "rock-tether": {
    number: "2.2.1.5",
    alt: ""
  },
  "ccz-zone2": {
    number: "2.2.1.6",
    alt: ""
  },
  "TESTINGEXPORT2": {
    number: "2.2.1.7",
    alt: ""
  },
  "plume": {
    number: "2.2.1.8",
    alt: ""
  },
  "ECO_CCZ": {
    number: "2.2.1.9",
    alt: ""
  },
  "chladni_example": {
    number: "2.2.1.10",
    alt: ""
  },
  "Spolia_Beam_DEMO2025_6": {
    number: "2.2.1.11",
    alt: ""
  },
  "Beacons_Screen": {
    number: "2.2.1.12",
    alt: ""
  },
  "Spolia_Beam_DEMO2025_1": {
    number: "2.2.1.13",
    alt: ""
  },
  "Spolia_Beam_DEMO2025_2": {
    number: "2.2.1.14",
    alt: ""
  },
  "DSCF4637": {
    number: "2.2.1.15",
    alt: ""
  },
  "DSCF4685-2": {
    number: "2.2.1.16",
    alt: ""
  },

  // Pixelframe Project (2.1.2)
  "PF-Map": {
    number: "2.1.2.1",
    alt: ""
  },
  "PF-Globe": {
    number: "2.1.2.2",
    alt: ""
  },
  "PF-Em-G": {
    number: "2.1.2.3",
    alt: ""
  },
  "PF-Beam-full": {
    number: "2.1.2.4",
    alt: ""
  },
  "IMG_4980": {
    number: "2.1.2.5",
    alt: ""
  },
  "IMG_4652": {
    number: "2.1.2.6",
    alt: ""
  },
  "PF-Scan": {
    number: "2.1.2.7",
    alt: ""
  },
  "IMG_5097": {
    number: "2.1.2.8",
    alt: ""
  },
  "PF-A-Tower": {
    number: "2.1.2.9",
    alt: ""
  },
  "PF-AR": {
    number: "2.1.2.10",
    alt: ""
  },
  "PF-Em-S": {
    number: "2.1.2.11",
    alt: ""
  },
  "RFID_Scan": {
    number: "2.1.2.12",
    alt: ""
  },
  "PF-Anim": {
    number: "2.1.2.13",
    alt: ""
  },

  // Symlink Project (2.1.1)
  "30_Symlink_full": {
    number: "2.1.1.1",
    alt: ""
  },
  "symlink_1": {
    number: "2.1.1.2",
    alt: ""
  },
  "symlink_3": {
    number: "2.1.1.3",
    alt: ""
  },
  "symlink_2": {
    number: "2.1.1.4",
    alt: ""
  },
  "symlink_6": {
    number: "2.1.1.5",
    alt: ""
  },
  "symlink_5": {
    number: "2.1.1.6",
    alt: ""
  },
  "symlink_8": {
    number: "2.1.1.7",
    alt: ""
  },
  "C4070DA2-114A-4FC5-9B8F-FADC7DF4819F": {
    number: "2.1.1.8",
    alt: ""
  },
  "D92FEB6B-CFAD-4CB9-8C20-FEAEE558C945": {
    number: "2.1.1.9",
    alt: ""
  },
  "1909AFA5-D32F-4C0E-BBC5-9E7DA5B520AA": {
    number: "2.1.1.10",
    alt: ""
  },
  "symlink_4": {
    number: "2.1.1.11",
    alt: ""
  }
};

// Helper function to get image metadata by filename
export function getImageMetadata(filename) {
  // Strip path and extension to match the key
  const basename = filename.split('/').pop().replace(/\.(jpg|jpeg|png|webp|avif|mp4|webm)$/i, '');
  return imageIndex[basename] || { number: "", alt: "" };
}

// Helper function to extract filename from src
export function extractFilename(src) {
  if (!src) return "";
  // Remove leading slash and path
  const filename = src.replace(/^\//, '').split('/').pop();
  // Remove extension
  return filename.replace(/\.(jpg|jpeg|png|webp|avif|mp4|webm)$/i, '');
}

