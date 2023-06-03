import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Audio } from '../interfaces/Audio.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient){}

    getAll(): Observable<Audio[]> {
        return this.http.get<Audio[]>('http://localhost:3000/getAll/')
    }

    /* getLyricsByTitle(artist: string, title: string): Observable<any> {
        
        const apiUrl = 'https://api.genius.com/search';
        const accessToken = 'g7J_C2601R4E2_ApuMBxk-Kq-P2WM_igdQ0x8p4dl14eB8icQbddtY73g_Ne32mt'; // Substitua com a sua chave de acesso
        
        const params = {
            q: `${artist} ${title}`,
            access_token: accessToken
          };
      
        return this.http.get(apiUrl, { params })

    }

    getLyrics(artistName: string, track: string): Observable<any> {
        const apiKey = '660a4395f992ff67786584e238f501aa';
        const url = `https://api.vagalume.com.br/search.php?apikey=${apiKey}&art=${encodeURIComponent(artistName)}&mus=${encodeURIComponent(track)}`;

        return this.http.get(url)

    }      */ 

}