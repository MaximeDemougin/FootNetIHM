import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbThemeService } from '@nebular/theme';
@Component({
  selector: 'ngx-timeline',
  //templateUrl: './timeline.component.html',
  template: `
    <div echarts [options]="option" class="echart"></div>
  `,
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  constructor(private http: HttpClient,private theme: NbThemeService) {}
  themeSubscription: any;

  option: any = {};
  data:any;


  ngOnInit(): void {
    const url ='http://127.0.0.1:5000/get_timeline';
    
    this.http.get(url,{ observe:'response'}).subscribe((res)=>{
      this.data = res.body
      console.log(this.data)
      const n: number = this.data.length;
      const list: number[] = [];

      for (let i = 1; i <= n; i++) {
        list.push(i);
      }
      console.log(list);
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const echarts: any = config.variables.echarts;
      const colors: any = config.variables;
      this.option = {
        backgroundColor: echarts.bg,
        color : [colors.info],
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
            lineStyle: {
              color: colors.info,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
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
          data: list
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Gain net',
            data: this.data,
            type: 'line',
            smooth: true
          }
        ]
      };
    });
  })
    
    
  }

}
