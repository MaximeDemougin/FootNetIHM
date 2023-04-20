import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpointService } from '../pages.service';
@Injectable({
  providedIn: 'root'
})
export class statsService {

  constructor(private http: HttpClient, public EndpointService: endpointService) { }
  public timeline:any
  getData() {
    const url = this.EndpointService.endpoint+'/get_timeline';
    return this.http.get(url, { observe: 'response' }).toPromise()
      .then(res => {
        this.timeline = res.body;
        const data = this.timeline.data;
        const index = this.timeline.index;
        return { data, index };
      });
  }
  
}


  