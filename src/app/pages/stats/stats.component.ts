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
  
  getData_name(player_value:string){
    console.log(player_value)
    const url ='http://127.0.0.1:5000/Get_player_by_name?name='+player_value
    this.http.get(url).subscribe((res)=>{
      this.data = res
      console.log(this.data)
    })
  }
}
