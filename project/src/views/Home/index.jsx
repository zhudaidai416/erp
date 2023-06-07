import React from 'react'
import '../../assets/scss/homepage/index.scss'
import { PlusOutlined, SolutionOutlined, BarChartOutlined, TeamOutlined, MessageOutlined, ScheduleOutlined, ProfileOutlined, PayCircleFilled , ContainerFilled, EuroCircleFilled, EditFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";

import { Table } from 'antd'
import { LineGraph, lineGraphOption } from '@/components/reportForm/LineGraph'
import {CircleGraph,circleGraphOption} from '@/components/reportForm/CircleGraph'

let circleGraphOption1 = {
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

export default function Home() {
  return (
    <div className='home'>
      {/* 第一排 */}
      <div className="home_top">
        <div className="top_one">
          <div className="one_jin">
            <div className="jin_ri">今日销售总额</div>
            <div className="jin_yang">￥40000.00</div>
          </div>
          <div className="one_tu">
            <PayCircleFilled 
            style={{color:"#97d4ff", fontSize: '60px'}} />
          </div>
        </div>
        <div className="top_two">
          <div className="one_jin">
            <div className="jin_ri">今日销售单数</div>
            <div className="jin_yang">40</div>
          </div>
          <div className="one_tu">
            <ContainerFilled  
            style={{color:"#fdb7b7", fontSize: '60px'}} />
          </div>
        </div>
        <div className="top_three">
          <div className="one_jin">
            <div className="jin_ri">今日销售利润</div>
            <div className="jin_yang">￥3030</div>
          </div>
          <div className="one_tu">
            <EuroCircleFilled 
            style={{color:"#84e2a6", fontSize: '60px'}} />
          </div>
        </div>
        <div className="top_four">
          <div className="one_jin">
            <div className="jin_ri">今日收款笔数</div>
            <div className="jin_yang">23</div>
          </div>
          <div className="one_tu">
            <EditFilled 
            style={{color:"#ffd5af", fontSize: '60px'}} />
          </div>
        </div>
      </div>
      {/* 第二排 */}
      <div className="home_er">
        <div className="er_one">
          <div className="one_dai">待处理订单</div>
          <div className="one_she">
            <div className="she_one">
              <Link to="/sale/sales">
                <div className="she_one">
                  <div className="one_chu">待审核销售单</div>
                  <div className="one_shu">890</div>
                </div>
              </Link>
            </div>
            <div className="she_one">
              <Link to="/procurement">
                <div className="she_one">
                  <div className="one_chu">待审核采购单</div>
                  <div className="one_shu">120</div>
                </div>
                
              </Link>
            </div>
            <div className="she_one">
              <div className="one_chu">待入库单</div>
              <div className="one_shu">290</div>
            </div>
            <div className="she_one">
              <div className="one_chu">待出库单</div>
              <div className="one_shu">90</div>
            </div>
          </div>
        </div>
        <div className="er_two">
          <div className="one_dai">商品概况</div>
          <div className="one_she">
            <div className="she_one">
              <div className="one_chu">全部商品</div>
              <div className="ones_shu">8900</div>
            </div>
            <div className="she_one">
              <div className="one_chu">滞销商品</div>
              <div className="ones_shu">7120</div>
            </div>
            <div className="she_one">
              <Link to="/stock">
              <div className="she_one">
                <div className="one_chu">库存不足</div>
                <div className="ones_shu">290</div>
              </div>
                
              </Link>
            </div>
            <div className="she_one">
              <div className="one_chu">库存超储</div>
              <div className="ones_shu">190</div>
            </div>
          </div>
        </div>
      </div>
      {/* 第三排 */}
      <div className="home_san">
        <div className="san_kou">快捷入口</div>
        <div className="san_ru">
          <div className="ru_dan">
            <Link to="/sale/sales">
              <div className="ru_dan">
                <div className="dan_lv">
                  <ProfileOutlined
                  style={{color:"#2ed477", fontSize: '30px', margin:"20px"}} />
                </div>
                <div className="dan_zi">销售单</div>
              </div>
            </Link>
          </div>
          <div className="ru_dan">
            <Link to="/procurement">
              <div className="ru_dan">
                <div className="dan_lan">
                <ScheduleOutlined
                  style={{color:"#006eff", fontSize: '30px', margin:"20px"}} />
                </div>
                <div className="dan_zi">采购单</div>
              </div>
            </Link>
          </div>
          <div className="ru_dan">
            <Link to="/receipt">
              <div className="ru_dan">
                <div className="dan_lv">
                  <ProfileOutlined
                  style={{color:"#2ed477", fontSize: '30px', margin:"20px"}} />
                </div>
                <div className="dan_zi">收款单</div>
              </div>
            </Link>
          </div>
          <div className="ru_dan">
            <Link to="/payment">
             <div className="ru_dan">
              <div className="dan_lan">
              <ScheduleOutlined
                style={{color:"#006eff", fontSize: '30px', margin:"20px"}} />
              </div>
              <div className="dan_zi">付款单</div>
             </div>
            </Link>
          </div>
          <div className="ru_dan">
            <div className="dan_lan">
            <MessageOutlined
              style={{color:"#006eff", fontSize: '30px', margin:"20px"}} />
            </div>
            <div className="dan_zi">消息通知</div>
          </div>
          <div className="ru_dan">
            <div className="dan_hong">
            <TeamOutlined
              style={{color:"#f46363", fontSize: '30px', margin:"20px"}} />
            </div>
            <div className="dan_zi">客户管理</div>
          </div>
          <div className="ru_dan">
            <Link to="/sale">
              <div className="ru_dan">
                <div className="dan_hong">
                <BarChartOutlined
                  style={{color:"#f46363", fontSize: '30px', margin:"20px"}} />
                </div>
                <div className="dan_zi">报表</div>
              </div>
            </Link>
          </div>
          <div className="ru_dan">
            <Link to="/staffManage">
              <div className="ru_dan">
                <div className="dan_huang">
                <SolutionOutlined
                  style={{color:"#ff9138", fontSize: '30px', margin:"20px"}} />
                </div>
                <div className="dan_zi">员工管理</div>
              </div>
            </Link>
          </div>
          <div className="ru_dan">
            <div className="dan_hui">
            <PlusOutlined
              style={{color:"#ffffff", fontSize: '30px', margin:"20px"}} />
            </div>
            <div className="dan_zi">编辑入口</div>
          </div>
        </div>
      </div>
      {/* 第四排 */}
      <div className="home_si">
        <div className="si_one">
          <div className="one_tian">近7天销售额走势（单位：元）</div>
          <div id='main1' style={{width:"600px", height:"300px", margin: "30px"}}>
            <LineGraph option={lineGraphOption} domId="main1" style={{width:"720px", height:"350px"}} />
          </div>
        </div>
        <div className="si_two">
          <div className="one_tian">各品类销售额占比</div>
          <div id='main2' style={{width:"500px", height:"400px", margin: "-25px 10px"}}>
            <CircleGraph option={circleGraphOption} domId="main2" style={{width:"720px", height:"350px"}} /> 
          </div>
        </div>
        
      </div>
      {/* 第五排 */}
      <div className="home_wu">
        <div className="wu_one">
        <div className="block-item-frame">
          <p className="bao_tou bao_top">商品销售排行</p>
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
        <div className="wu_two">
        <div className="block-item-frame">
          <p className="bao_tou bao_top">库存商品数量</p>
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
      </div>
    </div>
  )
}
