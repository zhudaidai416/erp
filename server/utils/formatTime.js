module.exports = {
    formatTime(activityTime) {
      const date = new Date(activityTime);
      let y = date.getFullYear();
      let mon = date.getMonth() + 1;
      mon = mon < 10 ? '0' + mon : mon;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      let h = date.getHours();
      h = h < 10 ? '0' + h : h;
      let m = date.getMinutes();
      m = m < 10 ? '0' + m : m;
  
      return y + '-' + mon + '-' + d + ' ' + h + ':' + m;
    }
}