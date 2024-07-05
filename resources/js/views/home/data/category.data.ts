import type { MenuItemType } from './menu-item.data'

export type CategoryType = {
  isMainCategory: boolean
  categoryName: string
  menuItems: MenuItemType[]
}
