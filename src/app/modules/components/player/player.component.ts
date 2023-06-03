import { SongFacade } from 'src/app/state/song.facade';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ApiService } from 'src/app/services/api.service';
import { Audio } from 'src/app/interfaces/Audio.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {

  constructor(private songFacade: SongFacade, private api: ApiService) { }

  public playing = false;
  public autoplay = false;
  public index = 0;

  public minutes = 0;
  public seconds = 0;

  public maxMinutes = 0;
  public maxSeconds = 0;

  public player!: HTMLAudioElement;
  public song!: Audio;
  @Output() lyric: EventEmitter<string> = new EventEmitter();


  async ngOnInit() {

    this.initPlayer();

    this.songFacade.getPlay().subscribe({
      next: (play) => {
        
        if(play) {
          this.player.play();
          this.playing = true;
        }else{
          this.player.pause();
          this.playing = false;
        }

      }
    })

    this.songFacade.getSong().subscribe({
      next: (song: Audio) => {
        
        if(this.song != song){

          this.song = song;
          this.player.src = song.audio_url;
          /* this.getArtist(song.snippet.channelTitle, song.snippet.title) */
          console.log('is playing song: ', this.song);
          console.log('is playing: ', this.playing);
          if(this.playing){
            this.player.play();
          }
          
        }
      }
    });
    
  }

  initPlayer() {
    
    this.player = document.querySelector('#player') as HTMLAudioElement;

    this.player.ontimeupdate = () => {
      const currentTime = Math.floor(this.player.currentTime);
      this.minutes = Math.floor(currentTime / 60);
      this.seconds = currentTime % 60;
    }

    this.player.onloadedmetadata = () => {
      this.maxMinutes = Math.floor(this.player.duration / 60);
      this.maxSeconds = Math.floor(this.player.duration % 60);
    }

    this.player.onended = () => {
      this.next();
    }
 
  }

  async play() {

    if (this.playing) {
      this.songFacade.setPlay(false);
    } else {
      this.songFacade.setPlay(true);
    }

  }

  previous() {

    this.songFacade.previousSong();
    if(this.playing){
      this.player.play();
    }

  }

  next() {

    this.songFacade.nextSong();
    if(this.playing){
      this.player.play();
    }
  }

  handleVolume(event: any) {
    this.player.volume = Number((event.target.value / 100).toFixed(2));
  }

  /* getArtist(artist: string, track: string){
    this.api.getLyrics(artist, track).subscribe({
      next: (response: any) => {
        console.log('RESPOSTA DA LETRA: ', response);
        if(response.mus){
          let lyric = (response.mus[0].text).replaceAll('\n', '</br>')
          this.lyric.emit(response.mus[0].text);
        }
      },
    })
  } */

}