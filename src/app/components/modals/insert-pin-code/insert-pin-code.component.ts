import { Component, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecordService } from 'src/services/record.service';
import {catchError, firstValueFrom, tap, Observable, of, Subscription, take} from "rxjs";


@Component({
  selector: 'app-insert-pin-code',
  templateUrl: './insert-pin-code.component.html',
  styleUrls: ['./insert-pin-code.component.scss'],
  providers: [RecordService]
})
export class InsertPinCodeComponent {


    pinForm: FormGroup<any>;
    isSuccess = signal(false);
    @Input() recordId: string|null = null;
    amount = 0;

    close() {
      this._modal.close();
    }

    constructor(
      private _modal: NgbActiveModal,
      private _api: RecordService,
      private _group: NonNullableFormBuilder
    ){
      this.pinForm = this._group.group(
        {
            pin1: ['', [Validators.required, Validators.maxLength(1)]],
            pin2: ['', [Validators.required, Validators.maxLength(1)]],
            pin3: ['', [Validators.required, Validators.maxLength(1)]],
            pin4: ['', [Validators.required, Validators.maxLength(1)]],
        }
      )
    }

    setPinCode() {
      if (!!this.recordId){
        let data = this.pinForm.getRawValue();
        let pin = `${data['pin1']}${data['pin2']}${data['pin3']}${data['pin4']}`;
        this._api.ckeckPin(this.recordId, pin).pipe(
          tap(result => 
            {
              this.isSuccess.set(result.isSuccess);
              this.amount = result.amount;
      }),
          take(1)
        ).subscribe();
      }
    }

}
