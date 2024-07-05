import type { Component } from 'vue'

export type MenuItemType = {
  menuItemName: string
  routeName: string
  component: Component
  subMenuItems: string[]
}
