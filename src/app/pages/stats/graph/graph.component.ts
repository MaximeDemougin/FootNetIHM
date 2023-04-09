import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { map } from 'lodash';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private http: HttpClient) {}
  private readonly apiUrl = 'http://127.0.0.1:5000/get_nb_poste';

  public data:any = []
  public response:any = []
  ngAfterViewInit() {
    const url ='http://127.0.0.1:5000/get_nb_poste'
    
    this.http.get(url,{ observe:'response'}).subscribe((res)=>{
      this.data = res.body
      console.log(this.data)
      const result = Object.keys(this.data).map((name, index) => ({
        name,
        value: Object.values(this.data)[index],
      }));
      console.log(result);
      
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
  
        const colors = config.variables;
        const echarts: any = config.variables.echarts;
  
        this.options = {
          backgroundColor: echarts.bg,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: Object.keys(this.data),
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Postes',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: result,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      });
    })

    /**const json = '{"Milieudeterrain": 11352,"D\u00e9fenseur": 9964,"Attaquant": 8159,"Gardiendebut": 3788,"Entraineur": 1896,"Findecarri\u00e8re": 1577,"Joueur": 272, "": 83}'
    */
    
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
