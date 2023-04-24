import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
})
export class TableComponent {


  constructor(http: HttpClient) {
   
  }
}