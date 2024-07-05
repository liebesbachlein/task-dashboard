import moment from 'moment'
import type { CategoryType } from './category.data'
import type { EventType } from './event.data'
import CertificateSSL from '../views/CertificateSSL.vue'
import AppStoreSubscription from '../views/AppStoreSubscription.vue'
import DomainName from '../views/DomainName.vue'
import AddressBar from '../views/AddressBar.vue'
import WelcomeView from '../views/WelcomeView.vue'

const main: CategoryType = {
  isMainCategory: true,
  categoryName: '',
  menuItems: [
    {
      menuItemName: 'Истекут в течении 30 дней',
      routeName: 'home',
      component: WelcomeView,
      subMenuItems: []
    }
  ]
}

export const categories: CategoryType[] = [
  {
    isMainCategory: false,
    categoryName: 'Веб',
    menuItems: [
      {
        menuItemName: 'Сертификаты безопасности (SSL)',
        routeName: 'ssl-certificate',
        component: CertificateSSL,
        subMenuItems: ['www.bcc-invest/kz', 'ISRG Root X1', 'E6']
      },
      {
        menuItemName: 'Доменное имя',
        routeName: 'domain-name',
        component: DomainName,
        subMenuItems: []
      },
      {
        menuItemName: 'Адресная строка',
        routeName: 'address-bar',
        component: AddressBar,
        subMenuItems: []
      }
    ]
  },
  {
    isMainCategory: false,
    categoryName: 'Мобильное приложение',
    menuItems: [
      {
        menuItemName: 'Подписка на App Store',
        routeName: 'app-store-subscription',
        component: AppStoreSubscription,
        subMenuItems: []
      }
    ]
  }
]

export const keyDatesMap = new Map<string, EventType[]>([
  [
    'ssl-certificate',
    [
      {
        since: moment('2/7/2024 04:17:32+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
        until: moment('30/7/2024 04:17:31+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
      },
      {
        since: moment('4/6/2015 11:04:38+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
        until: moment('4/6/2035 11:04:38+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
      },
      {
        since: moment('13/3/2024 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
        until: moment('12/3/2027 23:59:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
      }
    ]
  ],
  [
    'domain-name',
    [
      {
        since: moment('14/7/2024 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
        until: moment('14/7/2024 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
      }
    ]
  ],
  [
    'address-bar',
    [
      {
        since: moment('1/1/2024 00:00:00+0000', 'DD/MM/YYYY hh:mm:ssZ ZZ').toDate(),
        until: moment('1/1/2025 00:00:00+0000', 'DD/MM/YYYY hh:mm:ssZ ZZ').toDate()
      }
    ]
  ],
  [
    'app-store-subscription',
    [
      {
        since: moment('5/10/2023 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate(),
        until: moment('5/10/2024 00:00:00+0000', 'DD/MM/YYYY hh:mm:ss Z ZZ').toDate()
      }
    ]
  ]
])

categories.push(main)
