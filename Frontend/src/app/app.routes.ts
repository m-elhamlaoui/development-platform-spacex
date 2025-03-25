import {Routes} from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},

    {path: 'home', loadComponent: () => import('./components/home/home.component').then((c) => c.HomeComponent)},
    {
        path: 'recherche',
        loadComponent: () => import('./components/search/search.component').then((c) => c.SearchComponent)
    },
    {
        path: 'réservation',
        loadComponent: () => import('./components/booking/booking.component').then((c) => c.BookingComponent)
    },
    {
        path: 'liste_voyages',
        loadComponent: () => import('./components/trip-list/trip-list.component').then((c) => c.TripListComponent)
    },

];
