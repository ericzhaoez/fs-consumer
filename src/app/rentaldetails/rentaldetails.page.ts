import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User, Rental } from '../models';
import { RentalService } from '../services/rental.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rentaldetails',
  templateUrl: './rentaldetails.page.html',
  styleUrls: ['./rentaldetails.page.scss'],
})
export class RentaldetailsPage implements OnInit {

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

    this.rentalService.getAllRentals();
    this.rentals = this.rentalService.rentals;
  
    // this.rentaldetails = new Rental();
    // this.rentaldetails.city = "Tel Aviv";
    // this.rentaldetails.country = "Israel";
    // this.rentaldetails.duration = 30;
    // this.rentaldetails.cityimage = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/07/05/11/tel-aviv-jaffa.jpg?w968h681";
    
  //   let rental1 = new Rental();
  //     rental1.id = 1;
  //     rental1.city = "Tel Aviv";
  //     rental1.country = "Israel";
  //     rental1.duration = 30;
  //     rental1.price = 300;

  // let rental2 = new Rental();
  //     rental2.id = 2;
  //     rental2.city = "Berlin";
  //     rental2.country = "Germany";
  //     rental2.duration = 18;
  //     rental2.price = 260;

  // let rental3 = new Rental();
  //     rental3.id = 3;
  //     rental3.city = "Cape Town";
  //     rental3.country = "South Africa";
  //     rental3.duration = 4;
  //     rental3.price = 310;

  // let rental4 = new Rental();
  //     rental4.id = 4;
  //     rental4.city = "Sydney";
  //     rental4.country = "Australia";
  //     rental4.duration = 10;
  //     rental4.price = 280;

      }

    ngOnInit() {
      // let receivedQueryParams = function(data: any) {
    //   console.log(data);
    //   console.log(data.params.rentalName);

    //   /*will not work*/ this.nameOfRental = data.params.rentalName;
    // }

    let arrow = (data: any) => {
      // this.city = data.params.rentalName;
      this.id = data.params.rentalId;

      // // Find the right rental by ID
      // this.rentals.forEach(
      //   (rental: Rental) => {
      //     if (rental.id == this.id) {
      //       // Display this rental
      //       this.currentRental = rental;
      //     }
      //   }
      // )
      this.currentRental = this.rentalService.findRentalById(this.id);

      if (!this.currentRental) {
        alert("Rental not found!");
        this.navCtrl.navigateBack("");
      }
    };

    this.activatedRoute.queryParamMap.subscribe(
      // receivedQueryParams,
      arrow
    );

  }
  
    goCreate() {
      this.navCtrl.navigateForward('tabs/tab2');
    }
  
    goRentals() {
      this.navCtrl.navigateForward('tabs/tab3');
    }

}
  

