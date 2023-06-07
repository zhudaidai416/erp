import './analysis.scss'
import { DatePicker, Table } from 'antd'
import { useEffect, useState } from 'react'
import { LineGraph, lineGraphOption } from '@/components/reportForm/LineGraph'
import {
  CircleGraph,
  circleGraphOption,
} from '@/components/reportForm/CircleGraph'
import SumBox from '@/components/reportForm/SumBox'

const { RangePicker } = DatePicker

// ?+++++++++++++++++++++++++++++++++++++++++++++++ Index
const Index = () => {
  const [pageState, setPageState] = useState({
    timeState: timeState._1,
  })
  const [LGOption, setLGOption] = useState(lineGraphOption)
  const [CGOption, setCGOption] = useState(circleGraphOption)

  return (
    <>
      <div className="row-default row-padding-time">
        <p>选择日期</p>
        <RangePicker />
        <button
          onClick={() => {
            setPageState({ timeState: timeState._1 })
          }}
          className={
            pageState.timeState === timeState._1
              ? 'button-time-active'
              : 'button-time-default'
          }
        >
          今日
        </button>
        <button
          onClick={() => {
            setPageState({ timeState: timeState._2 })
          }}
          className={
            pageState.timeState === timeState._2
              ? 'button-time-active'
              : 'button-time-default'
          }
        >
          近7日
        </button>
        <button
          onClick={() => {
            setPageState({ timeState: timeState._3 })
          }}
          className={
            pageState.timeState === timeState._3
              ? 'button-time-active'
              : 'button-time-default'
          }
        >
          近30日
        </button>
      </div>
      <p className="row-default row-padding-title">销售走势</p>
      <div className="row-default row-padding-sumBox">
        <SumBox />
      </div>
      <div id="lineGraph" className="row-default row-padding-lineGraph">
        <LineGraph option={LGOption} domId="lineGraph"/>
      </div>
      <div className="row-default row-block">
        <div className="block-item-frame">
          <p className="row-default row-padding-title">商品销售品类</p>
          <div className="block-item">
            <div id="circleGraph_1" className="block-item-circleGraph">
              <CircleGraph option={CGOption} domId="circleGraph_1" />
            </div>
          </div>
        </div>
        <div className="block-item-frame">
          <p className="row-default row-padding-title">客户占比</p>
          <div className="block-item">
            <div id="circleGraph_2" className="block-item-circleGraph">
              <CircleGraph option={CGOption} domId="circleGraph_2" />
            </div>
          </div>
        </div>
        <div className="block-item-frame">
          <p className="row-default row-padding-title">商品销售排行</p>
          <div className="block-item">
            <Table
              columns={columns}
              dataSource={data}
              size="middle"
              pagination={false}
            />
          </div>
        </div>
        <div className="block-item-frame">
          <p className="row-default row-padding-title">商品销售退货排行</p>
          <div className="block-item">
            <Table
              columns={columns}
              dataSource={data}
              size="middle"
              pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ?+++++++++++++++++++++++++++++++++++++++++++++++ timeState
const timeState = {
  _1: 'today',
  _2: 'week',
  _3: 'month',
}

const columns = [
  {
    title: '商品编号',
    dataIndex: 'cId',
    className: 'analysis-tableHeader',
  },
  {
    title: '商品名称',
    dataIndex: 'cName',
    className: 'analysis-tableHeader',
  },
  {
    title: '销售总额（元）',
    dataIndex: 'cSum',
    className: 'analysis-tableHeader',
  },
  {
    title: '销售利润（元）',
    dataIndex: 'cSum2',
    className: 'analysis-tableHeader',
  },
  {
    title: '销售笔数',
    dataIndex: 'cNum',
    className: 'analysis-tableHeader',
  },
]

const data = [
  {
    key: 1,
    cId: 'SP0001',
    cName: '懒羊羊动力饮料',
    cSum: '410000',
    cSum2: '100000',
    cNum: '300',
  },
  {
    key: 2,
    cId: 'SP0001',
    cName: '懒羊羊动力饮料',
    cSum: '410000',
    cSum2: '100000',
    cNum: '300',
  },
  {
    key: 3,
    cId: 'SP0001',
    cName: '懒羊羊动力饮料',
    cSum: '410000',
    cSum2: '100000',
    cNum: '300',
  },
  {
    key: 4,
    cId: 'SP0001',
    cName: '懒羊羊动力饮料',
    cSum: '410000',
    cSum2: '100000',
    cNum: '300',
  },
  {
    key: 5,
    cId: 'SP0001',
    cName: '懒羊羊动力饮料',
    cSum: '410000',
    cSum2: '100000',
    cNum: '300',
  },
]

export default Index
