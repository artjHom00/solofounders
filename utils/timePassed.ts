export const timePassed = (val: Date) => {
    return Date.now() - new Date(val).getTime()
}