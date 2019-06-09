import { Injectable } from '@angular/core';
import { Rental } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class RentalService {
  
    public currentRental: Rental;
    public rentaldetails: Rental; 
    public rental: Rental;
    public rentals: Array<Rental> = [];
    public property: Rental;
    public properties: Array<Rental> = [];
  
    constructor(private httpClient: HttpClient) { }
  

// this code doesn't actually work haha i dunno what i was thinking
    // getAllProperties() {
    //   this.properties = [];
    //   this.httpClient
    //       .get("http://localhost:3000/api/properties/")
    //       .subscribe(
    //         (response: any) => { 
    //         this.properties = [];
    //         let property = new Rental();
    //           property.id = response[0].id,
    //           property.name = response[0].name,
    //           property.location = response[0].location,
    //           property.imageUrl = response[0].imageUrl,
    //           property.price = response[0].price

    //         this.properties.push(property);
    //         }
    //       )
    // }



    getAllRentals() {
      this.rentals = [];
    
      let rental1 = new Rental();
        rental1.id = 1;
        rental1.city = "Tel Aviv Hostel";
        rental1.country = "Israel";
        rental1.duration = 30;
        rental1.price = 300;
        rental1.cityimage = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/07/05/11/tel-aviv-jaffa.jpg?w968h681";
    
      let rental2 = new Rental();
        rental2.id = 2;
        rental2.city = "Berlin Hostel";
        rental2.country = "Germany";
        rental2.duration = 18;
        rental2.price = 260;
        rental2.cityimage = "https://www.berlin.de/binaries/asset/image_assets/5244280/ratio_2_1/1554712090/972x486/";
      
      let rental3 = new Rental();
        rental3.id = 3;
        rental3.city = "Cape Town Hostel";
        rental3.country = "South Africa";
        rental3.duration = 4;
        rental3.price = 310;
        rental3.cityimage = "https://d1ljaggyrdca1l.cloudfront.net/wp-content/uploads/sites/5/2018/07/cape-town-aerial-view-greenpoint-stadium-1600x900.jpg";
    
      let rental4 = new Rental();
        rental4.id = 4;
        rental4.city = "Sydney Hostel";
        rental4.country = "Australia";
        rental4.duration = 10;
        rental4.price = 280;
        rental4.cityimage = "https://lonelyplanetimages.imgix.net/mastheads/65830387.jpg?sharp=10&vib=20&w=1200";
    
      this.rentals.push(rental1);
      this.rentals.push(rental2);
      this.rentals.push(rental3);
      this.rentals.push(rental4);
    }
  
    // Returns null if not found.
    findRentalById(id: number): Rental {
      let foundRental: Rental = null;
  
      this.rentals.forEach(
        (rental: Rental) => {
          if (rental.id == id) {
            foundRental = rental;
          }
        }
      );
  
      return foundRental;
    }
  
    findPropertybyId(id: number, cb: Function): Rental {
      let foundProperty: Rental = null;

      this.properties.forEach(
        (property: Rental) => {
          if (property.id == id) {
            foundProperty = property;
          }
        }
      );

      return foundProperty;
    }

  }