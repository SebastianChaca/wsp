import dayjs from "dayjs";
import es from "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);
dayjs.locale(es);

export const getHour = (date: string): string => {
  return dayjs(date).format("HH:mm");
};

export const getLastActive = (date: string): string => {
  const day = dayjs(date).format("d");
  const dayToName = dayjs.weekdays()[parseInt(day)];
  const hour = dayjs(date).format("HH:mm");

  return `ult vez ${dayToName} a la(s) ${hour}`;
};
