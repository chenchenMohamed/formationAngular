import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-enseignant',
  templateUrl: './sidebar-enseignant.component.html',
  styleUrls: ['./sidebar-enseignant.component.scss']
})
export class SidebarEnseignantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  blurFunction(){
    console.log("blur")
  }
}
