import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Document } from '../../document';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {

  public savedDocuments: Document[] = [];

  constructor(
    private dataService: DataService,
    public sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  /**
   * ngOnInit
   *  Initializes the component
   * 
   * @returns void
   */
  ngOnInit(): void {
    // Get Saved Documents 
    this._getSavedDocuments();

    // Request Texts from Document URLs
    this._getDocumentContent();
  }

  /**
   * remove
   *  Removes the chosen document from the currently saved
   *  Documents and updates the localStorage.
   * 
   * @param document 
   * @returns void
   */
  public remove(document: Document): void {
    this.savedDocuments = this.savedDocuments.filter(d => d !== document);
    this.dataService.changeDocuments(this.savedDocuments);
    this.snackBar.open(`${document.name} has been removed from your local workspace.`, 'OK');
  }

  /**
   * openAddDialog
   *  Opens the Add Document Dialog
   * 
   * @returns void
   */
  public openAddDialog(): void {
    this.dialog.open(AddDialogComponent, { data: {} });
  }

  /**
   * _getDocuments
   *  Gets the currently saved Documents from the localStorage
   *  Observable.
   * 
   * @returns void
   */
  private _getSavedDocuments() {
    this.dataService.currentDocumentsSource
      .subscribe(data => {
        if (data !== null) {
          this.savedDocuments = data;
        }
      })
  }

  /**
   * _getDocumentContent
   *  Gets the Content of the saved Documents from the RIS API
   *  and adds it to the saved Documents Structure.
   * 
   * @returns void
   */
  private _getDocumentContent() {
    if (this.savedDocuments) {
      for (let i = 0; i < this.savedDocuments.length; ++i) {
        this.dataService.getContent(this.savedDocuments[i].url)
          .subscribe(data => {
            this.savedDocuments[i].content = data;
            this.dataService.changeDocuments(this.savedDocuments);
          });
      }
    }
  }

}
