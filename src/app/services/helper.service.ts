import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  DateToString(date: Date, isoDate?){
    let ngay = this.STRTRAN(this.str(date.getDate(),2)," ","0");
    let thang = this.STRTRAN(this.str(date.getMonth()+1,2)," ","0");
    let nam = date.getFullYear();
    if (isoDate != undefined) {
      return nam+"-"+thang+"-"+ngay+"T00:00:00.000Z";
    }
    return ngay+"/"+thang+"/"+nam;
  }

  STRTRAN(str, find, replace) {
    while (str.indexOf(find) > -1) {
      str = str.replace(find, replace);
    }
    return str;
  }
  
    str(num: number, leng?: number, dec?: number) {
    if (leng == undefined) {
      return num.toString();
    }
    if (parseInt(num.toString()).toString().length > leng) {
      return "*".repeat(leng);
    }
    let _dec = 0;
    if (dec != undefined) {
      _dec = dec;
    }
    let spac = "";
    if (leng - num.toString().length > 0) {
      spac = " ".repeat(leng - num.toString().length)
    }
    return spac + Number(num.toPrecision(leng)).toFixed(_dec);
  }

  d_makeDay(date: number, month: number, year: number): Date {
    const ret = new Date(year, month - 1, date);
    return ret;
  }

  LeftTextBeforeCh(str, mark_str) {
    let str1 = '';
    let length = str.indexOf(mark_str);
    if (length > 0) str1 = str.substr(0, length);
    return str1;
  }

}
