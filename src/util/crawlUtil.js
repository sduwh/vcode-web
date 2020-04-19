const crawlStatusMap = (status) => {
  const statusMap = {
    'crawling': 'primary',
    'success': 'success',
    'fail': 'danger',
  };
  return statusMap[status]
};

export {
  crawlStatusMap
}