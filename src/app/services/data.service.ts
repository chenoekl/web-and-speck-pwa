/*
 * Copyright (c) 2018 ADVOKAT Unternehmensberatung GREITER & GREITER GmbH
 * ==>
 *
 * Erstellt: CHE - Thu Nov 08 2018
 *
 * Abhängikeiten:
 * ==>
 *
 * Beschreibung:
 * ==>
 *
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';


import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Document } from '../document';
import { DOCUMENTS } from '../document-mock';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'text/html'
  }),
  responseType: 'text' as 'text'
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private documentsSource = new BehaviorSubject<Document[]>(JSON.parse(localStorage.getItem('currentDocuments')));
  public currentDocumentsSource = this.documentsSource.asObservable();

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) { }

  /**
   * changeDocuments
   * 
   * @param documents
   * @returns void 
   */
  public changeDocuments(documents: Document[]): void {
    localStorage.setItem('currentDocuments', JSON.stringify(documents));
    this.documentsSource.next(documents);
  }

  /**
   * getDocuments
   *  Reads the DOCUMENTS from the Mock Data.
   */
  public getDocuments() {
    return DOCUMENTS;
  }

  /**
   * getContent
   *
   * @param url Request URL
   * @returns Observable with text as result
   */
  public getContent(url: string): Observable<any> {
    let apiURL = `${url}`;
    return this.http.get(apiURL, httpOptions)
      .pipe(
        catchError(this.handleError('getContent', 'Inhalt konnte leider nicht geladen werden. Bitte versuchen Sie es noch einmal.', [
          'Inhalt konnte leider nicht geladen werden. Bitte versuchen Sie es noch einmal.'
        ]))
      );
  }

  /**
  * handleError
  * Handelt Fehler die bei einer HTTP Operation aufgetreten sind.
  * Lässt die App weiterlaufen.
  *
  * @param operation - Name der Aktion die fehlerhaft war
  * @param message - Nachricht an den User
  * @param result - Optionaler Wert welches als Observable Ergebnis zurückgegeben wird.
  * @returns Observable<T>
  */
  private handleError<T>(operation: string = 'operation', message: string, result?: T) {
    return (error: any): Observable<T> => {
      // Log Error
      this.log(error);

      // Print Message with Snackbar
      this.snackBar.open(error.message, 'OK');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * log
   * Ruft den Message Service auf um Nachrichten an den User auszugeben
   *
   * @param message Nachricht an den User
   * @param type success|error|info|warnign für Toast Rendering
   * @returns void
   */
  private log(error): void {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
  }
}
