exports.arrangeRetails = (parsedRetails) => {
    const sortedRetails = parsedRetails.sort((a, b) => {
        if (a.id > b.id) return -1
        if (a.id < b.id) return 1
        return
    })
    return sortedRetails
}