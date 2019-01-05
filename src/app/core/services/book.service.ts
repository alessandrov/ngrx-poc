import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {environment} from '../../../environments/environment';
import {Book} from '../../books/models/book';

@Injectable()
export class BookService {

  private headers: HttpHeaders;
  private bookUrl: string;

  constructor(private store: Store<fromRoot.State>,
              private http: HttpClient) {
    this.bookUrl = environment.bookUrl;
  }

  addHeaders(): void {
    /*const username = localStorage.getItem('user');
    const token = localStorage.getItem('token-' + username);*/
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
      'Authorization': 'Bearer ' + token
    });
  }

  getBooks(): Observable<Book[]> {
    this.addHeaders();
    return this.http.get<Book[]>(this.bookUrl, {headers: this.headers}).map(books => books || []);
  }

  addBook(body): Observable<any> {
    this.addHeaders();
    return this.http.post<Book>(this.bookUrl, body, {headers: this.headers}).map(books => books || []);
  }

  editBook(book): Observable<any> {
    const bookId = book.payload._id;
    const payload = {
      title: book.payload.title,
      author: book.payload.author
    };
    this.addHeaders();
    return this.http.put<Book>(this.bookUrl + bookId, payload, {headers: this.headers})
           .map(books => books || []);
  }

  deleteBook(book): Observable<any> {
    const bookId = book.payload._id;
    return this.http.delete(this.bookUrl + bookId, {headers: this.headers})
      .map(books => books || []);
  }

  /*patchBook(payload, bookId): Observable<any> {
      this.addHeaders();
      return this.http.patch(this.bookUrl + bookId, payload, {headers: this.headers});
        // .map(books => books || []);
    }*/

}
