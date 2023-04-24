import { Injectable } from '@angular/core';
import { endpointService } from './pages.service';
import { NbAuthService } from '@nebular/auth';
import { NbAuthJWTToken } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbTokenService } from '@nebular/auth';

@Injectable({
  providedIn: 'root',
})

export class userService {
  
  constructor(private authService: NbAuthService,
    public EndpointService: endpointService,private http: HttpClient,
    private tokenService: NbTokenService,) {}
  
  userInfos:any
  payload:any

  createPostRequest_get_user_settings(data: any): Observable<any> {
    const url = this.EndpointService.endpoint+'/get_user_settings';
    console.log(data)
    return this.http.post<any>(url, data);
  }

  getUserInfo(): Observable<any> { // modify the return type
    const token = this.authService.getToken();

    // wrap the logic in a new observable and return it
    return new Observable((observer) => {
      this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
        this.payload = token.getPayload();
        console.log(this.payload);

        this.createPostRequest_get_user_settings(token).subscribe(
          response => {
            this.userInfos ={
              'userName':this.payload.name,
              'picture':this.payload.picture,
              'id_leagues':response.id_leagues,
              'strategy':response.strategy,
              'rangeCotes':response.rangeCotes,
            };
            console.log(this.userInfos);
            observer.next(this.userInfos); // emit the userInfos object
            observer.complete(); // complete the observable
          },
          error => {
            console.log(error);
            observer.error(error); // emit the error
            observer.complete(); // complete the observable
          }
        );
      });
    });
  }
}
