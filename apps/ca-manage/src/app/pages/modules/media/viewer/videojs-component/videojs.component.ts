import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-videojs',
  template: `
    <video
      preload="none"
      id="video_{{ idx }}"
      class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
      controls
      preload="auto"
      width="640"
      height="264"
    ></video>
  `
})
export class VideoJSComponent implements OnInit, AfterViewInit {
  // index to create unique ID for component
  @Input() idx?: string;

  // video asset url
  @Input() url: any;

  // declare player var
  private player: any;

  // constructor initializes our declared vars
  constructor() {
    this.url = false;
    this.player = false;
  }

  ngOnInit() {}

  // use ngAfterViewInit to make sure we initialize the videojs element
  // after the component template itself has been rendered
  ngAfterViewInit() {
    // ID with which to access the template's video element
    const videoId = 'video_' + this.idx;
    this.player = videojs(videoId, {
      aspectRatio: '16:9',
      preload: 'auto',
      controls: true,
      autoplay: false,
      muted: true
    });

    this.player.src({
      src: this.url,
      type: 'application/x-mpegURL',
      withCredentials: true
    });

    this.player.ready(() => {
      // Store the video object
      const id = videoId;

      // Make up an aspect ratio
      const aspectRatio = 264 / 640;

      // internal method to handle a window resize event to adjust the video player
      const resizeVideoJS = () => {
        const width = document?.getElementById(id)?.parentElement?.offsetWidth;

        this.player.width(width);
        this.player.height(width! * aspectRatio);
      };

      // Initialize resizeVideoJS()
      resizeVideoJS();

      // Then on resize call resizeVideoJS()
      window.onresize = resizeVideoJS;
    });
  }
}
