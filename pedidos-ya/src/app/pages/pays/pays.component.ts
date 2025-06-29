import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pays',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {
  showPayments = false;
  showPaymentByIdModal = false;
  paymentIdInput: number | null = null;
  selectedPaymentById: any = null;
  payments: Payment[] = [
    {
      id: 1,
      orderId: 1,
      status: 'paid',
      transactionDetails: {
        transactionId: 'txn_12345',
        paymentStatus: 'completed'
      },
      paymentMethod: 'MP',
      paymentTime: '2025-04-25T10:00:00Z'
    },
    {
      id: 2,
      orderId: 2,
      status: 'pending',
      transactionDetails: {
        transactionId: 'txn_67890',
        paymentStatus: 'pending'
      },
      paymentMethod: 'VISA',
      paymentTime: '2025-05-01T15:30:00Z'
    }
  ];

  showUpdatePaymentStatusModal = false;
  updatePaymentIdInput: number | null = null;
  updatePaymentStatusInput: string = '';
  updatedPayment: any = null;

  showRefundModal = false;
  refundPaymentIdInput: number | null = null;
  refundReasonInput: string = '';
  refundResult: any = undefined;

  showDeletePaymentModal = false;
  deletePaymentIdInput: number | null = null;
  deletePaymentResult: 'deleted' | 'notfound' | undefined = undefined;

  showPaymentModal = false;
  paymentForm: { orderId: number | null; amount: number | null; method: string; transactionId: string; paymentStatus: string } = {
    orderId: null,
    amount: null,
    method: '',
    transactionId: '',
    paymentStatus: ''
  };
  paymentResult: any = undefined;

  constructor(private router: Router) {
    // También intentar abrir el modal aquí por compatibilidad con navegaciones en caliente
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state?.openPaymentModal) {
      setTimeout(() => this.openPaymentModal(state.orderId), 0);
    }
  }

  ngOnInit() {
    const state = window.history.state;
    if (state?.openPaymentModal) {
      setTimeout(() => this.openPaymentModal(state.orderId), 0);
    }
  }

  viewPaymentById() {
    this.selectedPaymentById = this.payments.find(p => p.id === this.paymentIdInput) || null;
    this.showPaymentByIdModal = true;
  }

  closePaymentByIdModal() {
    this.showPaymentByIdModal = false;
    this.selectedPaymentById = null;
  }

  openUpdatePaymentStatusModal() {
    // Simular PUT: buscar el pago y actualizar el estado
    const idx = this.payments.findIndex(p => p.id === this.updatePaymentIdInput);
    if (idx !== -1 && this.updatePaymentStatusInput) {
      this.payments[idx] = {
        ...this.payments[idx],
        status: this.updatePaymentStatusInput,
        transactionDetails: {
          ...this.payments[idx].transactionDetails,
          paymentStatus: this.updatePaymentStatusInput
        }
      };
      this.updatedPayment = this.payments[idx];
    } else {
      this.updatedPayment = null;
    }
    this.showUpdatePaymentStatusModal = true;
  }

  closeUpdatePaymentStatusModal() {
    this.showUpdatePaymentStatusModal = false;
    this.updatedPayment = null;
  }

  submitUpdatePaymentStatus() {
    const idx = this.payments.findIndex(p => p.id === this.updatePaymentIdInput);
    if (idx !== -1 && this.updatePaymentStatusInput) {
      this.payments[idx] = {
        ...this.payments[idx],
        status: this.updatePaymentStatusInput,
        transactionDetails: {
          ...this.payments[idx].transactionDetails,
          paymentStatus: this.updatePaymentStatusInput
        }
      };
      this.updatedPayment = this.payments[idx];
    } else {
      this.updatedPayment = null;
    }
  }

  openRefundModal() {
    this.showRefundModal = true;
    this.refundPaymentIdInput = null;
    this.refundReasonInput = '';
    this.refundResult = undefined;
  }

  closeRefundModal() {
    this.showRefundModal = false;
    this.refundResult = undefined;
  }

  submitRefund() {
    const idx = this.payments.findIndex(p => p.id === this.refundPaymentIdInput);
    if (idx !== -1 && this.refundReasonInput) {
      // Simular la respuesta del backend
      this.refundResult = {
        ...this.payments[idx],
        status: 'refunded',
        refundDetails: {
          refundTransactionId: 'txn_refund_12345',
          refundStatus: 'completed'
        },
        refundTime: '2025-04-25T12:00:00Z'
      };
      // Actualizar el estado en el array de pagos
      this.payments[idx] = {
        ...this.payments[idx],
        status: 'refunded',
        refundDetails: {
          refundTransactionId: 'txn_refund_12345',
          refundStatus: 'completed'
        },
        refundTime: '2025-04-25T12:00:00Z'
      };
    } else {
      this.refundResult = null;
    }
  }

  openDeletePaymentModal() {
    this.showDeletePaymentModal = true;
    this.deletePaymentIdInput = null;
    this.deletePaymentResult = undefined;
  }

  closeDeletePaymentModal() {
    this.showDeletePaymentModal = false;
    this.deletePaymentResult = undefined;
  }

  submitDeletePayment() {
    const idx = this.payments.findIndex(p => p.id === this.deletePaymentIdInput);
    if (idx !== -1) {
      this.payments.splice(idx, 1);
      this.deletePaymentResult = 'deleted';
    } else {
      this.deletePaymentResult = 'notfound';
    }
  }

  openPaymentModal(orderId?: number) {
    this.showPaymentModal = true;
    this.paymentForm = {
      orderId: orderId || null,
      amount: null,
      method: '',
      transactionId: '',
      paymentStatus: ''
    };
    this.paymentResult = undefined;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
    this.paymentResult = undefined;
  }

  submitPayment() {
    // Simular POST /payment
    this.paymentResult = {
      id: Math.floor(Math.random() * 1000) + 1,
      orderId: this.paymentForm.orderId,
      status: 'paid',
      transactionDetails: {
        transactionId: this.paymentForm.transactionId,
        paymentStatus: this.paymentForm.paymentStatus
      },
      paymentMethod: this.paymentForm.method,
      paymentTime: new Date().toISOString()
    };
    // Opcional: agregar a this.payments
    this.payments.push(this.paymentResult);
  }

  getPagoEstadoDescripcion(estado: string): string {
    switch (estado) {
      case 'pending': return 'Pago pendiente';
      case 'completed': return 'Pago completado';
      case 'refunded': return 'Pago reembolsado';
      default: return estado;
    }
  }
}

interface Payment {
  id: number;
  orderId: number;
  status: string;
  transactionDetails: {
    transactionId: string;
    paymentStatus: string;
  };
  paymentMethod: string;
  paymentTime: string;
  refundDetails?: {
    refundTransactionId: string;
    refundStatus: string;
  };
  refundTime?: string;
}
