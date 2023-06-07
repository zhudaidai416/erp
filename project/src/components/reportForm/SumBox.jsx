const SumBox = () => {
  let sumList = [
    { key: 1, title: '销售额（元）', sum: '12000' },
    { key: 2, title: '销售笔数', sum: '23' },
    { key: 3, title: '销售利润（元）', sum: '2100' },
    { key: 4, title: '销售退款笔数', sum: '3' },
    { key: 5, title: '销售退款金额（元）', sum: '470' },
  ]
  return sumList.map((item) => {
    return (
      <div className="sumBox" key={item.key}>
        <p className="title">{item.title}</p>
        <p className="num">{item.sum}</p>
      </div>
    )
  })
}

export default SumBox
