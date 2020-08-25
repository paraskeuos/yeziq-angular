import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../../models/word.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  private wordsArray: Observable<Word[]>;
  private wordsUrl = 'http://localhost:3000/words/';

  constructor(private http: HttpClient) { }

  public getWords(data): Observable<Word[]> {
    this.wordsArray = this.http.post<Word[]>(this.wordsUrl, data);
    return this.wordsArray;
  }

  public getKnownWordCount(data): Observable<number> {
    return this.http.post<number>(this.wordsUrl + 'count', data);
  }

  public wordIsKnown(data): Observable<any> {
    return this.http.post<any>(this.wordsUrl + 'knownOne', data);
  }

  public wordsOnPageAreKnown(data): Observable<any> {
    return this.http.post<any>(this.wordsUrl + 'knownMany', data);
  }

  public addYeziq(data): Observable<any> {
    return this.http.post<any>(this.wordsUrl + 'yeziq', data);
  }

  // UNAVAILABLE
  /* public getTranslations(data): Observable<Array<string>> {
    return this.http.post<Array<string>>(this.wordsUrl + '/translate', data);
  } */
}
