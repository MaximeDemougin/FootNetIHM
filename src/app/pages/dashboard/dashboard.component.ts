import { Component, ViewChild, ChangeDetectorRef,TemplateRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbTagComponent, } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { NbDateService } from '@nebular/theme';
import { AccordionDataService } from './accordion-data/accordion-data.service';
import { NbDialogService } from '@nebular/theme';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent {
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

  endpoint:string = 'https://footnetapi.onrender.com'
  // endpoint:string = 'http://127.0.0.1:5000'

  today = new Date();
  day = this.today.getDate().toString().padStart(2, "0");
  month = (this.today.getMonth() + 1).toString().padStart(2, "0"); // JavaScript uses 0-based months, so add 1
  year = this.today.getFullYear();

  constructor(private dialogService: NbDialogService, private http: HttpClient, private cdr: ChangeDetectorRef,private datePipe: DatePipe,private dateService: NbDateService<Date>,private accordionDataService: AccordionDataService) {
    this.defaultDate = new Date();
    this.accordionDataService.currentAccordionData.subscribe(data => {
      this.accordionData = data;
      console.log(this.accordionData.Id_match);
      if (typeof this.accordionData.Id_match !== "undefined") {
        this.http.get(this.endpoint+'/get_compos_match?id='+this.accordionData.Id_match, { observe: 'response' }).subscribe((res) => {
        

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

      this.http.get(this.endpoint+'/get_features_match?id='+this.accordionData.Id_match, { observe: 'response' }).subscribe((res) => {
        
        this.features = res.body;

      });
      
      this.http.get(this.endpoint+'/get_histo?home_id='+this.accordionData.Id_homeTeam+'&away_id='+this.accordionData.Id_awayTeam+'&date='+this.accordionData.Date_match, { observe: 'response' }).subscribe((res) => {
        
        this.histo = res.body;
        this.histo.home.opponent;
        this.histo.away.opponent;
        // Assuming histo_home is your object

        this.histo_icon_home = this.histo.home.result;
        this.histo_icon_away = this.histo.away.result;

        

      });
      }
      
    });
  }

  myMatchs: Match[] = [];
  id_leagues: string[] = [];
  removed_leagues: string[] = [];
  data: any;
  matchesByLeague: any;

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
    console.log(this.clickedAccordion)
    const removedLeague = this.id_leagues.splice(this.id_leagues.indexOf(tag.text), 1);
    this.removed_leagues.push(removedLeague[0]);
    this.removed_leagues.sort();
  }

  onRemovedTagRemove(tag: NbTagComponent): void {
    const addedLeague = this.removed_leagues.splice(this.removed_leagues.indexOf(tag.text), 1);
    this.id_leagues.push(addedLeague[0]);
    this.id_leagues.sort();
  }

  ngOnInit() {
    
    this.http.get(this.endpoint+'get_match_day?date='+`${this.year}-${this.month}-${this.day}`, { observe: 'response' }).subscribe((res) => {
      this.data = res.body;
      this.id_leagues = Object.keys(this.data);

      // create an object to store matches for each league
      const matchesByLeague: { [id: string]: Match[] } = {};

      // iterate over each league and assign matches to a separate array
      this.id_leagues.forEach((id) => {
        matchesByLeague[id] = this.data[id];
      });

      // assign the matches to the component property
      this.matchesByLeague = matchesByLeague;
    });
  }

  getMatchesForLeague(id: string): Match[] {
    return this.matchesByLeague[id];
  }
  selectedDate: Date;
  onDateChange(event) {
    this.selectedDate = event;
    const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    console.log('Formatted Date: ', formattedDate);

    this.http.get(this.endpoint+'/get_match_day?date='+formattedDate, { observe: 'response' }).subscribe((res) => {
      this.data = res.body;
      this.id_leagues = Object.keys(this.data);

      // create an object to store matches for each league
      const matchesByLeague: { [id: string]: Match[] } = {};

      // iterate over each league and assign matches to a separate array
      this.id_leagues.forEach((id) => {
        matchesByLeague[id] = this.data[id];
      });

      // assign the matches to the component property
      this.matchesByLeague = matchesByLeague;
    });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }
  
}
