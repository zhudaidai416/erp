import * as XLSX from 'xlsx'

// ?+++++++++++++++++++++++++++++++++++++++++++++++ 主函数形参注释
// *--------------------------- header
// 注释：excel表头
// 类型：object
// 结构：
// {
//   name: '姓名',
//   age: '年龄',
//   address: '地址',
// }
// *--------------------------- data
// 注释：导出数据
// 类型：array
// *--------------------------- fileName
// 注释：自定义导出文件名
// 类型：string

// ?+++++++++++++++++++++++++++++++++++++++++++++++ 主函数
function clickToExport(header, data, fileName) {
  // 数据过滤
  let newData = []
  let headerKeys = Object.keys(header)
  data.forEach((item) => {
    let newItem = {}
    for (let i = 0; i < headerKeys.length; i++)
      newItem[headerKeys[i]] = item[headerKeys[i]]
    newData.push(newItem)
  })

  // 生成工作簿对象
  const json = newData.map((item) => {
    return Object.keys(item).reduce((newData, key) => {
      const newKey = header[key] || key
      newData[newKey] = item[key]
      return newData
    }, {})
  })

  // 将工作簿对象转化为json对象
  const sheet = XLSX.utils.json_to_sheet(json)

  openDownloadDialog(sheet2blob(sheet, undefined), `${fileName}.xlsx`)
}

// ?+++++++++++++++++++++++++++++++++++++++++++++++ 创建a标签 利用a标签的download属性进行下载文件
const openDownloadDialog = (url, saveName) => {
  // 创建blob地址
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url)
  }
  let aLink = document.createElement('a')
  aLink.href = url
  // HTML5新增的属性
  // 指定保存文件名
  // 可以不要后缀
  // 注意，file:///模式下不会生效
  aLink.download = saveName || ''

  let event
  if (window.MouseEvent) event = new MouseEvent('click')
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
    )
  }

  aLink.dispatchEvent(event)
}

// ?+++++++++++++++++++++++++++++++++++++++++++++++ 将工作簿对象转化为我们需要的
const sheet2blob = (sheet, sheetName) => {
  // 生成excel的配置项
  sheetName = sheetName || 'sheet1'
  let workbook = {
    SheetNames: [sheetName],
    Sheets: {},
  }
  workbook.Sheets[sheetName] = sheet

  // 字符串转ArrayBuffer
  let workbookOut = XLSX.write(workbook, {
    // 要生成的文件类型
    bookType: 'xlsx',
    // 是否生成Shared String Table
    // 官方解释是，如果开启生成速度会下降
    // 但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    type: 'binary',
  })
  let blob = new Blob([s2ab(workbookOut)], {
    type: 'application/octet-stream',
  })

  return blob
}

// ?+++++++++++++++++++++++++++++++++++++++++++++++ 转码操作
function s2ab(wbo) {
  let buf = new ArrayBuffer(wbo.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i !== wbo.length; ++i) view[i] = wbo.charCodeAt(i) & 0xff

  return buf
}

export default clickToExport
