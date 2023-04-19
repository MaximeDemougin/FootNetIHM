import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class statsService {

  constructor(private http: HttpClient) { }
  public timeline:any
  getData() {
    const url = 'http://127.0.0.1:5000/get_timeline';
    return this.http.get(url, { observe: 'response' }).toPromise()
      .then(res => {
        this.timeline = res.body;
        const data = this.timeline.data;
        const index = this.timeline.index;
        console.log(this.timeline);
        return { data, index };
      });
  }
  
}


  