function addZero(number) {
  if (number > 9) return number;
  return `0${number}`;
}

export default function parseDate(timestamp) {
  const date = new Date(timestamp);
  const hour = addZero(date.getHours());
  const minute = addZero(date.getMinutes());

  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();

  const readableDate = `${hour}:${minute} • ${day}/${month}/${year}`;
  return readableDate;
}
