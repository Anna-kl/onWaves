import { RecordStatus } from "src/app/DTO/enums/recordStatus";
import { INote } from "src/app/DTO/views/records/IViewRecordUser";
import { IViewScheduleBA } from "src/app/DTO/views/schedule/IViewScheduleBA";

export function getColorLine(sch: INote){
    switch (sch.status){
      /* Желтый */
      case RecordStatus.Created:{
        return '#FFAB00';
      }
      /* Синий */
      case RecordStatus.Confirm:{
        return '#0A6ED8';
      }
      /* красный */
      case RecordStatus.Canceled:{
        return '#E24414';
      }
      /* Зеленый */
      case RecordStatus.Success: {
        return '#4FB229';
      }
      case RecordStatus.Pending: {
        return '#ffab00';
      }
    }
    return '#4FB229';
  }

  export function getStatusDone(sch: INote){
    return !(sch.status === RecordStatus.Canceled
        || sch.status === RecordStatus.Success);

  }
