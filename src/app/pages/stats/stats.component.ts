import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'ngx-stats',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  endpoint:string = 'https://footnetapi.onrender.com'
  tableau = '';

  cols:any = [];
  statistics: any[] = [];

  public res:any = []
  constructor(private http: HttpClient) {}

  onRadioButtonClick(value: string) {
    this.tableau = value;
    console.log(this.tableau);
    this.http.get(`${this.endpoint}/Get_Table?group=${value}`).subscribe((res: any) => {
    if (value === 'League') {
    this.cols=[
      { field: "Name_League", header: "League" },
      { field: "Matches_Betted", header: "Matches Betted" },
      { field: "Win_Rate", header: "Winrate" },
      { field: "Units", header: "Units" },
      { field: "ROI", header: "ROI" },
      { field: "Mean_Odds", header: "Mean Odds" }
      ];
    }
    if (value === 'Season') {
      this.cols=[
        { field: "Saison", header: "Season" },
        { field: "Matches_Betted", header: "Matches Betted" },
        { field: "Win_Rate", header: "Winrate" },
        { field: "Units", header: "Units" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Mean Odds" }
      ];
    }
    if (value === 'OddsClass') {
      this.cols=[
        { field: "Odds_Class", header: "Odds Class" },
        { field: "Matches_Betted", header: "Matches Betted" },
        { field: "Win_Rate", header: "Winrate" },
        { field: "Units", header: "Units" },
        { field: "ROI", header: "ROI" },
        { field: "Mean_Odds", header: "Mean Odds" }
      ];
      }
      if (value === 'Day') {
        this.cols=[
          { field: "Day", header: "Day" },
          { field: "Matches_Betted", header: "Matches Betted" },
          { field: "Win_Rate", header: "Winrate" },
          { field: "Units", header: "Units" },
          { field: "ROI", header: "ROI" },
          { field: "Mean_Odds", header: "Mean Odds" }
        ];
        }
        if (value === 'ListMatches') {
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
          if (value === 'TypeMatches') {
            this.cols=[
              { field: "TypeMatches", header: "Type Matches" },
              { field: "Matches_Betted", header: "Matches Betted" },
              { field: "Win_Rate", header: "Winrate" },
              { field: "Units", header: "Units" },
              { field: "ROI", header: "ROI" },
              { field: "Mean_Odds", header: "Mean Odds" }
            ];
            }
    this.statistics = res;
    });
  }
}