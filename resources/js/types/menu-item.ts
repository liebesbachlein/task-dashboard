import type { LoadRawEvent, Event } from './event'

export type MenuItem = {
  id: number
  name: string
  route_name: string
  category_id: number
}

export type LoadRawMenuItem = {
  menu_item_data: MenuItem
  events: LoadRawEvent[]
}

export type LoadNormalMenuItem = {
  menu_item_data: MenuItem
  events: Event[]
}
