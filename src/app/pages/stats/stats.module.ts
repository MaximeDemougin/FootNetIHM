import { NgModule } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { StatsComponent  } from './stats.component';
import { AdvancedExampleServerComponent } from './table/table.component';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsPieComponent } from './graph/graph.component';
import { TimelineComponent } from './timeline/timeline.component';

import * as echarts from 'echarts';
@NgModule({
  imports: [
    NbCardModule,
    NbInputModule,
    ThemeModule,
    NbButtonModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    NbIconModule,
    NgxEchartsModule,
 
  ],
  declarations: [
    StatsComponent,AdvancedExampleServerComponent,EchartsPieComponent,TimelineComponent,
  ],
})
export class StatsModule { }
