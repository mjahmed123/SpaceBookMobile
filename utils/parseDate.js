import { DateTime } from 'luxon';

function addZero(number) {
  if (number > 9) return number;
  return `0${number}`;
}

export function extractTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hour = addZero(date.getHours());
  const minute = addZero(date.getMinutes());

  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return {
    hour, minute, day, month, year,
  };
}

export default function parseDate(timestamp) {
  const {
    hour, minute, day, month, year,
  } = extractTimestamp(timestamp);

  const readableDate = `${hour}:${minute} • ${day}/${month}/${year}`;
  return readableDate;
}

export function validateFields(day, month, year, hour, minute) {
  try {
    const dateTime = DateTime.fromObject({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      hour: Number(hour),
      minute: Number(minute),
    });
    const jsDate = dateTime.toJSDate();
    if (jsDate.getTime() <= Date.now()) {
      return [null, 'Date and time must be newer than the current date.'];
    }
    return [jsDate, null];
  } catch (err) {
    return [null, 'Invalid date or time.'];
  }
}
