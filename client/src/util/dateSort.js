const dateSort = (arr) => arr.sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))

export default dateSort