import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-orders.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  showAllOrdersModal = false;
  showOrderByIdModal = false;
  showIdAlert = false;
  orderIdInput: number | null = null;
  showUpdateOrderModal = false;
  updateOrderData = {
    id: null,
    status: '',
    street: '',
    number: '',
    cityId: null,
    lat: null,
    lng: null
  };
  showPatchOrderModal = false;
  patchOrderData = {
    id: null,
    status: ''
  };
  showDeleteOrderModal = false;
  deleteOrderId: number | null = null;
  selectedOrderById: any = null;

  // Ejemplo de órdenes(mock)
  orders = [
    {
      id: 1,
      estado: 'Pendiente',
      delivery: null,
      ciudad: 'Ciudad A',
      calle: 'Calle 1',
      numero: '123',
      latitud: '-34.6037',
      longitud: '-58.3816'
    },
    {
      id: 2,
      estado: 'En camino',
      delivery: null,
      ciudad: 'Ciudad B',
      calle: 'Calle 2',
      numero: '456',
      latitud: '-34.6158',
      longitud: '-58.4333'
    }
  ];

  openAllOrdersModal() {
    this.showAllOrdersModal = true;
  }

  closeAllOrdersModal() {
    this.showAllOrdersModal = false;
  }

  viewOrderById() {
    if (!this.orderIdInput) {
      this.showIdAlert = true;
      setTimeout(() => this.showIdAlert = false, 2000);
      return;
    }
    this.selectedOrderById = this.orders.find(o => o.id === this.orderIdInput) || null;
    this.showOrderByIdModal = true;
  }

  closeOrderByIdModal() {
    this.showOrderByIdModal = false;
    this.selectedOrderById = null;
  }

  openUpdateOrderModal() {
    this.showUpdateOrderModal = true;
    // Limpiar el formulario
    this.updateOrderData = {
      id: null,
      status: '',
      street: '',
      number: '',
      cityId: null,
      lat: null,
      lng: null
    };
  }

  closeUpdateOrderModal() {
    this.showUpdateOrderModal = false;
  }

  submitUpdateOrder() {
    // Validar que el id no sea null
    if (this.updateOrderData.id === null) return;
    const idx = this.orders.findIndex(o => o.id === this.updateOrderData.id);
    const latitud = this.updateOrderData.lat !== null ? String(this.updateOrderData.lat) : '';
    const longitud = this.updateOrderData.lng !== null ? String(this.updateOrderData.lng) : '';
    if (idx !== -1) {
      this.orders[idx] = {
        id: this.updateOrderData.id,
        estado: this.updateOrderData.status,
        delivery: null,
        ciudad: '', // Puedes mapear cityId a nombre si tienes el catálogo
        calle: this.updateOrderData.street,
        numero: this.updateOrderData.number,
        latitud,
        longitud
      };
    } else {
      this.orders.push({
        id: this.updateOrderData.id,
        estado: this.updateOrderData.status,
        delivery: null,
        ciudad: '',
        calle: this.updateOrderData.street,
        numero: this.updateOrderData.number,
        latitud,
        longitud
      });
    }
    this.closeUpdateOrderModal();
  }

  openPatchOrderModal() {
    this.showPatchOrderModal = true;
    this.patchOrderData = { id: null, status: '' };
  }

  closePatchOrderModal() {
    this.showPatchOrderModal = false;
  }

  submitPatchOrder() {
    if (this.patchOrderData.id === null) return;
    const idx = this.orders.findIndex(o => o.id === this.patchOrderData.id);
    if (idx !== -1) {
      this.orders[idx].estado = this.patchOrderData.status;
    }
    this.closePatchOrderModal();
  }

  openDeleteOrderModal() {
    this.showDeleteOrderModal = true;
    this.deleteOrderId = null;
  }

  closeDeleteOrderModal() {
    this.showDeleteOrderModal = false;
  }

  submitDeleteOrder() {
    if (this.deleteOrderId === null) return;
    this.orders = this.orders.filter(o => o.id !== this.deleteOrderId);
    this.closeDeleteOrderModal();
  }

  getPedidoEstadoDescripcion(estado: string): string {
    switch (estado) {
      case 'pending': return 'Pedido pendiente';
      case 'in_progress': return 'Pedido en proceso';
      case 'delivered': return 'Pedido entregado';
      default: return estado;
    }
  }
}
