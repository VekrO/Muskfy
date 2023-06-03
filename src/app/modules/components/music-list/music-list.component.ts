import { SearchService } from 'src/app/services/search.service';
import { SongFacade } from './../../../state/song.facade';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BehaviorSubject, Observable, lastValueFrom } from "rxjs";
import { ApiService } from 'src/app/services/api.service';
import { Audio } from 'src/app/interfaces/Audio.interface';

@Component({
    selector: 'app-music-list',
    templateUrl: './music-list.component.html',
    styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

    constructor(private api: ApiService, private songFacade: SongFacade){}

    public songs: Audio[] = [];
    public listeningStates: boolean[] = [];
    public playing: boolean = false;
    public searching: boolean = false;

    ngOnInit(): void {
        
        this.getAll();

        this.songFacade.getValues().subscribe((songs: Audio[]) => {
            console.log('atualizado: ', songs);
            this.songs = songs;
        });

        this.songFacade.getSong().subscribe((song: Audio)=>{
            let index = this.songs.findIndex((x) => x.id.videoId == song.id.videoId);
            this.listeningStates = [];
            this.listeningStates[index] = true;
        });

        this.songFacade.getPlay().subscribe({
            next: (play: boolean) => {
                this.playing = play;
            }
        });

        this.songFacade.getSearching().subscribe({
            next: (searching: boolean) => {
                this.searching = searching;
            }
        });
        
    }

    async getAll(){

        const songs$ = this.api.getAll();
        const songs = await lastValueFrom(songs$);
        let index = Math.floor(Math.random() * songs.length);
        this.listen(index, songs[index]);

        console.log('SONGS: ', songs);
        

        // Envia as músicas para a listagem.
        this.songFacade.setValues(songs);

    }

    listen(index: number, song: Audio) {
        this.listeningStates = []
        this.listeningStates[index] = true;
        this.songFacade.setSong(song);
    }

    listenRandom() {
        
        if(this.playing){
            this.songFacade.setPlay(false);
        }else{
            this.songFacade.setPlay(true);
        }

    }

}