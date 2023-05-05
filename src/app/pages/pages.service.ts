import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class endpointService {
  // public endpoint: string = 'http://127.0.0.1:5000';
  public endpoint:string = 'https://footnetapi.onrender.com'
  //public endpoint:string = 'https://maximedemougin-sturdy-space-funicular-xxgp7jq49vg2pgjg-5000.preview.app.github.dev'
  
  getEndpoint() {
    return this.endpoint;
  }
}
