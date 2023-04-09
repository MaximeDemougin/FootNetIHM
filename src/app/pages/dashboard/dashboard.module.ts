import { NgModule } from '@angular/core';
import { NbCardModule,
  NbAccordionModule, NbButtonModule,
  NbTagModule,NbLayoutModule, NbDatepickerModule, NbInputModule,NbTabsetModule,NbProgressBarModule,   } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AccordionMatchsComponent } from './accordion-matchs/accordion-matchs.component';
import { NbIconModule } from '@nebular/theme';
import { NbListModule } from '@nebular/theme';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbAccordionModule,
    NbButtonModule,
    NbTagModule ,
    NbLayoutModule,
    NbInputModule,
    NbDatepickerModule,
    FormsModule,
    NbTabsetModule,
    NbIconModule,
    NbListModule,
    NbProgressBarModule,
  ],
  declarations: [
    DashboardComponent, AccordionMatchsComponent
  ],schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule {


}

