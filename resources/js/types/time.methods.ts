import type { Event } from './event'

export const getDateString = function (date: Date) {
  const dayStr = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const monthStr = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  return `${dayStr}.${monthStr}.${date.getFullYear()}`
}

export const getInfo = function (event: Event) {
  const differenceInMinutes = (event.until.getTime() - new Date(Date.now()).getTime()) / (1000 * 60)

  if (differenceInMinutes <= 0) {
    return 'Срок истек'
  }
  const years = Math.floor(differenceInMinutes / (365 * 24 * 60))
  const months = Math.floor((differenceInMinutes - years * 365 * 24 * 60) / 30 / (24 * 60))
  const days = Math.floor(
    (differenceInMinutes - years * 365 * 24 * 60 - months * 30 * 24 * 60) / (24 * 60)
  )
  const hours = Math.floor(
    (differenceInMinutes - years * 365 * 24 * 60 - months * 30 * 24 * 60 - days * 24 * 60) / 60
  )
  const minutes = Math.floor(
    differenceInMinutes -
      years * 365 * 24 * 60 -
      months * 30 * 24 * 60 -
      days * 24 * 60 -
      hours * 60
  )

  const yearsLeft = years ? ` ${years} ${getYearsStr(years)}` : ''
  const monthsLeft = months ? ` ${months} ${getMonthsStr(months)}` : ''
  const daysLeft = !yearsLeft && days ? ` ${days} ${getDaysStr(days)}` : ''
  const hoursLeft =
    !months && !years && days < 7 ? (hours ? ` ${hours} ${getHoursStr(hours)}` : '') : ''
  const minutesLeft =
    !months && !years && !days ? (minutes ? ` ${minutes} ${getMinutesStr(minutes)}` : '') : ''
  const all = `${yearsLeft}${monthsLeft}${daysLeft}${hoursLeft}${minutesLeft}`
  return all ? `Истечёт через${all}` : 'Ошибка'
}

export const getDaysStr = function (days: number) {
  if (days % 10 == 1) {
    if (days % 100 != 11) return 'день'
  }
  if (days % 10 == 2 || days % 10 == 3 || days % 10 == 4) {
    const mod = days % 10
    if (days % 100 != 10 + mod) return 'дня'
  }
  return 'дней'
}

export const getMonthsStr = function (months: number) {
  if (months % 10 == 1) {
    if (months % 100 != 11) return 'месяц'
  }
  if (months % 10 == 2 || months % 10 == 3 || months % 10 == 4) {
    const mod = months % 10
    if (months % 100 != 10 + mod) return 'месяца'
  }
  return 'месяцев'
}

export const getYearsStr = function (years: number) {
  if (years % 10 == 1) {
    if (years % 100 != 11) return 'год'
  }
  if (years % 10 == 2 || years % 10 == 3 || years % 10 == 4) {
    const mod = years % 10
    if (years % 100 != 10 + mod) return 'года'
  }
  return 'лет'
}

export const getHoursStr = function (hours: number) {
  if (hours % 10 == 1) {
    if (hours % 100 != 11) return 'час'
  }
  if (hours % 10 == 2 || hours % 10 == 3 || hours % 10 == 4) {
    const mod = hours % 10
    if (hours % 100 != 10 + mod) return 'часа'
  }
  return 'часов'
}

export const getMinutesStr = function (minutes: number) {
  if (minutes % 10 == 1) {
    if (minutes % 100 != 11) return 'минуту'
  }
  if (minutes % 10 == 2 || minutes % 10 == 3 || minutes % 10 == 4) {
    const mod = minutes % 10
    if (minutes % 100 != 10 + mod) return 'минуты'
  }
  return 'минут'
}

export const isDueIn = function (event: Event) {
  const differenceInDays =
    (event.until.getTime() - new Date(Date.now()).getTime()) / (1000 * 60 * 60 * 24)

  if (differenceInDays <= 30) {
    return true
  }

  return false
}
