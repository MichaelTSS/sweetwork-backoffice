import moment from 'moment';

const computeMinDateRange = (params) => {
  switch (params.dateRange) {
    case '30':
    case '7':
    case '1':
      return moment()
        .subtract(params.dateRange, 'days')
        .valueOf();
    case '-1':
    default: {
      return null;
    }
  }
};

export default {
  computeMinDateRange,
};
