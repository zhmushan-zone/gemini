/**
 * hot的排序
 * @param {*} arr 
 */
export const hotSort = (arr) => arr.sort((a, b) => b.upersId.length - a.upersId.length)
