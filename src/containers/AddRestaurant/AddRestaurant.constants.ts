import moment from "moment";

export const DEFAULT_TIME = {
  startTime: moment().format("HH:mm"),
  endTime: moment().format("HH:mm"),
};

export const AREA_TYPES = [
  {
    label: "Sarjapur Road",
    value: "SARJAPUR_ROAD",
  },
  {
    label: "Bellandur",
    value: "BELLANDUR",
  },
  {
    label: "Marathahalli",
    value: "MARATHAHALLI",
  },
  {
    label: "Koramangala",
    value: "KORAMANGALA",
  },
  {
    label: "Indiranagar",
    value: "INDIRANAGAR",
  },
  {
    label: "Whitefield",
    value: "WHITEFIELD",
  },
  {
    label: "Electronic City",
    value: "ELECTRONIC_CITY",
  },
  {
    label: "HSR",
    value: "HSR",
  },
  {
    label: "BTM",
    value: "BTM",
  },
  {
    label: "JP Nagar",
    value: "JP_NAGAR",
  },
  {
    label: "Banashankari",
    value: "BANASHANKARI",
  },
  {
    label: "Jayanagar",
    value: "JAYANAGAR",
  },
  {
    label: "Rajajinagar",
    value: "RAJAJINAGAR",
  },
  {
    label: "Yeshwantpur",
    value: "YESHWANTPUR",
  },
];