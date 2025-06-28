import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { OrderService } from '../order.service';
import { PRODUCTOS, RESTAURANTES } from './mock';
import { CIUDADES } from './mock';


@Component({
  selector: 'app-order.component',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  formulario: FormGroup;
  error = '';
  success = '';
  apiService: any;
  constructor(private fb: FormBuilder, private orderService : OrderService) {
    this.formulario = this.fb.group({
      restaurantId: [null, [ Validators.required, Validators.min(1) ]],
      products: [[], [ Validators.required , Validators.minLength(1) ]],
      location: this.fb.group({
        street: ["", [ Validators.required, Validators.minLength(4) ]],
        number: [null, [ Validators.required, Validators.min(1) ]],
        cityId: [null, [ Validators.required, Validators.min(1) ]],
        location: this.fb.group({
          lat: [null, [ Validators.required, Validators.min(-90), Validators.max(90) ]],
          lng: [null, [ Validators.required , Validators.min(-180), Validators.max(180) ]]
        })

    })
    });

  }

   restaurantes = RESTAURANTES;
   cuidades = CIUDADES;
   productos = PRODUCTOS;
   

   async enviarOrden() {
    if (this.formulario.invalid) {
      this.error = 'Por favor, completa todos los campos';
      this.success = '';
      return;
    }
    try {
      this.error = '';

      const raw = this.formulario.value;

    
      if (typeof raw.products === 'string') {
       raw.products = raw.products
         .split(',')
         .map((id: string) => Number(id.trim()))
         .filter((id: number) => !isNaN(id));
    }

      await this.orderService.crearOrden(raw);
      this.formulario.reset();
      this.success = 'Orden registrada exitosamente.';
    } catch (error: any) {
      this.error ='Error al registrar la orden';
      this.success = '';
    }
  }
}
