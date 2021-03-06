import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Section } from '../../models/section';
import { Wedding } from '../../models/wedding';
import { Guest, GuestStates } from '../../models/guest';

import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sections: Section[];
  private wedding: Wedding;
  private guest: Guest;
  paramsSub: Subscription;

  constructor(private http: Http, private guestService: GuestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['guest_id'])
      .subscribe(guest_id => {
        if (guest_id) {
          this.http.get(`guest/${guest_id}`)
            .subscribe(result => {
              this.guest = result.json();
              this.guestService.setGuest(this.guest);

              if (this.guest.status === undefined) {
                const seenGuest = { ...this.guest, status: GuestStates.Seen, _wedding: this.guest._wedding.id };
                let bodyString = JSON.stringify(seenGuest); // Stringify payload
                let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                let options = new RequestOptions({ headers: headers });

                this.http.put(`guest/${guest_id}`, bodyString, options)
                  .map((res: Response) => res.json())
                  .subscribe(result => {
                    console.log(result)
                  });
              }
            });
        }
      });
    /*Uncomment these lines for testing*/
    // this.http.get('guest')
    //         .subscribe(result => {
    //           this.guest = result.json()[0];
    //           this.guestService.setGuest(this.guest);
    //           console.log(this.guest);
    //         });

    this.http.get('wedding')
      .subscribe(result => {
        //For now just take the first
        this.wedding = result.json()[0];

        this.http.get('Section/story')
          .subscribe(result => {
            this.sections = result.json();
          });
      });
  }
}
