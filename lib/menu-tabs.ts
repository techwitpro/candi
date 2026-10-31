import type { MenuTabId } from "./content";

/** Default tab panel matches the Figma artboard (six items in two columns). */
export const menuTabPanels: Record<MenuTabId, string[]> = {
  nigiri: [
    "chili-tuna",
    "sake-nigiri",
    "prawn-nigiri",
    "pacific-roll",
    "maki-set",
    "bluefin-maguro",
  ],
  rolls: ["pacific-roll", "bluefin-maguro", "dragon-roll", "garden-roll", "sunrise-roll"],
  sake: ["junmai-sake"],
  maki: ["maki-set", "chili-tuna", "prawn-crunch", "sunrise-roll"],
};
