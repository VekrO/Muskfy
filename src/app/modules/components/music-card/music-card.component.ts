import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Audio } from "src/app/interfaces/Audio.interface";
import { SearchService } from "src/app/services/search.service";
import { SongFacade } from "src/app/state/song.facade";

@Component({
    selector: 'app-music-card',
    templateUrl: './music-card.component.html',
    styleUrls: ['./music-card.component.css']
})
export class MusicCardcomponent {

    @Input() public song!: Audio;
    @Input() public listening: boolean = false;
    public loading: boolean = false;

    constructor(private searchService: SearchService, private songFacade: SongFacade) {}

    async download(event: MouseEvent, music: Audio){

        event.stopPropagation();
        
        this.loading = true;
        const download$ = this.searchService.download(music.id.videoId);
        await lastValueFrom(download$).then((data)=>{

                this.loading = false;
                music.downloaded = data.downloaded;
                music.audio_url = data.audio_url;
                this.songFacade.updateValues(data);

                console.log('fez download: ', data);
            }).catch((err: HttpErrorResponse) => {

                this.loading = false;
                console.log('ERRO: ', err.error.message);

            });

        

    }

    listen(event: Event, song: Audio) {
        event.stopPropagation();
        this.songFacade.setSong(song);
    }

}