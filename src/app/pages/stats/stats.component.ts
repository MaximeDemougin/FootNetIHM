import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'stats',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stats.component.html'
})
export class StatsComponent {

  public data:any = []
  constructor(private http: HttpClient) {
    
  }
}
