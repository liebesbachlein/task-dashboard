import type { LoadRawMenuItem } from './menu-item'

export type Event = {
  id: number
  menu_item_id: number
  name: string
  since: Date
  until: Date
  additional_info?: string
}

export type LoadRawEvent = {
  id: number
  name: string
  menu_item_id: number
  since: string
  until: string
  additional_info?: string
}

export const normalizeRawData = function (data: LoadRawMenuItem | undefined): Event[] {
  if (data === undefined) return []
  const rawEvents: LoadRawEvent[] = data.events
  const normalEvents: Event[] = []
  for (let i = 0; i < rawEvents.length; i++) {
    normalEvents.push({
      id: rawEvents[i].id,
      menu_item_id: rawEvents[i].menu_item_id,
      name: rawEvents[i].name,
      since: new Date(rawEvents[i].since.toString()),
      until: new Date(rawEvents[i].until.toString()),
      additional_info: rawEvents[i].additional_info
    })
  }
  return normalEvents
}
