import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SearchService {
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
    };

    private dataUrl = 'https://demo.dataverse.org/api/search?q=';

    private itemsSubject = new BehaviorSubject<any>(null);
    public items = this.itemsSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    search(term: string): Observable<any> {
        return this.http.get<any>(this.dataUrl + term, this.httpOptions)
            .pipe(delay(500)) // simulate a slower network since this API is so fast
            .pipe(
                tap(response => {
                    this.itemsSubject.next(response.data.items);
                    console.log(`fetched items for ${term}`);
                })
            );
    }
}
