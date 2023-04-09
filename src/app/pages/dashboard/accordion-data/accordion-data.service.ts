import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccordionDataService {
  private accordionData = new BehaviorSubject<string>('');

  currentAccordionData = this.accordionData.asObservable();

  constructor() { }

  changeAccordionData(data: string) {
    this.accordionData.next(data);
  }
}
