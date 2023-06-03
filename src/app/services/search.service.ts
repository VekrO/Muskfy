import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Audio } from "../interfaces/Audio.interface";

@Injectable({
    providedIn: 'root'
})

export class SearchService {

    constructor(private http: HttpClient){}

    public search(query: string): Observable<Audio[]> {
        return this.http.get<Audio[]>('http://localhost:3000/search/' + query)
    }

    public download(video_id: string): Observable<Audio> {
        return this.http.post<Audio>('http://localhost:3000/download/', {'video_id': video_id})
    }

}