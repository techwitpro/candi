import { featuredDishes, menuListItems, type MenuItem } from "./content";

const catalogMap = new Map<string, MenuItem>();

for (const item of [...featuredDishes, ...menuListItems]) {
  catalogMap.set(item.id, item);
}

export const menuCatalog: MenuItem[] = Array.from(catalogMap.values());

export function getMenuItem(id: string): MenuItem | undefined {
  return catalogMap.get(id);
}

export function formatPrice(value: number) {
  return `$ ${value.toFixed(2)} USD`;
}
