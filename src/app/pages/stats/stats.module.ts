import { NgModule } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { StatsComponent  } from './stats.component';
import { TableComponent } from './table/table.component';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule ,NbListModule,} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsPieComponent } from './graph/graph.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ButtonModule } from 'primeng/button';
import{TableModule} from 'primeng/table';
import * as echarts from 'echarts';
import { BoxsComponent } from './boxs/boxs.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule as ngFormsModule } from '@angular/forms';
import{NbSelectModule} from '@nebular/theme';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
  imports: [
    NbCardModule,
    NbInputModule,
    ThemeModule,
    NbButtonModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    NbIconModule,
    ButtonModule,
    TableModule,
    SelectButtonModule,
    ngFormsModule,
    NbSelectModule,
    SliderModule,
    NbListModule,
    RadioButtonModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
 
  ],
  declarations: [
    StatsComponent,TableComponent,EchartsPieComponent,TimelineComponent, BoxsComponent,
  ],
})
export class StatsModule { }
