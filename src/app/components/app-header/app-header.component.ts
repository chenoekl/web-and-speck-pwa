import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  /**
   * ngOnInit
   *  Initializes the component
   * 
   * @returns void
   */
  ngOnInit(): void {

  }

  /**
   * refresh
   *  Refreshes the Remote Data
   * 
   * @returns void
   */
  public refresh(): void {
    // ToDo: Refresh logic for Document Content
  }

  /**
   * openAddDialog
   *  Opens the Add Document Dialog
   * 
   * @returns void
   */
  public openAddDialog(): void {
    this.dialog.open(AddDialogComponent, {
      data: {}
    });
  }
}
