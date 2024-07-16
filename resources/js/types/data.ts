import type { Category } from './category'
import { normalizeRawData } from './event'
import type { LoadNormalMenuItem, LoadRawMenuItem, MenuItem } from './menu-item'
import axios from 'axios'

export const loadCategories = async function (): Promise<Category[] | undefined> {
  let categories: Category[] = []
  await axios
    .get('/api/categories')
    .then((res) => {
      categories = res.data
    })
    .catch((err) => {
      return undefined
    })

  return categories
}

export const loadMenuItems = async function (): Promise<MenuItem[] | undefined> {
  let menuItems: MenuItem[] = []
  await axios
    .get('/api/menu-items')
    .then((res) => {
      menuItems = res.data
    })
    .catch((err) => {
      return undefined
    })

  return menuItems
}
