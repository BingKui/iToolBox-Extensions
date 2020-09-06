import dayjs from 'dayjs';

export const formatData = (date, format='YYYY-MM-DD') => {
    return dayjs(date).format(format);
};
