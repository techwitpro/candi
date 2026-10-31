import { images } from "./images";

export const navLinks = [
  { label: "Start", href: "#start" },
  { label: "Story", href: "#story" },
  { label: "Explore", href: "#explore" },
  { label: "Dishes", href: "#dishes" },
  { label: "Connect", href: "#connect" },
] as const;

export const categoryItems = [
  { name: "Bluefin", image: images.categoryBluefin },
  { name: "Maki bites", image: images.categoryMaki },
  { name: "Nori tacos", image: images.categoryNori },
  { name: "Sake", image: images.categorySake },
  { name: "Sushi wraps", image: images.categoryWraps },
] as const;

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "featured" | "nigiri" | "rolls" | "sake" | "maki";
  description?: string;
};

export const featuredDishes: MenuItem[] = [
  { id: "sunrise-roll", name: "Sunrise roll", price: 10, image: images.menuSunrise, category: "featured" },
  { id: "amberjack", name: "Amberjack sashimi", price: 8, image: images.menuAmberjack, category: "featured" },
  { id: "prawn-crunch", name: "Prawn crunch roll", price: 10, image: images.menuPrawn, category: "featured" },
  { id: "eel", name: "Eel", price: 8, image: images.menuEel, category: "featured" },
  { id: "dragon-roll", name: "Dragon roll", price: 12, image: images.menuDragon, category: "featured" },
  { id: "garden-roll", name: "Garden roll", price: 8, image: images.menuGarden, category: "featured" },
];

export const menuTabs = [
  { id: "nigiri", label: "Nigiri bites" },
  { id: "rolls", label: "House rolls" },
  { id: "sake", label: "Sake" },
  { id: "maki", label: "Maki bites" },
] as const;

export type MenuTabId = (typeof menuTabs)[number]["id"];

export const menuListItems: MenuItem[] = [
  {
    id: "chili-tuna",
    name: "Chili tuna roll",
    price: 9,
    image: images.listChili,
    category: "nigiri",
    description: "Crisp tempura flakes and shallots",
  },
  {
    id: "sake-nigiri",
    name: "Sake nigiri",
    price: 10,
    image: images.listSake,
    category: "nigiri",
    description: "Rice vinegar, nori, wasabi cream, tuna",
  },
  {
    id: "prawn-nigiri",
    name: "Prawn nigiri",
    price: 15,
    image: images.listPrawnNigiri,
    category: "nigiri",
    description: "Poached prawns, wasabi and tamari sauce",
  },
  {
    id: "pacific-roll",
    name: "Pacific roll",
    price: 12,
    image: images.listPacific,
    category: "rolls",
    description: "Crab, avocado, cucumber, toasted sesame seeds",
  },
  {
    id: "maki-set",
    name: "Maki set",
    price: 9,
    image: images.listMakiSet,
    category: "maki",
    description: "Seasoned rice, nori, fish and crisp garden vegetables",
  },
  {
    id: "bluefin-maguro",
    name: "Bluefin maguro",
    price: 15,
    image: images.listBluefin,
    category: "rolls",
    description: "Whipped cheese, panko crumbs, fresh tuna.",
  },
  {
    id: "junmai-sake",
    name: "Junmai sake",
    price: 14,
    image: images.categorySake,
    category: "sake",
    description: "Smooth rice wine with a clean, dry finish",
  },
];

export const testimonials = [
  {
    quote:
      "Guests love fresh rolls, bright flavors, and service. Our team adds thoughtful details to every plate, making each meal special and relaxed.",
    name: "Susan johnson",
    role: "CEO",
    image: images.author1,
  },
  {
    quote:
      "Every visit feels intentional—from the first bite to the last. The balance of texture and flavor keeps us coming back for celebrations and quiet dinners alike.",
    name: "Michael Chen",
    role: "Regular guest",
    image: images.author2,
  },
  {
    quote:
      "The tasting menu was a highlight of our trip. Fresh fish, warm hospitality, and a room that feels both refined and welcoming.",
    name: "Elena Rossi",
    role: "Food writer",
    image: images.author1,
  },
] as const;

export const blogPosts = [
  {
    image: images.blog1,
    date: "April 15, 2025",
    category: "Dining",
    title: "Discover bold sushi picks for every palate",
  },
  {
    image: images.blog2,
    date: "April 14, 2025",
    category: "Dining",
    title: "Fusion flavors refresh each sushi roll beautifully",
  },
  {
    image: images.blog3,
    date: "April 9, 2025",
    category: "Dining",
    title: "Sushi’s cultural roots through the ages explored",
  },
] as const;

export const reservationHours = [
  "Monday through Friday: 6:00pm to 10:00pm",
  "Saturday and Sunday only: 12:00pm to 2:00pm",
] as const;

export const storyHours = [
  "Monday through Thursday: 11:30 AM to 9:30 PM",
  "Friday through Saturday: 11:30 AM to 10:30 PM",
  "Sunday: 12:00 PM through 9:00 PM",
] as const;
