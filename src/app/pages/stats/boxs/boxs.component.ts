import { Component, OnInit,Input  } from '@angular/core';

@Component({
  selector: 'ngx-boxs',
  templateUrl: './boxs.component.html',
  styleUrls: ['./boxs.component.scss']
})
export class BoxsComponent implements OnInit {
  @Input() titre: string;
  @Input() stat: string;
  @Input() icon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
