import moment, { Moment } from "moment";
import { Cart } from "../../../../types/carts";

export const getDataPerPage = (datas: Cart[], pagination: any) => {
  return datas.slice(
    pagination.pageNo * pagination.pageSize,
    pagination.pageNo * pagination.pageSize + pagination.pageSize
  );
};

export const getDataByDateRange = (
  datas: Cart[],
  { date: [start, end] }: { date: [Moment | null, Moment | null] }
) => {
  if (!start || !end) return datas;
  return datas.filter((item) => {
    const itemDate = moment(item.date).unix();
    const [startDate, endDate] = [
      moment(start).startOf("day").unix(),
      moment(end).endOf("day").unix(),
    ];
    return itemDate >= startDate && itemDate <= endDate;
  });
};

export const renderDate = (date: string) => {
  return moment(date).format("DD MMM YYYY - hh:mm:ss");
};

export const renderPrice = (value: string) => {
  return `$ ${value}`;
};
