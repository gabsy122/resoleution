/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RepairStatus = 'review' | 'quoted' | 'active' | 'resoling' | 'quality_check' | 'shipped' | 'rejected';

export interface StatusUpdate {
  status: RepairStatus;
  timestamp: string;
  note: string;
}

export interface RepairOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shoeBrand: string;
  shoeModel: string;
  shoeSize: string;
  rubberType: string;
  needsRandRepair: boolean;
  customNotes: string;
  images: string[]; // Contains file data URLs of customer's shoe conditions
  status: RepairStatus;
  quotedPrice: number;
  rejectionReason?: string;
  paymentStatus: 'unpaid' | 'paid';
  trackingNumber?: string;
  shippingCarrier?: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusUpdate[];
}
