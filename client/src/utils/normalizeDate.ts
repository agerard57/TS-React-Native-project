import moment from "moment";

type NormalizeDateManager = (
  date: Date,
  dateFormat: "numericDate" | "longDate"
) => string;

export const normalizeDate: NormalizeDateManager = (date, dateFormat) => {
  switch (dateFormat) {
    case "numericDate":
      //Converts ISO date into a human readable date (eg. 09/13/2022).
      const readableNumericDate = moment(date).format("L");
      return readableNumericDate;

    case "longDate":
      //Converts ISO date into a human readable date (eg. Tuesday, September 13, 2022 5:50 AM).
      const readableLongDate = moment(date).format("LLLL");
      return readableLongDate;
  }
};
