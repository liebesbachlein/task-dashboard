import moment from 'moment'
import type { CategoryType } from './category'
import type { EventType } from './event'
import type { LoadMenuItemType, MenuItemType } from './menu-item'
import axios from 'axios'

export const loadCategories = async function (): Promise<CategoryType[] | undefined> {
  let categories: CategoryType[] = []
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

export const loadMenuItems = async function (): Promise<LoadMenuItemType[] | undefined> {
  let menuItems: LoadMenuItemType[] = []
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

export const getCategories = function () {
  return categories
}

export const getMenuItems = function (categoryId: number): MenuItemType[] {
  const newMenuItems: MenuItemType[] = []
  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].categoryId === categoryId) {
      newMenuItems.push(menuItems[i])
    }
  }
  return newMenuItems
}

export const getMenuItemByRouteName = function (routeName: string): MenuItemType | undefined {
  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].routeName === routeName) {
      return menuItems[i]
    }
  }
  return undefined
}

export const getEvents = function (menuItemId: number): EventType[] {
  const newEvents: EventType[] = []
  for (let i = 0; i < events.length; i++) {
    if (events[i].menuItemId === menuItemId) {
      newEvents.push(events[i])
    }
  }
  return newEvents
}

const events: EventType[] = [
  {
    id: 1,
    menuItemId: 1,
    name: 'www.bcc-invest/kz',
    since: moment('2/7/2024 04:17:32+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
    until: moment('30/11/2024 04:17:31+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
  },
  {
    id: 1,
    menuItemId: 1,
    name: 'ISRG Root X1',
    since: moment('4/6/2015 11:04:38+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
    until: moment('4/6/2035 11:04:38+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
  },
  {
    id: 1,
    menuItemId: 1,
    name: 'E6',
    since: moment('13/3/2024 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
    until: moment('12/3/2027 23:59:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
  },
  {
    id: 1,
    menuItemId: 2,
    name: 'Доменное имя',
    since: moment('14/7/2024 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
    until: moment('14/7/2025 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
  },
  {
    id: 1,
    menuItemId: 3,
    name: 'Адресная строка',
    since: moment('1/1/2024 00:00:00+0000', 'DD/MM/YYYY hh:mm:ssZ ZZ').toDate(),
    until: moment('1/1/2025 00:00:00+0000', 'DD/MM/YYYY hh:mm:ssZ ZZ').toDate()
  },
  {
    id: 1,
    menuItemId: 4,
    name: 'Подписка на App Store',
    since: moment('5/10/2023 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
    until: moment('5/10/2024 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
  }
]

const menuItems: MenuItemType[] = [
  {
    id: 1,
    name: 'Сертификаты безопасности (SSL)',
    routeName: 'ssl-certificate',
    categoryId: 1
  },
  {
    id: 2,
    name: 'Доменное имя',
    routeName: 'domain-name',
    categoryId: 1
  },
  {
    id: 3,
    name: 'Адресная строка',
    routeName: 'address-bar',
    categoryId: 1
  },
  {
    id: 4,
    name: 'Подписка на App Store',
    routeName: 'app-store-subscription',
    categoryId: 2
  }
]

const categories: CategoryType[] = [
  {
    id: 1,
    name: 'Веб'
  },
  {
    id: 2,
    name: 'Мобильное приложение'
  }
]
