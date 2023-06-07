// ?+++++++++++++++++++++++++++++++++++++++++++++++ RESIZE @echarts图尺寸变化监听

// *--------------------------- chart @eCharts初始化的对象
function RESIZE(chart) {
  chart.resize()
}

const addResize = (chart) => {
  window.addEventListener('resize', RESIZE.bind(this, chart))
}

// *--------------------------- @移除监听
const removeResize = () => {
  window.removeEventListener('resize', RESIZE)
}

export { addResize, removeResize }
