export function  createMap(lat: number, lng: number, map: any, ymaps: any): any {
  if (map){
    map.panTo([lat, lng], {
      flying: true
    });
  } else {
    map = new ymaps.Map('map', {
      center: [lat, lng],
      zoom: 14
    });
  }
  const placeMark = new ymaps.Placemark([lat, lng]);
  map.geoObjects.add(placeMark);
  return map;
}
