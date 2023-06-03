import { SongFacade } from '../../../state/song.facade';
import { Component, Input, OnInit } from "@angular/core";
import { Audio } from 'src/app/interfaces/Audio.interface';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

    constructor(private songFacade: SongFacade){}

    @Input() public songs: Audio[] = [];
    public loadingStates: boolean[] = [];
    @Input() public listeningStates: boolean[] = [];

    ngOnInit(): void {
        
        this.songFacade.getSearchSongs().subscribe((values) => {
            this.songs = values;           
        });
        
        this.songFacade.getSong().subscribe((song: Audio)=>{
            let index = this.songs.findIndex((x) => x.id.videoId == song.id.videoId);
            this.listeningStates = [];
            this.listeningStates[index] = true;
        });

    }

}