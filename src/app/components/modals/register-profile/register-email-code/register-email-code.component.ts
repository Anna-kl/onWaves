import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ICountry } from 'src/app/DTO/classes/ICountry';
import { AuthServices } from '../../services/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEnterDataComponent } from '../modal-enter-data/modal-enter-data.component';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';

@Component({
  selector: 'app-register-email-code',
  templateUrl: './register-email-code.component.html',
  styleUrls: ['./register-email-code.component.css'],
  providers:[AuthServices]
})
export class RegisterEmailCodeComponent {
    constructor(private authService: AuthServices,
      private activeModal: NgbActiveModal,
      private modalService: NgbModal
    ){}

    returnToPhone() {
          this.activeModal.close();
            let modal = this.modalService.open(ModalRegisterComponent);
    }
    next() {
      let data = this.email.getRawValue()
       this.authService.registerEmail(data).subscribe(
         result => {
            if (result.code === 200){
              this.activeModal.close(); // добавил Муконин. Чтобы закрывалось предыдущее окно.
              const modalRef = this.modalService.open(ModalEnterDataComponent);
              modalRef.componentInstance.session = result.data;
              modalRef.componentInstance.email = data;
            }
            if (result.code === 500){
              this.flagError = true;
              this.messageError = `Превышено число запросов`;
            }
            if (result.code === 204){
              this.flagError = true;
              let validateError = result.data.toString().split('.')[0];
              this.messageError = `Повторно запросить код можно будет через ${validateError}`;
            }
            // if (result.code === 204){
            //
            //   this.flagError = true;
            // }
         }
       )
    }
    closeModal() {
     this.activeModal.close();
    }
    openPolicy(event: MouseEvent) {
    event.preventDefault();
    this.showPolicyModal = true;
  }


  isFormValid(): boolean {
    return !!this.countries && !!this.phone && this.checkRule && !this.error;
  }

  email = new FormControl<string>('', {
  nonNullable: true,
  validators: [
    Validators.required,
    Validators.email,
    Validators.maxLength(254), // практичный предел
  ],
});

  public phone: string = '';
  error: boolean = true;
  policyAgreeError = false;
  countries: ICountry[] = [];
  chCountry!: ICountry;
  showPolicyModal = false;
  validateError: string|undefined = undefined;
  flagError: boolean = false;
  public checkRule = true;
  isShow: boolean = false;
  messageError: string = '';

  returnToEmail() {
  throw new Error('Method not implemented.');
  }

  closePolicy() {
  throw new Error('Method not implemented.');
  }

  }
