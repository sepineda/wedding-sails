import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { GuestService } from '../../services/guest.service';
import { Guest, GuestStates } from '../../models/guest';
import { Wedding } from '../../models/wedding';
import { Section } from '../../models/section';
import { DateFormatService } from '../../services/date-format.service';

@Component({
  selector: 'wedding-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  guest: Guest;
  wedding: Wedding;
  sections: Section[];
  paramsSub: Subscription;

  constructor(private guestService: GuestService, private http: Http, private dateFormatService: DateFormatService, private route: ActivatedRoute) { }

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


    this.http.get('wedding')
      .subscribe(result => {
        //For now just take the first
        this.wedding = result.json()[0];

        this.http.get('Section/confirm')
          .subscribe(result => {
            this.sections = result.json();
          });
      });
  }

  getFullDate() {
    return this.dateFormatService.format(this.wedding.date);
  }

}
