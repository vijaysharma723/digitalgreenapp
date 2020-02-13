import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateTime"
})
export class DateTimePipe implements PipeTransform {
  month = {
    1: "जनवरी",
    2: "फ़रवरी",
    3: "मार्च",
    4: "अप्रैल",
    5: "मई",
    6: "जून",
    7: "जुलाई",
    8: "अगस्त",
    9: "सितम्बर",
    10: "अक्टूबर",
    11: "नवंबर",
    12: "दिसम्बर"
  };
  timeZone = {
    am: "प्रातः",
    pm: "शाम"
  };
  transform(value: string, args?: any[]): string {
    // "2020-02-12T06:04:24.807Z"
    const dateObj = new Date(value);
    // converting to dd/mm/yyyy format
    let convertedDate = dateObj.getDate().toString();
    const month = dateObj.getMonth() + 1;
    convertedDate += " " + this.month[month];
    convertedDate += "," + dateObj.getFullYear();

    let timeZone = "am";
    let hour = dateObj.getHours();
    if (hour > 12) {
      timeZone = "pm";
      hour = hour - 12;
    } else if (hour === 12) {
      timeZone = "pm";
    }

    let convertedTime = this.timeZone[timeZone] + " ";

    convertedTime += hour.toString();
    convertedTime += " " + "बजे";

    const convertedDateTime = convertedDate + "  " + convertedTime;
    return convertedDateTime;
  }
}
