import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  month = {
            1: "Jan",
            2: "Feb",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
          };
  timeZone = {
            "am": "am",
            "pm": "pm"
  };
  transform(value: string, args?: any[]): string {
    // "2020-02-12T06:04:24.807Z"
    const dateObj = new Date(value);
    // converting to dd/mm/yyyy format
    let convertedDate = dateObj.getDate().toString();
    const month = dateObj.getMonth() + 1;
    convertedDate += ' ' + this.month[month];
    convertedDate += ',' + dateObj.getFullYear();

    let timeZone = 'am';
    let hour = dateObj.getHours();
    if(hour > 12) {
      timeZone = 'pm';
      hour = hour - 12;
    } else if(hour === 12) {
      timeZone = 'pm';
    }
    let convertedTime = hour.toString();
    convertedTime += ':' + dateObj.getMinutes();
    convertedTime += ' ' + this.timeZone[timeZone];
    return convertedDate + ' ' + convertedTime;
  }

}
