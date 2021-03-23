import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-galerie3',
  templateUrl: './galerie3.component.html',
  styleUrls: ['./galerie3.component.scss']
})
export class Galerie3Component implements OnInit {

  centerFormations=[]
  constructor(private http: HttpClient) {
     
    this.http.get("./assets/constantes/centerFormation.json").subscribe(res => {
      let news:any = res
      this.centerFormations = news
     
    })

 }

  ngOnInit(): void {
  }

}
