
export const getIndexArray = (array, value) => {
    console.log('==>', array, value)
    const index = array.findIndex((item) => (typeof (item.id) == Number)
        ? item.id === parseInt(value)
        : item.id === value
    )
    return index
}