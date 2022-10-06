import dayjs from "dayjs";
import dayjsUtc from "dayjs/plugin/utc";
import dayjsTimezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(dayjsUtc);
dayjs.extend(dayjsTimezone);
dayjs.extend(customParseFormat);

export const localDate = {
  current: {
    format: (out: "YYYY-MM-DDTHH:mm:ss"): string => {
      return dayjs().tz("America/Santiago").format(out);
    },
  },
  parse: (value: string, inFormat: string, outFormat: string): string => {
    return dayjs.utc(value, inFormat).format(outFormat);
  },
};
