import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ecommerce';

  public lyric: string = '';
  
  onLyric(lyric: string) {
    this.lyric = lyric;
  }

}
