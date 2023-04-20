import { Component,TemplateRef, ViewChild } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbAuthJWTToken } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { endpointService } from '../pages.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


import { NbTokenService } from '@nebular/auth';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  public userName:string
  public picture:string
  payload:any
  constructor(private authService: NbAuthService,private dialogService: NbDialogService,
             public EndpointService: endpointService,private http: HttpClient,
             private tokenService: NbTokenService,) {}


  createPostRequest(data: any): Observable<any> {
    const url = this.EndpointService.endpoint+'/user/change';
    console.log(data)
    return this.http.post<any>(url, data);
  }

  getUserInfo(): any {
    const token = this.authService.getToken();
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.payload = token.getPayload()
      console.log
      console.log(this.payload)
      this.userName = this.payload.name
      this.picture = this.payload.picture
      return token.getPayload();
    })
    
   
  }

  ngOnInit() {
    this.getUserInfo()

  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  changes(inputName: string,newPicture: string){
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      console.log(inputName)
      const postData = {userName: inputName,picture : newPicture,token : token };
      this.createPostRequest(postData).subscribe(
      response => {
        console.log(response.token);
        const token = new NbAuthJWTToken(response.token,"email");
        console.log(token)
        this.tokenService.set(token)
  .subscribe(token => {});

      },
      error => {
        console.log(error);
      }
    );
      
    });
    console.log("ok changes")
  
  }
  
}