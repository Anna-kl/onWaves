import {IViewCalendar} from "../../app/DTO/views/calendar/IViewCalendar";


const getMonthDaysCount = (year: number, month: number): number => {
  const tmp = new Date(year, month, 0);
 // tmp.setMonth(tmp.getMonth() + 1);
 // tmp.setDate(0);
  return tmp.getDate();
};

export function getDays(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function deleteSeconds(time: string){
  let timeArray = time.split(':');
  if (timeArray.length > 2){
    if (timeArray[2] !== '00'){
      timeArray[2] = '00';
    }
  }
  return `${timeArray[0]}:${timeArray[1]}:${timeArray[2]}`;
}
export function toConstantTime(date: Date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),date.getUTCHours(),
      date.getUTCMinutes(),0);
}

export function setDayInMonth(today: Date, day: number){
  return new Date(today.getFullYear(), today.getMonth(), day);
}

export function setMonth(today: Date, month: number){
  return new Date(today.getFullYear(), month, 1);
}
export function getNameMonth(month: number){
  switch (month){
    case 0:{
        return 'Январь';
    }
    case 1:{
      return 'Февраль';
    }
    case 2:{
      return 'Март';
    }
    case 3:{
      return 'Апрель';
    }
    case 4:{
      return 'Май';
    }
    case 5:{
      return 'Июнь';
    }
    case 6:{
      return 'Июль';
    }
    case 7:{
      return 'Август';
    }
    case 8:{
      return 'Сентябрь';
    }
    case 9:{
      return 'Октябрь';
    }
    case 10:{
      return 'Ноябрь';
    }
    case 11:{
      return 'Декабрь';
    }
    default:{
      return '';
    }
  }
}
export function generateCalendar(year: number, month: number){
  let now = new Date();
  now = new Date(now.getFullYear(), now.getMonth(), now.getDate(),0,0,0);
  let countDays = getMonthDaysCount(year, month + 1 );
  let days: IViewCalendar[][] = [];
  let week: IViewCalendar[] = [];
  let startDays = new Date(year, month, 1).getDay();
  if (startDays === 0){
    startDays = 7;
  }
  let endDays = new Date(year, month, countDays).getDay();
  let i = 1;
  let day = 1;
  while (i < 8){
    if (i < startDays){
      week.push({
        isLast: false,
        isChecked: false,
        ifExist: false,
      });
    } else {
      week.push({
        day,
        isLast: now >= new Date(year, month, day, 0, 1, 0),
        isToday: false,
        isChecked: false,
        ifExist: false,
      });
      day++;
    }
    i++;
  }
  days.push(week);
  week = [];
  while(day <= countDays){
    week.push({
      day,
      isLast: now >= new Date(year, month, day, 0, 1, 0),
      isChecked: false,
      isToday: false,
      ifExist: false,
    });
    day++;
    if (week.length === 7){
      days.push(week);
      week = [];
    }
  }
  while(endDays < 7){
    week.push({
      isLast: now > new Date(year, month, day, 0, 0, 0),
      isChecked: false,
      isToday: false,
      ifExist: false,
    });
    endDays++;
  }
  days.push(week);
  return days;
}

export function comparisonDate(date:string|Date, year: number, month: number, day: number){
  date = new Date(date);

  return !(date.getFullYear() === year && date.getMonth() === month
      && date.getDate() === day);

}

export function compareTime(time: string, date: Date){
  let timeArray = time.split(':');
  if (timeArray.length > 0){
    if (Number.parseInt(timeArray[0]) > date.getHours()){
      return true;
    }
    return Number.parseInt(timeArray[0]) === date.getHours() && Number.parseInt(timeArray[1]) > date.getMinutes();
  }
  return true;
}

export function compareTimeHour(time: string, date: Date){
  let timeArray = time.split(':');
  if (timeArray.length > 0){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number.parseInt(timeArray[0]) - 1, Number.parseInt(timeArray[1]), 0) > date;
  }
  return true;
}

export function localToUTC(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(),
    date.getDate(), 0, 0));
}

export function toLocale(date: Date|string) {
  date = new Date(date);
  return new Date((date.getFullYear(), date.getMonth(),
    date.getDate(), 0, 0)).toLocaleDateString();
}

export function toLocaleTime(date: Date|string) {
  if (typeof(date) === 'string'){
    date = new Date(date);
  }

  return new Date(date.getFullYear(), date.getMonth(),
    date.getDate(), date.getHours() - date.getTimezoneOffset()/60, date.getMinutes());
}

export function UTCToLocale(date: Date|string){
    date = new Date(date);
    let a =  new Date(date.getUTCFullYear(), date.getUTCMonth(),
    date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());
    return a;
  
}

export function stringToTime(date: string|Date){
  let time = date.toString().split(':');
  return new Date(new Date().setHours(Number.parseInt(time[0]),
    Number.parseInt(time[1])))
}

export function parseStringToTime(date: string|Date){
  var myDate = new Date(date);
  myDate = new Date( myDate.getTime() + (myDate.getTimezoneOffset()*60*1000));  
  return myDate;
}


export function parseStringToTimeVariant2(date: string|Date){
  let dttm = date.toString().split('T');
  if (dttm.length>1){
    return dttm[1].slice(0,5);
  }
  var myDate = new Date(date);
  let a = myDate.getUTCHours();
  myDate = new Date(new Date().setHours(myDate.getUTCHours()));  
  return myDate;
}

export function setTime(date: Date, time: string){
  let timeStr = time.split(':');
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number.parseInt(timeStr[0]),
    Number.parseInt(timeStr[1]));
}

export function toHoursMinutesString(text: string){
  let time = text.split(':');
  if (time.length >= 2){
    return `${time[0]}:${time[1]}`;
  }
  return text;
}



