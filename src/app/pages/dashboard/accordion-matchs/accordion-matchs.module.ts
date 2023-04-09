import { NgModule } from '@angular/core';
import { NbCardModule,
  NbAccordionModule, } from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';
import{ AccordionMatchsComponent } from './accordion-matchs.component';


@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbAccordionModule,
  ],
  declarations: [
    
  ],
})
export class DashboardModule {}

