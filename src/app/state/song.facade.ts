import { BehaviorSubject, Observable } from 'rxjs';
import { SongState } from './song.state';
import { Injectable } from "@angular/core";
import { Audio } from '../interfaces/Audio.interface';


@Injectable({
    providedIn: 'root'
})
export class SongFacade {

    constructor(private state: SongState){}

    setValues(songs: Audio[]) {
        this.state.setValues(songs);
    }

    getValues(): Observable<Audio[]> {
        return this.state.getValues();
    }

    setSearchSongs(songs: Audio[]) {
        this.state.setSearchSongs(songs);
    }

    getSearchSongs(): Observable<Audio[]> {
        return this.state.getSearchSongs();
    }

    setSong(song: Audio) {
        this.state.setSong(song);
    }

    getSong(): Observable<Audio> {
        return this.state.getSong();
    }

    updateValues(song: Audio){
        this.state.updateValues(song);
    }

    nextSong() {
        this.state.nextSong();
    }

    previousSong() {
        this.state.previousSong();
    }

    setPlay(play: boolean){
        return this.state.setPlay(play);
    }

    getPlay(): Observable<boolean>{
        return this.state.getPlay();
    }

    setSearching(searching: boolean) {
        this.state.setSearching(searching);
    }

    getSearching(): Observable<boolean> {
        return this.state.getSearching();
    }

}