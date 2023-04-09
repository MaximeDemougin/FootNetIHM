import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NbButtonModule } from '@nebular/theme';
import { StatsModule } from './stats/stats.module';
import { NbIconModule } from '@nebular/theme';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbButtonModule,
    StatsModule,
    NbIconModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
