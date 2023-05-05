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
    this.http.post(this.EndpointService.endpoint+'/Get_Statistics',this.settings).subscribe((res:any) => {
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
    this.http.post(this.EndpointService.endpoint+'/Get_Statistics',this.settings).subscribe((res:any) => {
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
    this.http.post(this.EndpointService.endpoint+'/Get_Statistics',this.settings).subscribe((res:any) => {
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
      this.http.post(this.EndpointService.endpoint+'/Get_Statistics',this.settings).subscribe((res:any) => {
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
        { field: "Name_League", header: "Championnats" },
        { field: "Matches_Betted", header: "Nombre" },
        { field: "Win_Rate", header: "Win rate" },
        { field: "Units", header: "Net" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Cote moyenne" }
      ];
    }
    if (choix === 'Season') {
      this.cols=[
        { field: "Saison", header: "Saisons" },
        { field: "Matches_Betted", header: "Nombre" },
        { field: "Win_Rate", header: "Win rate" },
        { field: "Units", header: "Net" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Cote moyenne" }
      ];
    }
    if (choix === 'OddsClass') {
      this.cols=[
        { field: "Odds_Class", header: "Cotes" },
        { field: "Matches_Betted", header: "Nombre" },
        { field: "Win_Rate", header: "Win rate" },
        { field: "Units", header: "Net" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Cote moyenne" }
      ];
    }
    if (choix === 'Day') {
      this.cols=[
        { field: "Day", header: "Jours" },
        { field: "Matches_Betted", header: "Nombre" },
        { field: "Win_Rate", header: "Win rate" },
        { field: "Units", header: "Net" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Cote moyenne" }
      ];
    }
    if (choix === 'ListMatches') {
      this.cols=[
        { field: "Date", header: "Date" },
        { field: "ID_MATCH", header: "ID_MATCH" },
        { field: "HomeTeam", header: "Domicile" },
        { field: "AwayTeam", header: "Extérieur" },
        { field: "Name_League", header: "Championnat" },
        { field: "Prediction", header: "Prediction" },
        { field: "result", header: "Résultat" },
        { field: "units", header: "Net" },
        { field: "MaxOdds", header: "Cote" }
      ];
    }
    if (choix === 'TypeMatches') {
      this.cols=[
        { field: "TypeMatches", header: "Types" },
        { field: "Matches_Betted", header: "Nombre" },
        { field: "Win_Rate", header: "Win rate" },
        { field: "Units", header: "Net" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Cote moyenne" }
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
