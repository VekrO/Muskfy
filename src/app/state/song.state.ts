import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Audio } from '../interfaces/Audio.interface';

@Injectable({
    providedIn: 'root'
})
export class SongState {

    private _songs: BehaviorSubject<Audio[]> = new BehaviorSubject<Audio[]>([]);
    private _searchSongs: Subject<Audio[]> = new Subject<Audio[]>();

    private _song: Subject<Audio> = new Subject<Audio>();

    private listening!: Audio;
    private _play: Subject<boolean> = new Subject();
    private _searching: Subject<boolean> = new Subject();

    public setValues(songs: Audio[]){
        this._songs.next(songs);
    }

    public getValues(): Observable<Audio[]> {
        return this._songs.asObservable();
    }

    public setSearchSongs(songs: Audio[]){
        this._searchSongs.next(songs);
    }

    public getSearchSongs(): Observable<Audio[]> {
        return this._searchSongs.asObservable();
    }

    public setSong(song: Audio) {
        this.listening = song;
        this._song.next(song);
    }

    public getSong(): Observable<Audio> {
        return this._song.asObservable();
    }
    
    public updateValues(song: Audio) {
        this._songs.next([...this._songs.getValue(), song]);
    }

    public nextSong() {

        let index = this._songs.getValue().indexOf(this.listening);
        if(index >= 0 && index < this._songs.getValue().length - 1){
            this.setSong(this._songs.getValue()[index + 1])
        }else{
            index = 0;
            this.setSong(this._songs.getValue()[index])
        }
        
    }

    public previousSong() {
        let index = this._songs.getValue().indexOf(this.listening);
        let songsLength = this._songs.getValue().length;

        if (index >= 0) {
          if (index === 0) {
            // Se o índice for 0, significa que a música atual é a primeira da lista
            // Nesse caso, definimos a última música da lista como a música atual
            this.setSong(this._songs.getValue()[songsLength - 1]);
          } else {
            // Caso contrário, definimos a música anterior como a música atual
            this.setSong(this._songs.getValue()[index - 1]);
          }
        }
      }

      public getPlay(): Observable<boolean> {
        return this._play.asObservable();
      }

      public setPlay(play: boolean) {
        this._play.next(play);
      }

      public getSearching(): Observable<boolean> {
        return this._searching.asObservable();
      }

      public setSearching(searching: boolean) {
        this._searching.next(searching);
      }

}