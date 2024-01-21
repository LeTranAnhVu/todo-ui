export function addDays(date: Date, dayOffset: number): Date {
   const newDate =  new Date(date)
   newDate.setDate(date.getDate() + dayOffset)
   return newDate
}