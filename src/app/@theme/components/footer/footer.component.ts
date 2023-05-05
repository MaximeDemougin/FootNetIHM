import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <div class="row" style="text-align: center; max-width:80%;    justify-content: center;" >
    <p style="text-align: center;justify-content: center;    margin-bottom: 0;">2023 © Tennet Bet Advisor Tous droits réservés</p>
    <p style="text-align: center;justify-content: center;    margin-bottom: 0;">Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le 09-74-75-13-13 (appel non surtaxé) </p>
  </div>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
