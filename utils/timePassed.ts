export const timePassed = (val: string) => {
    return Date.now() - new Date(val).getTime()
}