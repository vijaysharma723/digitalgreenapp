import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dateTime',
  pure: false,
})
export class DateTimePipe implements PipeTransform {
  month = {};
  timeZone = [];

  constructor(private readonly translate: TranslateService) {}

  transform(value: string, args?: any[]): string {
    // "2020-02-12T06:04:24.807Z"
    this.updateDateFormatLang();
    const dateObj = new Date(value);
    // converting to dd/mm/yyyy format
    let convertedDate = dateObj.getDate().toString();
    const month = dateObj.getMonth() + 1;
    convertedDate += " " + this.month[month];
    convertedDate += "," + dateObj.getFullYear();

    let timeZone = null;
    let hour = dateObj.getHours();
    let zoneEn = null;
    if (this.translate.currentLang === 'en') {
      timeZone = 'at';
      zoneEn = hour >= 12 ? 'PM' : 'AM';

    } else {
      if (hour >= 5 && hour < 12) {
        timeZone = this.timeZone[0];
      } else if (hour >= 12 && hour < 16) {
        timeZone = this.timeZone[1];
      } else if (hour >= 16 && hour < 20) {
        timeZone = this.timeZone[2];
      } else {
        timeZone = this.timeZone[3];
      }
    }

    let convertedTime = timeZone + " ";

    if ( hour > 12) {
      hour -= 12;
    }
    convertedTime += hour.toString();
    if (this.translate.currentLang === 'en') {
      convertedTime += ' ' + zoneEn;
    } else {
      convertedTime += ' ' + 'बजे';
    }

    const convertedDateTime = convertedDate + "  " + convertedTime;
    return convertedDateTime;
  }

  updateDateFormatLang() {
    this.month = {
      1: this.translate.instant('January'),
      2: this.translate.instant('February'),
      3: this.translate.instant('March'),
      4: this.translate.instant('April'),
      5: this.translate.instant('May'),
      6: this.translate.instant('June'),
      7: this.translate.instant('July'),
      8: this.translate.instant('August'),
      9: this.translate.instant('September'),
      10: this.translate.instant('October'),
      11: this.translate.instant('November'),
      12: this.translate.instant('December'),
    };
    this.timeZone = [
      this.translate.instant('Morning'),
      this.translate.instant('Afternoon'),
      this.translate.instant('Evening'),
      this.translate.instant('Night'),
    ];
  }
}
