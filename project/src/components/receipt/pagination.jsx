// ========================== 分页：修改上一步和下一步为文字链接 ==========================
export const itemRender = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a
      style={{
        padding: '7px',
        border: '1px solid #d9d9d9',
        borderRadius: '2px',
      }}>上一页</a>;
  }
  if (type === 'next') {
    return <a
      style={{
        padding: '7px',
        border: '1px solid #d9d9d9',
        borderRadius: '2px',
      }}>下一页</a>;
  }
  return originalElement;
};