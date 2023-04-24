export class Match {
    Id_match: string;
    Date_match: string;
    homeTeam: string;
    Id_homeTeam: string;
    awayTeam: string;
    Id_awayTeam: string;
    Id_league: string;
    predi : number;
    home_max: number;
    away_max: number;
    draw_max: number;
    link: string;
    HScore: number;
    AScore: number;
    FTR: number;
    date_maj: string;
    
    constructor(Id_match: string,Date_match: string, homeTeam: string,Id_homeTeam:string,  awayTeam: string, Id_awayTeam:string,
       Id_league: string, predi: number, home_max: number, away_max: number, draw_max: number, link: string, HScore: number,
        AScore: number, FTR: number, date_maj: string) {
      this.Id_match = Id_match;
      this.Date_match = Date_match;
      this.homeTeam = homeTeam;
      this.Id_homeTeam = Id_homeTeam;
      this.awayTeam = awayTeam;
      this.Id_awayTeam = Id_awayTeam;
      this.Id_league = Id_league;
      this.predi = predi;
      this.home_max = home_max;
      this.away_max = away_max;
      this.draw_max = draw_max;
      this.link = link;
      this.HScore = HScore;
      this.AScore = AScore;
      this.FTR = FTR;
      this.date_maj = date_maj;

    }
  }