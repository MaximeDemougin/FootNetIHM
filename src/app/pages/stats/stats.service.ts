import { Injectable,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpointService } from '../pages.service';
@Injectable({
  providedIn: 'root'
})
export class statsService {

  constructor(private http: HttpClient, public EndpointService: endpointService) { }
  public timeline:any
  public settings:any = []
  
  getData(settings:any) {
    console.log("settings",settings)
    const url = this.EndpointService.endpoint+'/get_timeline';
    return this.http.post(url,settings, { observe: 'response' }).toPromise()
      .then(res => {
        this.timeline = res.body;
        console.log("test",this.timeline)
        const data = this.timeline.data;
        const index = this.timeline.index;
        return { data, index };
      });
  }
  
}


  