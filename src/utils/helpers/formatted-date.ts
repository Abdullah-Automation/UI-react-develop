export const formattedDate = (date: string, type: string = 'date') => {
  const currentDate = new Date(date);

  let dateStr = `${`00${currentDate.getMonth() + 1}`.slice(
    -2
  )}/${`00${currentDate.getDate()}`.slice(
    -2
  )}/${currentDate.getFullYear()} ${`00${currentDate.getHours()}`.slice(
    -2
  )}:${`00${currentDate.getMinutes()}`.slice(-2)}`;

  if (type === 'year') {
    dateStr = `${`00${currentDate.getMonth() + 1}`.slice(
      -2
    )}/${`00${currentDate.getDate()}`.slice(-2)}/${currentDate.getFullYear()}`;
  }

  return dateStr;
};
