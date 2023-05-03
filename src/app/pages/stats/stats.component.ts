import { Component, OnInit,ChangeDetectorRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';
import { endpointService } from '../pages.service';
import { userService } from '../users.service';
import { style } from '@angular/animations';

@Component({
  selector: 'ngx-stats',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stats.component.html',
  styleUrls : ['./stats.component.scss']
})
export class StatsComponent {

  public data:any = []
  constructor(private http: HttpClient, public EndpointService: endpointService, public UserService: userService,
    private cdr: ChangeDetectorRef) {
    
  }
  public stats:any = []
  value: number[];
  strategy: any[] = [
        { name: 'Home', value: 2 },
        { name: 'Draw', value: 1 },
        { name: 'Away', value: 0 }
    ];
  rangeValues: number[] = [1, 7];
  public all_leagues:any = []
  public leagues:any = []
  public user:any = []
  public id_leagues:any = []
  public userLeagues:any = []
  public settings:any = []
  tableau = ''
  async ngAfterViewInit() {

    this.UserService.getUserInfo().subscribe(user => {
      this.user = user;
      this.http.get(this.EndpointService.endpoint+'/get_leagues_used', { observe: 'response' }).subscribe((res) => {
        this.all_leagues = res.body;
        this.leagues = this.all_leagues.filter(league => !this.user.id_leagues.includes(league));
        this.id_leagues = this.leagues;

        this.fonctionBidon()
        
      })
      
      this.tableau = 'Day';
      this.value = this.user.strategy
      this.rangeValues = this.user.rangeCotes
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  isInUserLeagues(league: string) {
    //console.log(this.userLeagues.includes(league))
    return this.user.id_leagues.includes(league);
  }
  onSelected(event) {
    this.leagues = event
    this.settings = {
      "strategy": this.value,
      "rangeValues": this.rangeValues,
      "id_leagues": event
    }
    console.log(this.settings)
    this.http.post('http://localhost:5000/Get_Statistics',this.settings).subscribe((res:any) => {
      this.stats = res;
      console.log(this.stats);
    })
    this. onRadioButtonClick(this.tableau)
  }
  onRangeChange(event) {
    
    this.rangeValues = event.values
    this.settings = {
      "strategy": this.value,
      "rangeValues": this.rangeValues,
      "id_leagues": this.leagues
    }
    console.log(this.settings)
    this.http.post('http://localhost:5000/Get_Statistics',this.settings).subscribe((res:any) => {
      this.stats = res;
      console.log(this.stats);
    })
    this. onRadioButtonClick(this.tableau)
  }
  onChangeStrategy(event) {
    this.value = event.value
    this.settings = {
      "strategy": this.value,
      "rangeValues": this.rangeValues,
      "id_leagues": this.leagues
    }
    console.log(this.settings)
    this.http.post('http://localhost:5000/Get_Statistics',this.settings).subscribe((res:any) => {
      this.stats = res;
    })
    this. onRadioButtonClick(this.tableau)
  }

  fonctionBidon() {
    this.http.get(this.EndpointService.endpoint+'/get_leagues_used', { observe: 'response' }).subscribe((res) => {
      console.log("je viens")
      this.all_leagues = res.body;
      this.leagues = this.all_leagues.filter(league => !this.user.id_leagues.includes(league));
      this.id_leagues = this.leagues;
      this.value = this.user.strategy
      this.settings = {
        "strategy": this.value,
        "rangeValues": this.rangeValues,
        "id_leagues": this.leagues
      }
      console.log(this.settings)
      this.http.post('http://localhost:5000/Get_Statistics',this.settings).subscribe((res:any) => {
        this.stats = res;
      })
      this.onRadioButtonClick('TypeMatches');

    })
  }

  selectedCategory: any = null;
  statisticsLoaded = false;
  cols:any = [];
  statistics: any[] = [];
  settings_table: any;
  public res:any = []
  async onRadioButtonClick(choix: string) {
    this.statisticsLoaded = false;
    this.tableau = choix;
    console.log("button click");
    this.settings_table = {
      "strategy": this.value,
      "rangeValues": this.rangeValues,
      "id_leagues": this.leagues,
      "type": choix
    }
    console.log("wesh",this.settings)
    const res: any = await this.http.post(`${this.EndpointService.endpoint}/Get_Table`, this.settings_table).toPromise();
    if (choix === 'League') {
      this.cols=[
        { field: "Name_League", header: "League" },
        { field: "Matches_Betted", header: "Matches Betted" },
        { field: "Win_Rate", header: "Winrate" },
        { field: "Units", header: "Units" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Mean Odds" }
      ];
    }
    if (choix === 'Season') {
      this.cols=[
        { field: "Saison", header: "Season" },
        { field: "Matches_Betted", header: "Matches Betted" },
        { field: "Win_Rate", header: "Winrate" },
        { field: "Units", header: "Units" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Mean Odds" }
      ];
    }
    if (choix === 'OddsClass') {
      this.cols=[
        { field: "Odds_Class", header: "Odds Class" },
        { field: "Matches_Betted", header: "Matches Betted" },
        { field: "Win_Rate", header: "Winrate" },
        { field: "Units", header: "Units" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Mean Odds" }
      ];
    }
    if (choix === 'Day') {
      this.cols=[
        { field: "Day", header: "Day" },
        { field: "Matches_Betted", header: "Matches Betted" },
        { field: "Win_Rate", header: "Winrate" },
        { field: "Units", header: "Units" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Mean Odds" }
      ];
    }
    if (choix === 'ListMatches') {
      this.cols=[
        { field: "Date", header: "Date" },
        { field: "ID_MATCH", header: "ID_MATCH" },
        { field: "HomeTeam", header: "Home Team" },
        { field: "AwayTeam", header: "Away Team" },
        { field: "Name_League", header: "League" },
        { field: "Prediction", header: "Prediction" },
        { field: "result", header: "Result" },
        { field: "units", header: "Units" },
        { field: "MaxOdds", header: "Odds" }
      ];
    }
    if (choix === 'TypeMatches') {
      this.cols=[
        { field: "TypeMatches", header: "Type Matches" },
        { field: "Matches_Betted", header: "Matches Betted" },
        { field: "Win_Rate", header: "Winrate" },
        { field: "Units", header: "Units" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Mean Odds" }
      ];
    }
    console.log(res);
    console.log(res.Win_Rate);
    console.log(res.Matches_Betted);
    console.log(this.cols);
    this.statistics = res;
    this.statisticsLoaded = true;
  }

}
