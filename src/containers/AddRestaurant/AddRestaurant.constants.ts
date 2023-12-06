import moment from "moment";

export const FIELD_NAMES_FOR_CUSTOM_VALIDATION = ["cuisines", "areaName"];

export const DEFAULT_TIME = {
  startTime: moment().format("HH:mm"),
  endTime: moment().format("HH:mm"),
};
