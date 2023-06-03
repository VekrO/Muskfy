import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BehaviorSubject, Observable, lastValueFrom } from "rxjs";
import { Audio } from "src/app/interfaces/Audio.interface";
import { SearchService } from "src/app/services/search.service";
import { SongFacade } from "src/app/state/song.facade";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    
    constructor(private service: SearchService, private songFacade: SongFacade){}

    public query: string = '';
    public loading: boolean = false;
    public loadingStates: boolean[] = [];
    public song!: Audio;
    public searched: boolean = false;

    private bounce: any;

    ngOnInit(): void {
        
        this.songFacade.getSearching().subscribe({
            next: (searching: boolean) => {
                this.searched = searching;
            }
        });

    }

    public search(){

        if(this.query.length > 0){
            clearTimeout(this.bounce);
            this.bounce = setTimeout( async () => {
                if(this.query.length > 0){
                    const search$ = this.service.search(this.query);
                    this.songFacade.setSearching(true);
                    const data = await lastValueFrom(search$);
                    this.songFacade.setSearchSongs(data);
                }
            }, 500);
        } else {
            this.songFacade.setSearching(false);
            this.songFacade.setSearchSongs([]);
        }

    }


}