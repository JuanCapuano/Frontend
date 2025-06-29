import { Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderComponent } from './pages/order/order.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyOrdersComponent } from './pages/myOrders/my-orders.component';
import { PaysComponent } from './pages/pays/pays.component';

export const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'myOrders', 
        component: MyOrdersComponent,
      },
      {
        path: 'order', 
        component: OrderComponent
      },
      {path: 'login', 
        component:LoginComponent
      },
      {path: 'register',
         component:RegisterComponent
      },
      {
        path: 'pays',
        component: PaysComponent,
      }
    ],
  },
];


