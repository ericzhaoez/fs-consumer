import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'rentaldetails', loadChildren: './rentaldetails/rentaldetails.module#RentaldetailsPageModule' },  { path: 'current', loadChildren: './current/current.module#CurrentPageModule' },
  { path: 'booking', loadChildren: './booking/booking.module#BookingPageModule' },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
