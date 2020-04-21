const submitTagMap = status => {
  switch (status) {
    case 1:
      return 'success';
    case 0:
    case 2:
    case 3:
    case 4:
    case 6:
      return 'danger';
    case 5:
      return 'primary';
  }
};

const submitStatusMap = status => {
  const statusMap = {
    0: 'Wrong Answer',
    1: 'Success',
    2: 'Time Limit',
    3: 'Memory Limit',
    4: 'Unknown Error',
    5: 'Padding',
    6: 'Compile Error',
  };
  return statusMap[status];
};

export { submitTagMap, submitStatusMap };
