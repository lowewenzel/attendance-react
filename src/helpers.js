import moment from 'moment';

export const getTodayAsFormatted = () => {
  return moment().format('YYYYMMDD');
};

export const getDayAsFormatted = momentObject => {
  return momentObject.format('YYYYMMDD');
};
