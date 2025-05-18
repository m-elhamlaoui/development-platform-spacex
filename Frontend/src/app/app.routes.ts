import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // there is no home defined switched to search
    {path :'home',loadComponent:()=> import('./components/scene/scene.component').then((c)=> c.SceneComponent)},
    {path :'recherche',loadComponent:()=> import('./components/search/search.component').then((c)=> c.SearchComponent)},
    {path :'réservation',loadComponent:()=> import('./components/booking/booking.component').then((c)=> c.BookingComponent)},
    {path :'liste_voyages',loadComponent:()=> import('./components/trip-list/trip-list.component').then((c)=> c.TripListComponent)},
    {path :'precessPayment',loadComponent:()=> import('./components/checkout/checkout.component').then((c)=> c.CheckoutComponent)},
];
