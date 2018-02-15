import { Component, Injectable, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {

  fromModel(date: Date): NgbDateStruct {
    return (date && date.getFullYear) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}

@Component({
  selector: 'ngbd-datepicker-adapter',
  templateUrl: './datepicker-adapter.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})

export class NgbdDatepickerAdapter {

  model1: Date;

  @Output() onChanged = new EventEmitter<Date>()
  sendDate() {
    this.onChanged.emit(this.model1);
  }

  get today() {
    return new Date();
  }
}