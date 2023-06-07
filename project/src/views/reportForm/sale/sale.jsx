import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './sale.scss'

import { getSaleAsync } from '@/store/actions/reportForm/saleActions'
import clickToExport from '@/utils/exportToExcel'

import { Button, DatePicker, Table, Pagination } from 'antd'
const { RangePicker } = DatePicker

// ?+++++++++++++++++++++++++++++++++++++++++++++++ Index
const Index = () => {
  const saleReducer = useSelector((state) => state.saleReducer)
  const dispatch = useDispatch()
  const [condition, setCondition] = useState({
    time: [],
    pageNum: 1,
    pageSize: 5,
  })

  // *--------------------------- 查询req
  const search = () => {
    setCondition((pre) => {
      let pro = {
        ...pre,
        pageNum: 1,
      }
      dispatch(getSaleAsync(pro))
      return pro
    })
  }
  // *--------------------------- 重置req
  const reset = () => {
    setCondition((pre) => {
      let pro = {
        ...pre,
        time: [],
        pageNum: 1,
      }
      dispatch(getSaleAsync(pro))
      return pro
    })
  }
  // *--------------------------- 时间变化
  const searchTimeChange = (dates) => {
    setCondition({
      ...condition,
      time: [dates[0], dates[1]],
    })
  }
  // *--------------------------- 分页变化req
  const pageChange = (page, pageSize) => {
    setCondition((pre) => {
      let pro = {
        ...pre,
        pageNum: page,
        pageSize,
      }
      dispatch(getSaleAsync(pro))
      return pro
    })
  }
  // *--------------------------- 导出
  const exportExcel = () => {
    let header = {}
    columns.forEach((item) => {
      let keys = Object.keys(item)
      header[item[keys[1]]] = item[keys[0]]
    })
    clickToExport(header, saleReducer.list, '销售明细表')
  }
  // *--------------------------- 挂载后req
  useEffect(() => {
    dispatch(getSaleAsync(condition))
  }, [])

  return (
    <>
      <div className="row-default">
        <Button className="button-default" onClick={exportExcel}>
          导出
        </Button>
      </div>
      <div className="row-default">
        <p className="rItem">业务日期</p>
        <div className="rItem">
          <RangePicker
            className="rItem"
            value={condition.time}
            onChange={(dates) => {
              searchTimeChange(dates)
            }}
          />
        </div>
        <div className="rItem">
          <Button type="primary" onClick={search}>
            搜索
          </Button>
        </div>
        <div className="rItem">
          <Button onClick={reset}>重置</Button>
        </div>
      </div>
      <div className="row-default">
        <p className="rItem">
          销售数量合计：<span className="dataTip">{}</span> 元
        </p>
        <p className="rItem">
          销售金额合计：<span className="dataTip">{}</span> 元
        </p>
        <p className="rItem">
          销售毛利合计：<span className="dataTip">{}</span> 元
        </p>
      </div>
      <Table
        className="sale-table"
        columns={columns}
        dataSource={saleReducer.list}
        size="middle"
        pagination={false}
      />
      <div className="row-default row-reserve">
        <Pagination
          showSizeChanger
          showQuickJumper
          pageSizeOptions={[5, 10]}
          total={saleReducer.total}
          showTotal={(total) => `共 ${total} 条`}
          defaultPageSize={condition.pageSize}
          current={condition.pageNum}
          onChange={(page, pageSize) => {
            pageChange(page, pageSize)
          }}
        />
      </div>
    </>
  )
}

// ?+++++++++++++++++++++++++++++++++++++++++++++++ columns
const columns = [
  {
    title: '制单时间',
    dataIndex: 'saCreateTime',
  },
  {
    title: '单据编号',
    dataIndex: 'saKey',
  },
  {
    title: '客户名称',
    dataIndex: 'cuName',
  },
  {
    title: '门店',
    dataIndex: 'stName',
  },
  {
    title: '仓库',
    dataIndex: 'gName',
  },
  {
    title: '结算方式',
    dataIndex: 'sdType',
  },
  {
    title: '收入',
    dataIndex: 'sumIncome',
  },
  {
    title: '毛利',
    dataIndex: 'sumProfit',
  },
  {
    title: '结算人',
    dataIndex: 'sdOperator',
  },
  {
    title: '备注',
    dataIndex: 'sdRemark',
  },
]

export default Index
