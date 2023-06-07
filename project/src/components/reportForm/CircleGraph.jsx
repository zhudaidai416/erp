import { useEffect } from 'react'
import echarts from '@/config/echarts'
import { addResize, removeResize } from '@/utils/resize'

const CircleGraph = (props) => {
  useEffect(() => {
    let circleGraph = document.getElementById(props.domId)
    const chart = echarts.init(circleGraph)
    props.option && chart.setOption(props.option)
    addResize(chart)
    return () => {
      removeResize()
    }
  }, [])

  return (
    <>
      <div style={{ width: 'inherit', height: 'inherit' }}></div>
    </>
  )
}

const circleGraphOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    x: '65%',
    y: '30%',
    data: ['服装', '粮油', '食品', '箱包', '日用百货'],
  },
  series: [
    {
      name: '品类',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['32%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: '服装' },
        { value: 735, name: '粮油' },
        { value: 580, name: '食品' },
        { value: 484, name: '箱包' },
        { value: 300, name: '日用百货' },
      ],
    },
  ],
}

export { CircleGraph, circleGraphOption }
