import type { LoadRawMenuItem, LoadNormalMenuItem } from './menu-item'

export type Category = {
  id: number
  name: string
}

export type LoadRawCategory = {
  category_data: Category
  menu_items: LoadRawMenuItem[]
}

export type LoadNormalCategory = {
  category_data: Category
  menu_items: LoadNormalMenuItem[]
}
