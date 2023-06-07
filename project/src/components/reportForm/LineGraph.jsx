import { useEffect } from 'react'
import echarts from '@/config/echarts'
import { addResize, removeResize } from '@/utils/resize'

const LineGraph = (props) => {
  useEffect(() => {
    let lineGraph = document.getElementById(props.domId)
    let chart = echarts.init(lineGraph)
    props.option && chart.setOption(props.option)
    addResize(chart)
    return () => {
      removeResize()
    }
  }, [])

  return <div style={{ width: 'inherit', height: 'inherit' }}></div>
}

let lineGraphOption = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '销售额（元）',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '销售利润（元）',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
  ],
}

export { LineGraph, lineGraphOption }
