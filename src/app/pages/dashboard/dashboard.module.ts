import { NgModule } from '@angular/core';
import { NbCardModule,
  NbAccordionModule, NbButtonModule,
  NbTagModule,NbLayoutModule, NbDatepickerModule, NbInputModule,NbTabsetModule,NbProgressBarModule,   } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AccordionMatchsComponent } from './accordion-matchs/accordion-matchs.component';
import { NbIconModule } from '@nebular/theme';
import { NbListModule,NbSelectModule, } from '@nebular/theme';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
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
    SelectButtonModule,
    SliderModule,
    InputTextModule,
    NbSelectModule,
    ngFormsModule,
    ToolbarModule,
    
  ],
  declarations: [
    DashboardComponent, AccordionMatchsComponent
  ],schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule {


}

