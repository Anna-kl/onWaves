export function getHours(time: number){
    time = Math.floor(time/60);
    return (time%24).toString();
}

export function getDays(time: number){
  return  Math.floor(time/1440);
}

export function getHoursString(time: number){
    time = Math.floor(time/60);
    let str = (time%24).toString();
    if (str.length === 1){
      return `0${str}`;
    } else {
      return str;
    }
}

export function getMinutes(time: number){
    return time % 60;
}

export function getTimeFromFields(hoursStr: string, minutesStr: string){
  let hours = parseInt(hoursStr);
  let minutes = parseInt(minutesStr);
  return hours * 60 + minutes;
}
export function getMinutesStr(time: number){
  let str =  (time % 60).toString();
  switch (str){
    case '0': {
      return '00';
    }
    default: {
      return str;
    }
  }
}
