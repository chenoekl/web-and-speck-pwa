import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {

  public paragraphs: any[];

  constructor(
    private dataService: DataService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.paragraphs = [
      {
        id: 1,
        name: "§ 12 ABGB",
        law_name: "Allgemeines Bürgerliches Gesetzbuch",
        url: "https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR12017702/NOR12017702.html",
        content: ""
      },
      {
        id: 2,
        name: "§ 132 ZPO",
        law_name: "Zivilprozessordnung",
        url: "https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR12039001/NOR12039001.html",
        content: ""
      }
    ];

    // Request Texts from Document URLs
    this._getParagraphContent();
  }

  /**
   *
   */
  private _getParagraphContent() {
    for (let i = 0; i < this.paragraphs.length; ++i) {
      this.dataService.getContent(this.paragraphs[i].url)
        .subscribe(data => {
          this.paragraphs[i].content = data;
        });
    }
  }

}
