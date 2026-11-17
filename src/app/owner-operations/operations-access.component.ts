import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ standalone: true, imports: [RouterLink], template: `<section style="max-width:640px;margin:64px auto;padding:24px"><h1>Раздел недоступен</h1><p>«Акции и выплаты» доступны только владельцу OnWaves. Проверьте вход и подключение к сети.</p><a routerLink="/">На главную</a></section>` })
export class OperationsAccessComponent {}
