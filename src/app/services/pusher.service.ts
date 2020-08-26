import Pusher, { Channel } from 'pusher-js';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: Pusher;
  channel: Channel;

  constructor(private authService: AuthService) {
    this.pusher = new Pusher(environment.pusherConfig.key, {
      cluster: environment.pusherConfig.cluster,
      authEndpoint: environment.apiBase + '/pusher/auth',
      auth: {
        headers: this.authService.currentAuthHeaders()
      }
    });

    this.channel = this.pusher.subscribe(
      'private-' + environment.env + '-user-' +
      this.authService.signInUserId
    );
  }
}
