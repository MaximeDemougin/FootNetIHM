import { Component, ViewChild, ChangeDetectorRef,TemplateRef, OnInit,AfterViewInit    } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbTabComponent, NbTabsetComponent, NbTagComponent, } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { NbDateService } from '@nebular/theme';
import { AccordionDataService } from './accordion-data/accordion-data.service';
import { NbDialogService } from '@nebular/theme';
import { endpointService } from '../pages.service';
import { userService } from '../users.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { C } from '@angular/cdk/keycodes';
import { of } from 'rxjs';
import { NbSelectComponent } from '@nebular/theme';
import { Console } from 'console';
import {FormControl, FormGroup, Validators} from '@angular/forms';
interface Match {
  Id_match: string;
  Id_league: string;
  Date_match: string;
  homeTeam: string;
  Id_homeTeam: string;
  awayTeam: string;
  Id_awayTeam: string;
  predi: number;
  home_max: number;
  away_max: number;
  draw_max: number;
}

@Component({
  selector: 'ngx-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('item', { static: true }) accordion;
  defaultDate: Date;
  clickedAccordion: any;
  accordionData: any;
  homePlayers_titu : any;
  awayPlayers_titu : any;
  homePlayers_rempl : any;
  awayPlayers_rempl : any;
  homePlayers_blesse: any;
  awayPlayers_blesse: any;
  home_Coach: any;
  away_Coach: any;
  home_formation: any;
  away_formation: any;

  teamComposition: any;
  histo: any;
  histo_home: any;
  histo_away: any;
  histo_home_arr: any;

  histo_icon_home: number;
  histo_icon_away: number;

  features:any;

  clicked: boolean = false;
  show: boolean = false;
  selectedTabMatchs: string = 'Forme';
  // endpoint:string = 'https://footnetapi.onrender.com'
  //endpoint:string = 'http://127.0.0.1:5000'

  today = new Date();
  day = this.today.getDate().toString().padStart(2, "0");
  month = (this.today.getMonth() + 1).toString().padStart(2, "0"); // JavaScript uses 0-based months, so add 1
  year = this.today.getFullYear();

  user_settings:any

  value: number[];
  strategy: any[] = [
        { name: 'Home', value: 2 },
        { name: 'Draw', value: 1 },
        { name: 'Away', value: 0 }
    ];
  rangeValues: number[] = [1, 7];
  constructor(private dialogService: NbDialogService,private authService: NbAuthService, private http: HttpClient, private cdr: ChangeDetectorRef,private datePipe: DatePipe,
    private dateService: NbDateService<Date>,private accordionDataService: AccordionDataService, public UserService: userService,public EndpointService: endpointService, 
    ) {
    this.defaultDate = new Date();
    this.accordionDataService.currentAccordionData.subscribe(data => {
      this.accordionData = data;
      if (typeof this.accordionData.Id_match !== "undefined") {

        // if (this.selectedTabMatchs == 'Composition') {
        this.http.get(this.EndpointService.endpoint+'/get_compos_match?id='+this.accordionData.Id_match, { observe: 'response' }).subscribe((res) => {
        this.teamComposition = res.body;
        this.homePlayers_titu = this.teamComposition.titulaire.home;
        this.awayPlayers_titu = this.teamComposition.titulaire.away;
        this.homePlayers_rempl = this.teamComposition.remplacant.home;
        this.awayPlayers_rempl = this.teamComposition.remplacant.away;
        this.homePlayers_blesse = this.teamComposition.blesse.home;
        this.awayPlayers_blesse = this.teamComposition.blesse.away;
        this.home_Coach = this.teamComposition.entraineur.home;
        this.away_Coach = this.teamComposition.entraineur.away;
        this.home_formation = this.teamComposition.formation.home;
        this.away_formation = this.teamComposition.formation.away;


      });
    // }
    // if (this.selectedTabMatchs == 'Statistiques') {

      this.http.get(this.EndpointService.endpoint+'/get_features_match?id='+this.accordionData.Id_match, { observe: 'response' }).subscribe((res) => {
        
        this.features = res.body;

      });
    // }
    //if (this.selectedTabMatchs == 'Forme') {
      
      this.http.get(this.EndpointService.endpoint+'/get_histo?home_id='+this.accordionData.Id_homeTeam+'&away_id='+this.accordionData.Id_awayTeam+'&date='+this.accordionData.Date_match, { observe: 'response' }).subscribe((res) => {
        
        this.histo = res.body;
        console.log(this.histo);
        // Assuming histo_home is your object

        this.histo_icon_home = this.histo.home.result;
        this.histo_icon_away = this.histo.away.result;

        

      });
    // }
      }

      
    });
  }
  
  selectTab($event: any): void {
    console.log("selectTab $event:", $event.tabTitle)
    this.selectedTabMatchs = $event.tabTitle;
  }

  myMatchs: Match[] = [];
 
  removed_leagues: string[] = [];
  data: any;
  matchesByLeague: any;
  user:any;
  getIcon(result: number): string {
    switch (result) {
      case 1:
        return 'checkmark-circle-2';
      case 0:
        return 'minus-circle';
      case -1:
        return 'close-circle';
      default:
        return '';
    }
  }
  getColor(result: number): string {
    switch (result) {
      case 1:
        return 'success';
      case 0:
        return 'basic';
      case -1:
        return 'danger';
      default:
        return 'black';
    }
  }
  onTagRemove(tag: NbTagComponent): void {
    const removedLeague = this.id_leagues.splice(this.id_leagues.indexOf(tag.text), 1);
    this.removed_leagues.push(removedLeague[0]);
    this.removed_leagues.sort();
  }

  onRemovedTagRemove(tag: NbTagComponent): void {
    const addedLeague = this.removed_leagues.splice(this.removed_leagues.indexOf(tag.text), 1);
    this.id_leagues.push(addedLeague[0]);
    this.id_leagues.sort();
  }
  all_leagues: string[] = [];

  selectedItems: any[] = [];
  onSelected(selectedItems: any[]) {
    this.selectedItems = this.all_leagues.filter(league => !selectedItems.includes(league));
  }
  all_matches: any;
  id_leagues: string[] = [];

  async ngAfterViewInit() {
    // check if the user is authenticated
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
    
      if (token.isValid()) {
        // if the token is valid, get the user info and fetch the matches
        this.UserService.getUserInfo().subscribe(user => {
          this.user = user;
           this.http.get(this.EndpointService.endpoint+'/get_match_day?date='+`${this.year}-${this.month}-${this.day}`, { observe: 'response' }).subscribe((res) => {
            this.data = res.body;
            this.onDateChange(this.defaultDate);
            console.log("Je viens là");
            this.all_matches = this.data
            this.value = this.user.strategy
            this.rangeValues = this.user.rangeCotes

            this.id_leagues = Object.keys(this.data);
            this.all_leagues = this.id_leagues;
            this.id_leagues = this.id_leagues.filter(league => !this.user.id_leagues.includes(league));
            this.id_leagues.sort();
            console.log("ici on filtre : ",this.id_leagues);
            
            // console.log(this.id_leagues)
            // create an object to store matches for each league
            const matchesByLeague: { [id: string]: Match[] } = {};
    
            // iterate over each league and assign matches to a separate array
            this.id_leagues.forEach((id) => {
              matchesByLeague[id] = this.data[id];
            });
            // this.all_matches = matchesByLeague
    
            // assign the matches to the component property
            // console.log(matchesByLeague)

            // Assuming your JSON object is stored in a variable called 'data'
            for (const league in matchesByLeague) {
              if (matchesByLeague.hasOwnProperty(league)) {
                // Get the array of matches for the current league
                const matches = matchesByLeague[league];
                
                // Filter the matches based on the value of the 'predi' variable
                // console.log(matches)
                const filteredMatches = matches.filter(match => {
                  const predi = match['predi'];
                  const homeMax = match['home_max'];
                  const drawMax = match['draw_max'];
                  const awayMax = match['away_max'];
                  
                  let maxOdds = 0;
                  if (predi === 2) {
                    maxOdds = homeMax;
                  } else if (predi === 1) {
                    maxOdds = drawMax;
                  } else if (predi === 0) {
                    maxOdds = awayMax;
                  }
                  else if (predi === 3) {
                    maxOdds = this.rangeValues[0];
                  }
                  
                  return (this.value.includes(predi) || [3].includes(predi))&& 
                          maxOdds >= this.rangeValues[0] && 
                          maxOdds <= this.rangeValues[1]
                });
                
                // Update the league property of the JSON object with the filtered matches
                matchesByLeague[league] = filteredMatches;
              }
            }

            this.matchesByLeague = matchesByLeague;
          });
        });
    } else {
        // if the token is valid, get the user info and fetch the matches
          this.http.get(this.EndpointService.endpoint+'/get_match_day?date='+`${this.year}-${this.month}-${this.day}`, { observe: 'response' }).subscribe((res) => {
            this.data = res.body;
            this.onDateChange(this.defaultDate);
            console.log("Je suis là ngoninit pas connected");
            this.all_matches = this.data
            this.id_leagues = Object.keys(this.data);
            this.id_leagues.sort();
            this.all_leagues = this.id_leagues;
            this.value = [2,1,0]
            // create an object to store matches for each league
            const matchesByLeague: { [id: string]: Match[] } = {};
    
            // iterate over each league and assign matches to a separate array
            this.id_leagues.forEach((id) => {
              matchesByLeague[id] = this.data[id];
            });
            
            // assign the matches to the component property
            this.matchesByLeague = matchesByLeague;
            console.log("id leagues : ",this.id_leagues,this.all_leagues)
          });
    }
  });
  }
  
  onChangeStrategy(event) {
    this.value = event.value;
    console.log("Je viens changer de strategy : ",this.value,this.rangeValues)
    console.log(this.all_matches)
    const matchesByLeague = { ...this.all_matches };

    for (const league in matchesByLeague) {
      if (matchesByLeague.hasOwnProperty(league)) {
        // Get the array of matches for the current league
        const matches = matchesByLeague[league];
        
        // Filter the matches based on the value of the 'predi' variable
        // console.log(matches)
        const filteredMatches = matches.filter(match => {
          const predi = match['predi'];
          const homeMax = match['home_max'];
          const drawMax = match['draw_max'];
          const awayMax = match['away_max'];
          
          let maxOdds = 0;
          if (predi === 2) {
            maxOdds = homeMax;
          } else if (predi === 1) {
            maxOdds = drawMax;
          } else if (predi === 0) {
            maxOdds = awayMax;
          }
          else if (predi === 3) {
            maxOdds = this.rangeValues[0];
          }
          
          return (this.value.includes(predi) || [3].includes(predi))&& 
                  maxOdds >= this.rangeValues[0] && 
                  maxOdds <= this.rangeValues[1]
        });
        
        // Update the league property of the JSON object with the filtered matches
        matchesByLeague[league] = filteredMatches;
      }
    }
    console.log("J'ai fini ",matchesByLeague)

    this.matchesByLeague = matchesByLeague;
  }

  getMatchesForLeague(id: string): Match[] {
    return this.matchesByLeague[id];
  }
  selectedDate: Date;
  onDateChange(event) {
    this.selectedDate = event;
    const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    console.log('Formatted Date: ', formattedDate);

    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
    
      if (token.isValid()) {
        // if the token is valid, get the user info and fetch the matches
        this.UserService.getUserInfo().subscribe(user => {
          this.user = user;
          this.http.get(this.EndpointService.endpoint+'/get_match_day?date='+formattedDate, { observe: 'response' }).subscribe((res) => {
            this.data = res.body;
            console.log("Je viens ici")
            this.all_matches = this.data
            this.id_leagues = Object.keys(this.data);
            this.all_leagues = this.id_leagues;
            this.id_leagues = this.id_leagues.filter(league => !this.user.id_leagues.includes(league));
            this.id_leagues.sort();
            console.log(this.id_leagues)
            
            // create an object to store matches for each league
            const matchesByLeague: { [id: string]: Match[] } = {};
    
            // iterate over each league and assign matches to a separate array
            this.id_leagues.forEach((id) => {
              matchesByLeague[id] = this.data[id];
            });
            for (const league in matchesByLeague) {
                  if (matchesByLeague.hasOwnProperty(league)) {
                    // Get the array of matches for the current league
                    const matches = matchesByLeague[league];
                    
                    // Filter the matches based on the value of the 'predi' variable
                    // console.log(matches)
                    const filteredMatches = matches.filter(match => {
                      const predi = match['predi'];
                      const homeMax = match['home_max'];
                      const drawMax = match['draw_max'];
                      const awayMax = match['away_max'];
                      
                      let maxOdds = 0;
                      if (predi === 2) {
                        maxOdds = homeMax;
                      } else if (predi === 1) {
                        maxOdds = drawMax;
                      } else if (predi === 0) {
                        maxOdds = awayMax;
                      }
                      else if (predi === 3) {
                        maxOdds = this.rangeValues[0];
                      }
                      
                      return (this.value.includes(predi) || [3].includes(predi))&& 
                              maxOdds >= this.rangeValues[0] && 
                              maxOdds <= this.rangeValues[1]
                    });
                    
                    // Update the league property of the JSON object with the filtered matches
                    matchesByLeague[league] = filteredMatches;
                  }
                }
            // assign the matches to the component property
            this.matchesByLeague = matchesByLeague;
          });
        });
    } else {
      this.http.get(this.EndpointService.endpoint+'/get_match_day?date='+formattedDate, { observe: 'response' }).subscribe((res) => {
        this.data = res.body;
        this.all_matches = this.data
        this.id_leagues = Object.keys(this.data);
        this.all_leagues = this.id_leagues;
        console.log(this.id_leagues, this.all_leagues)
        console.log("je suis la")
        // create an object to store matches for each league
        const matchesByLeague: { [id: string]: Match[] } = {};
  
        // iterate over each league and assign matches to a separate array
        console.log(this.id_leagues)
        console.log("data",this.data)
        this.id_leagues.forEach((id) => {
          matchesByLeague[id] = this.data[id];
        });
        
        console.log("matchesByleagues",matchesByLeague)
        for (const league in matchesByLeague) {
          if (matchesByLeague.hasOwnProperty(league)) {
            // Get the array of matches for the current league
            const matches = matchesByLeague[league];
            // Filter the matches based on the value of the 'predi' variable
            // console.log(matches)
            const filteredMatches = matches.filter(match => {
              const predi = match['predi'];
              const homeMax = match['home_max'];
              const drawMax = match['draw_max'];
              const awayMax = match['away_max'];
              
              let maxOdds = 0;
              if (predi === 2) {
                maxOdds = homeMax;
              } else if (predi === 1) {
                maxOdds = drawMax;
              } else if (predi === 0) {
                maxOdds = awayMax;
              }
              else if (predi === 3) {
                maxOdds = this.rangeValues[0];
              }
              
              return (this.value.includes(predi) || [3].includes(predi))&& 
                      maxOdds >= this.rangeValues[0] && 
                      maxOdds <= this.rangeValues[1]
            });
            
            // Update the league property of the JSON object with the filtered matches
            matchesByLeague[league] = filteredMatches;
          }
        }
        this.matchesByLeague = matchesByLeague;
      });
    }
  });
  }
  onChangeCotes(event) {
    console.log("Je viens changer de cotes : ",event)
    this.rangeValues = event.values;
    console.log("Je viens changer de strategy : ",this.rangeValues)
    const matchesByLeague = { ...this.all_matches };

    for (const league in matchesByLeague) {
      if (matchesByLeague.hasOwnProperty(league)) {
        // Get the array of matches for the current league
        const matches = matchesByLeague[league];
        
        // Filter the matches based on the value of the 'predi' variable
        // console.log(matches)
        const filteredMatches = matches.filter(match => {
          const predi = match['predi'];
          const homeMax = match['home_max'];
          const drawMax = match['draw_max'];
          const awayMax = match['away_max'];
          
          let maxOdds = 0;
          if (predi === 2) {
            maxOdds = homeMax;
          } else if (predi === 1) {
            maxOdds = drawMax;
          } else if (predi === 0) {
            maxOdds = awayMax;
          }
          else if (predi === 3) {
            maxOdds = this.rangeValues[0];
          }
          
          return (this.value.includes(predi) || [3].includes(predi))&& 
                  maxOdds >= this.rangeValues[0] && 
                  maxOdds <= this.rangeValues[1]
        });
        
        // Update the league property of the JSON object with the filtered matches
        matchesByLeague[league] = filteredMatches;
      }
    }
    console.log("J'ai fini ",this.all_matches)

    this.matchesByLeague = matchesByLeague;
  }



  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }


  
}
