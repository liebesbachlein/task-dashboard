import type { LoadRawCategory } from '@/types/category'
import type { LoadRawMenuItem } from '@/types/menu-item'
import axios from 'axios'
import { ref, watchEffect, type Ref } from 'vue'

export type LoadRawData = {
  data: LoadRawCategory[]
  mapRouteToComponent: Map<string, LoadRawMenuItem>
}

export type UseFetchAllData = {
  data: Ref<LoadRawCategory[]>
  mapRouteToComponent: Ref<Map<string, LoadRawMenuItem>>
  loader: Ref<boolean>
  messageOnSubmit: Ref<string>
  isLoggedIn: Ref<boolean>
}

export function useFetchAllData(): UseFetchAllData {
  const messageOnSubmit = ref<string>(' ')
  const loader = ref<boolean>(false)
  const data = ref<LoadRawCategory[]>([])
  const mapRouteToComponent = ref<Map<string, LoadRawMenuItem>>(
    new Map<string, LoadRawMenuItem>([])
  )
  const isLoggedIn = ref<boolean>(false)
  loader.value = true

  watchEffect(() => {
    axios
      .get('/api/all')
      .then((res) => {
        data.value = res.data['data'] ?? [] //normalizeRawData(res.data)
        isLoggedIn.value = res.data['isLoggedIn']
        mapRouteToComponent.value = createMapRouteToComponent(data.value)
        loader.value = false
      })
      .catch((err) => {
        loader.value = false
        messageOnSubmit.value = 'Ошибка: ' + err
      })
  })
  return { data, mapRouteToComponent, loader, messageOnSubmit, isLoggedIn }
}

const createMapRouteToComponent = function (data: LoadRawCategory[]): Map<string, LoadRawMenuItem> {
  const mapRouteToComponent = new Map<string, LoadRawMenuItem>()
  for (let i = 0; i < data.length; i++) {
    const menuRawItems: LoadRawMenuItem[] = data[i].menu_items
    for (let j = 0; j < menuRawItems.length; j++) {
      mapRouteToComponent.set(menuRawItems[j].menu_item_data.route_name, menuRawItems[j])
    }
  }
  return mapRouteToComponent
}

//export default useData
/*
const normalizeRawData = function (data: LoadRawCategory[]): LoadNormalCategory[] {
  const normalCategories: LoadNormalCategory[] = []

  for (let i = 0; i < data.length; i++) {
    // loops over categories
    const menuRawItems: LoadRawMenuItem[] = data[i].menu_items
    const normalMenuItems: LoadNormalMenuItem[] = []
    for (let j = 0; j < menuRawItems.length; j++) {
      // loops over menu items
      const rawEvents: LoadRawEvent[] = menuRawItems[j].events
      const normalEvents: Event[] = []
      for (let k = 0; k < rawEvents.length; k++) {
        // loops over events
        normalEvents.push({
          id: rawEvents[k].id,
          menu_item_id: rawEvents[k].menu_item_id,
          name: rawEvents[k].name,
          since: new Date(rawEvents[k].since.toString()),
          until: new Date(rawEvents[k].until.toString()),
          additional_info: rawEvents[k].additional_info
        })
      }
      normalMenuItems.push({
        menu_item_data: menuRawItems[j].menu_item_data,
        events: normalEvents
      })
    }

    normalCategories.push({
      category_data: data[i].category_data,
      menu_items: normalMenuItems
    })
  }

  return normalCategories
}*/
