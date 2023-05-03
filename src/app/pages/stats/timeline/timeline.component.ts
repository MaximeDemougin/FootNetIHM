import { Component, OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbThemeService } from '@nebular/theme';
import { statsService } from '../stats.service';
import { ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'ngx-timeline',
  //templateUrl: './timeline.component.html',
  // template: `
  //   <div echarts [options]="options" [merge]="mergeOption" [loading]="loading" class="chart" (chartInit)="getData()"></div>
  // `,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent  {
  constructor(private http: HttpClient,private theme: NbThemeService, private api:statsService,private cdr: ChangeDetectorRef) {}
  themeSubscription: any;
  @Input() settings: any;
  // options: any = {};
  data:any;
  mergeOption: any;
  loading = false;
  ngOnChanges(changes: SimpleChanges) {
    if (changes.settings) {
      this.getData();
    }
  }
  private updateView() {
    console.log("change",this.settings)
    // Logic to update the component's view based on the new value of the settings property
  }
  options = {
    // backgroundColor: echarts.bg,
    // color : [colors.info],
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        onZero: false,
        // lineStyle: {
        //   color: colors.info,
        // },
      },
      axisLabel: {
        textStyle: {
          // color: echarts.textColor,
        },
      },
      axisPointer: {
        label: {
          formatter: params => {
            return (
              'Gain net  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
            );
          },
        },
      },
      data: []
    },
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            // color: echarts.axisLineColor,
          },
        },
        splitLine: {
          lineStyle: {
            // color: echarts.splitLineColor,
          },
        },
        axisLabel: {
          textStyle: {
            // color: echarts.textColor,
          },
        },
      },
    ],
    series: [
      {
        name: 'Gain net',
        data: [],
        type: 'line',
        lineStyle: {
          smooth: 0.8 // use a tension of 0.5 for the spline
        }
      }
    ]
  };

  getData() {
    this.cdr.detectChanges();
    console.log("timeline : ",this.settings);
    this.loading = true;
    this.api
  .getData(this.settings)
  .then((result) => {
    console.log(result);
    const data = result.data;
    const index = result.index;
    this.mergeOption = {
      xAxis: {
        type: 'category',
        data: index,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data,
          type: 'line',
        },
      ],
    };
  }).catch((e) => {
    /** Error Handler */
  })
  .then(() => {
    this.loading = false;
  });

  }


}
