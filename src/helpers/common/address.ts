import {IViewAddress} from "../../app/DTO/views/IViewAddress";

export function getAddressProfile(address: IViewAddress): string{
    let str = '';
    // if (address.country){
    //   str = `${address.country}\n`;
    // }
    // if (address.region){
    //   str = `${str}, ${address.region}`;
    // }
    if (address.city){
      str = `${str} ${address.city}`;
    }
    if (address.street){
      str = `${str}, ${address.street}`;
    }
    if (address.home){
      str = `${str}, ${address.home}`;
    }
    if (address.apartment){
      str = `${str}, ${address.apartment}`;
    }
    return str;
  }

  export function getFullAddressProfile(address: IViewAddress): string{
    let str = '';
    if (address.country){
      str = `${address.country}\n`;
    }
    if (address.region){
      str = `${str}, ${address.region}`;
    }
    if (address.city){
      str = `${str} ${address.city}`;
    }
    if (address.street){
      str = `${str}, ${address.street}`;
    }
    if (address.home){
      str = `${str}, ${address.home}`;
    }
    if (address.apartment){
      str = `${str}, ${address.apartment}`;
    }
    return str;
  }


export function getAddressProfileStreet(address?: IViewAddress): string{
    let str = '';
    if (address) {
        if (address.street) {
            str = `${address.street}`;
        }
        if (address.home) {
            str = `${str}, ${address.home}`;
        }
        if (address.apartment) {
            str = `${str}, ${address.apartment}`;
        }
    }
    return str;
}

export function getAddressCity(address?: IViewAddress): string {
    if (address) {
        return address.city!;
    }
    return '';
}

export function prepareAddressProfile(address: IViewAddress): string{
  let str = '';

  if (address.street){
    str = `${str}, ${address.street}`;
  }
  if (address.home){
    str = `${str}, ${address.home}`;
  }
  if (address.apartment){
    str = `${str}, ${address.apartment}`;
  }
  return str;
}
