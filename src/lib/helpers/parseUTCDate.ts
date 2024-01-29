import dayjs from 'dayjs'

export const parseUTCDate = (dateAsStr: string): Date => {
    const dayjsDate = dayjs(dateAsStr)
    return new Date(Date.UTC(dayjsDate.get('year'), dayjsDate.get('month'), dayjsDate.get('date')))
}