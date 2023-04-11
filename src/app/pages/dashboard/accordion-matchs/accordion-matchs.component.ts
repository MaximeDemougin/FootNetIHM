import { Component, OnInit,ViewChild,Input, ElementRef, Renderer2  } from '@angular/core';
import { Match } from '../../matchs.model';
import { AccordionDataService } from '../accordion-data/accordion-data.service';


@Component({
  selector: 'accordion-matchs',
  templateUrl: './accordion-matchs.component.html',
  styleUrls: ['./accordion-matchs.component.scss']
})
export class AccordionMatchsComponent implements OnInit {
  @ViewChild('item', { static: true }) accordion;
  @Input() match!: Match;	
  
  constructor(private accordionDataService: AccordionDataService) { }

  ngOnInit(): void {

  }
  selectedItem: any;
  isSelected(match: any) {
    return match === this.selectedItem;
  }
  
  toggleBackground(collapsed: boolean,accordionData: any) {
    console.log('collapsed', collapsed);
    this.accordionDataService.changeAccordionData(accordionData);
    if (!collapsed) {
      this.selectedItem = accordionData;
    } else {
      this.selectedItem = null;
    }
  }

}