import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User, Rental } from '../models';
import { RentalService } from '../services/rental.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current',
  templateUrl: './current.page.html',
  styleUrls: ['./current.page.scss'],
})

export class CurrentPage implements OnInit {

    private id: number;
    public city: string;
    public currentRental: Rental;

    public rentaldetails: Rental;
    public loggedIn: boolean = true;
    public rentals: Array<Rental>;
  
    constructor(
      private  navCtrl:  NavController,
      private activatedRoute: ActivatedRoute,
      private rentalService: RentalService
      ) {

    this.currentRental = new Rental();
    this.currentRental.city = "Lisbon";
    this.currentRental.country = "Portugal";
    this.currentRental.price = 240;
    this.currentRental.duration = 48;

      }

    ngOnInit() {
      // let receivedQueryParams = function(data: any) {
    //   console.log(data);
    //   console.log(data.params.rentalName);

    //   /*will not work*/ this.nameOfRental = data.params.rentalName;
    // }


  }
  
    goCreate() {
      this.navCtrl.navigateForward('tabs/tab2');
    }
  
    goRentals() {
      this.navCtrl.navigateForward('tabs/tab3');
    }

}
  


