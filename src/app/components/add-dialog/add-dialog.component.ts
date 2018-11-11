import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Document } from '../../document';
import { DataService } from '../../services/data.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  public documents: Document[];
  public savedDocuments: Document[] = [];
  public documentsForm: FormGroup;
  public documentsControl: FormControl;

  /**
   * constructor
   * 
   * @param data 
   * @param dialog 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * ngOnInit
   *  Initializes the component
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.createFormControls();
    this.createFormGroup();

    // Get Saved Documents
    this.dataService.currentDocumentsSource
      .subscribe(data => {
        if (data !== null) {
          this.savedDocuments = data;
        }

        // Get all available Documents
        this.getDocuments();
      });
  }

  /**
   * createFormGroup
   *  Creates the Form and adds all FormControls.
   * 
   * @returns void
   */
  private createFormGroup(): void {
    this.documentsForm = new FormGroup({
      documentsControl: this.documentsControl,
    });
  }

  /**
   * createFormControls
   *  Creates all necessary FormControls.
   * 
   * @returns void
   */
  private createFormControls(): void {
    this.documentsControl = new FormControl(this.documents, Validators.required);
  }

  /**
   * getDocuments
   *  Gets all available Documents and filters them with the already
   *  chosen Documents in the local Storage.
   * 
   * @returns void
   */
  public getDocuments(): void {
    this.documents = this.dataService.getDocuments();
    if (this.savedDocuments) {
      for (let i = 0; i < this.savedDocuments.length; ++i) {
        this.documents = this.documents.filter(d => d.id !== this.savedDocuments[i].id);
      }
    }
  }

  /**
   * close
   *  Closes this Dialog
   * 
   * @returns void
   */
  public close(): void {
    this.dialogRef.close();
  }

  /**
   * save
   *  Gets the selected Document from the SELECT Control and adds it
   *  to the savedDocuments in the LocalStorage
   * 
   * @returns void
   */
  public save(): void {
    // Get Selected Document
    let document = this.documents.filter(d => d.id == this.documentsControl.value)[0];

    this.dataService.getContent(document.url)
      .subscribe(data => {
        // Save Content
        document.content = data;

        // Add to SavedDocuments in LocalStorage
        this.savedDocuments.push(document);
        this.dataService.changeDocuments(this.savedDocuments)

        // Print Message and Close Dialog
        this.snackBar.open(`${document.name} has been added to your local workspace.`, 'OK');
        this.dialogRef.close();
      });
  }
}
