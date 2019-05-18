import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import {HttpClient} from '@angular/common/http';

import * as echarts from 'echarts';
import * as _ from 'lodash';

@Component({
  selector: 'app-count-map',
  templateUrl: './count-map.component.html',
  styleUrls: ['./count-map.component.scss']
})
export class CountMapComponent implements OnInit {


    chartOption: any;

    options:any[] = ["a", "b", "c"];
    selectedOption: string;
    ec: any;
    data: any = [

        {"name" : "Charlottenburg-Wilmersdorf", "price_clean" : 112.36, "cleaning_clean" : 34.17, "security_deposit_clean" : 268.88, "minimum_nights" : 9.1, "price_clean_max" : 9000.0, "cleaning_clean_max" : 2000.0, "security_deposit_clean_max" : 4385.0, "minimum_nights_max" : 365},
        {"name" : "Friedrichshain-Kreuzberg", "price_clean" : 62.9, "cleaning_clean" : 25.62, "security_deposit_clean" : 189.5, "minimum_nights" : 5.92, "price_clean_max" : 8600.0, "cleaning_clean_max" : 300.0, "security_deposit_clean_max" : 4404.0, "minimum_nights_max" : 365},
        {"name" : "Lichtenberg", "price_clean" : 67.15, "cleaning_clean" : 20.39, "security_deposit_clean" : 145.11, "minimum_nights" : 5.17, "price_clean_max" : 8000.0, "cleaning_clean_max" : 300.0, "security_deposit_clean_max" : 4000.0, "minimum_nights_max" : 240},
        {"name" : "Marzahn-Hellersdorf", "price_clean" : 58.94, "cleaning_clean" : 21.15, "security_deposit_clean" : 101.03, "minimum_nights" : 9.85, "price_clean_max" : 300.0, "cleaning_clean_max" : 115.0, "security_deposit_clean_max" : 2000.0, "minimum_nights_max" : 900},
        {"name" : "Mitte", "price_clean" : 71.35, "cleaning_clean" : 29.19, "security_deposit_clean" : 221.59, "minimum_nights" : 7.49, "price_clean_max" : 2500.0, "cleaning_clean_max" : 785.0, "security_deposit_clean_max" : 4458.0, "minimum_nights_max" : 1000},
        {"name" : "Neukölln", "price_clean" : 47.95, "cleaning_clean" : 20.54, "security_deposit_clean" : 155.13, "minimum_nights" : 5.63, "price_clean_max" : 500.0, "cleaning_clean_max" : 200.0, "security_deposit_clean_max" : 4000.0, "minimum_nights_max" : 1000},
        {"name" : "Pankow", "price_clean" : 71.19, "cleaning_clean" : 29.94, "security_deposit_clean" : 213.72, "minimum_nights" : 6.81, "price_clean_max" : 5000.0, "cleaning_clean_max" : 640.0, "security_deposit_clean_max" : 4437.0, "minimum_nights_max" : 1000},
        {"name" : "Reinickendorf", "price_clean" : 44.31, "cleaning_clean" : 26.97, "security_deposit_clean" : 214.15, "minimum_nights" : 9.47, "price_clean_max" : 225.0, "cleaning_clean_max" : 250.0, "security_deposit_clean_max" : 4000.0, "minimum_nights_max" : 183},
        {"name" : "Spandau", "price_clean" : 55.6, "cleaning_clean" : 30.14 , "security_deposit_clean" : 202.94, "minimum_nights" : 11.79, "price_clean_max" : 290.0, "cleaning_clean_max" : 100.0, "security_deposit_clean_max" : 2500.0, "minimum_nights_max" : 120},
        {"name" : "Steglitz-Zehlendorf", "price_clean" : 60.67, "cleaning_clean" : 28.09, "security_deposit_clean" : 216.86, "minimum_nights" : 7.68, "price_clean_max" : 1200.0, "cleaning_clean_max" : 120.0, "security_deposit_clean_max" : 4000.0, "minimum_nights_max" : 150},
        {"name" : "Tempelhof-Schöneberg", "price_clean" : 98.15, "cleaning_clean" : 27.55, "security_deposit_clean" : 208.66, "minimum_nights" : 7.14, "price_clean_max" : 6000.0, "cleaning_clean_max" : 250.0, "security_deposit_clean_max" : 4300.0, "minimum_nights_max" : 400},
        {"name" : "Treptow-Köpenick", "price_clean" : 53.49, "cleaning_clean" : 24.99, "security_deposit_clean" : 191.76, "minimum_nights" : 6.48, "price_clean_max" : 390.0, "cleaning_clean_max" : 200.0, "security_deposit_clean_max" : 4000.0, "minimum_nights_max" : 184}
    ];

  constructor(private http: HttpClient ) { }

  async ngOnInit() {
        const geodata = await this.http.get('https://raw.githubusercontent.com/funkeinteraktiv/Berlin-Geodaten/master/berlin_bezirke.geojson').toPromise();
        const data =
        console.log(geodata);
        echarts.registerMap('berlin', geodata);
        this.options = Object.keys(this.data[0]);
        this.chartOption = {
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                min: 40,
                max: 120,
                left: 'left',
                top: 'bottom',
                text: ['Min','Max'],
                calculable: true
            },
            series: [
                {
                    name: 'value',
                    type: 'map',
                    mapType: 'berlin',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: this.data.map((item: any) => ({ name: item.name, value: item.price_clean }) ),
                },
            ],
        };
        console.log(this.chartOption.series[0].data);
        console.log(this.ec);
  }

    onSelectChange(event: any) {
      console.log(event);
      const series = this.data.map((item: any) => ({ name: item.name, value: item[event] }) );
      console.log(series);
      this.chartOption.series[0].data = series;
      this.chartOption.visualMap.min = _.minBy(series, 'value').value;

      this.chartOption.visualMap.max = _.maxBy(series, 'value').value;

      if (this.ec) {
        console.log('reloading');
        this.ec.setOption(this.chartOption);
      }
    }

    onChartInit(event: any) {
      console.log('chart init');
      console.log(event);
      this.ec = event;
    }

}
