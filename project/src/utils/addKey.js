// ?+++++++++++++++++++++++++++++++++++++++++++++++ ADDKEY @为数据添加key

// *--------------------------- data @数据：array
// *--------------------------- key @指定key的字段：string
function addKey(data, key) {
  data = data.map((item, index) => {
    return {
      ...item,
      key: item[key],
    }
  })
  return data
}

export default addKey
