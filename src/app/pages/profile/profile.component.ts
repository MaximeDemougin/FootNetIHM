import { Component,TemplateRef, ViewChild , OnInit,ChangeDetectorRef  } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbAuthJWTToken } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { endpointService } from '../pages.service';
import { userService } from '../users.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbSelectComponent } from '@nebular/theme';

import { NbTokenService } from '@nebular/auth';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit{
  public userName:string
  public picture:string

  message:string
  ok:boolean = true
  showMessages:boolean = false
  payload:any
  all_leagues:any
  leagues:any 
  data:any
  user:any
  constructor(private authService: NbAuthService,private dialogService: NbDialogService,
             public EndpointService: endpointService,public UserService: userService,private http: HttpClient,
             private tokenService: NbTokenService,private cdr: ChangeDetectorRef,) {}


  createPostRequest(data: any): Observable<any> {
    const url = this.EndpointService.endpoint+'/user/change';
    console.log(data)
    return this.http.post<any>(url, data);
  }

  user_settings:any

  value: [];
  strategy: any[] = [
        { name: 'Home', value: 2 },
        { name: 'Draw', value: 1 },
        { name: 'Away', value: 0 }
    ];
  rangeValues: number[] = [1, 10];
  //userLeagues = ['Premier League', 'Serie A'];
  isInUserLeagues(league: string) {
    //console.log(this.userLeagues.includes(league))
    return this.user.id_leagues.includes(league);
  }

  async ngOnInit() {
    this.UserService.getUserInfo().subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.http.get(this.EndpointService.endpoint+'/get_leagues_used', { observe: 'response' }).subscribe((res) => {
        console.log(this.user)
        this.all_leagues = res.body;
        this.leagues = this.all_leagues.filter(league => !this.user.id_leagues.includes(league));
        console.log(this.leagues)
      })
      this.value = this.user.strategy
      console.log(this.user.rangeCotes)
      this.rangeValues = this.user.rangeCotes
      console.log(this.rangeValues)
      this.cdr.detectChanges(); // Trigger change detection
    });
    

  }


  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }


  selectedItems: any[] = [];
  onSelected(selectedItems: any[]) {
    this.selectedItems = this.all_leagues.filter(league => !selectedItems.includes(league));
    console.log(this.selectedItems);
  }

  changes(inputName: string,newPicture: string){
    console.log(this.value)
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {

      const postData = {userName: inputName,picture : newPicture,id_leagues : this.selectedItems,strategy:this.value,rangeCotes:this.rangeValues,token : token };
      console.log(postData)
      this.createPostRequest(postData).subscribe(
      response => {
        console.log(response.token);
        const token = new NbAuthJWTToken(response.token,"email");
        console.log(token)
        this.tokenService.set(token)
  .subscribe(token => {
    this.ok = true;
    this.showMessages = true;
  });

      },
      error => {
        this.ok = false;
        this.showMessages = true;
        console.log(error);
      }
    );
      
    });
    console.log("ok changes")
  
  }
  
}