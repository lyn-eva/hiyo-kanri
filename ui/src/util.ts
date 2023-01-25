export const setHour = (d: string | number, ...time: number[]) => new Date(new Date(d).setHours(...time))
