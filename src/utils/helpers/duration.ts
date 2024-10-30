export const duration = (time: number, isFormatted: boolean = true) => {
  if (time === 0) {
    return isFormatted ? `00:00:00.000` : `000000000`;
  }
  const date = new Date(time * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');

  const result = isFormatted
    ? `${hours}:${minutes}:${seconds}.${milliseconds}`
    : `${hours}${minutes}${seconds}${milliseconds}`;

  return result;
};

export const parseFormattedTime = (formattedTime: string): number => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let milliseconds = 0;

  if (formattedTime.length >= 9) {
    hours = parseInt(formattedTime.substr(0, 2), 10);
    minutes = parseInt(formattedTime.substr(2, 2), 10);
    seconds = parseInt(formattedTime.substr(4, 2), 10);
    milliseconds = parseInt(formattedTime.substr(6, 3), 10);
  }

  return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
};
