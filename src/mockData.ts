/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RepairOrder } from './types.ts';

// Predefined climbing shoes images for default mock values
export const SHOE_PLA_IMGS = {
  solutions: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=400', // boulder close-up
  instincts: 'https://images.unsplash.com/photo-1601244000763-a20d67482735?auto=format&fit=crop&q=80&w=400', // climbing wall handhold/foot
  anasazis: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400',  // bouldering grip
};

export const INITIAL_REPAIR_ORDERS: RepairOrder[] = [
  {
    id: 'RESO-7842',
    customerName: 'Alex Honnold',
    customerEmail: 'alex@freerider.com',
    customerPhone: '0917-123-4567',
    shoeBrand: 'La Sportiva',
    shoeModel: 'Solution Comp',
    shoeSize: 'EU 41.5',
    rubberType: 'Let Resoler Choose',
    needsRandRepair: true,
    customNotes: 'Toe box is starting to show a small split in the rand on the right shoe. Please inspect if a rand patch is required.',
    images: [SHOE_PLA_IMGS.solutions],
    status: 'review',
    quotedPrice: 0,
    paymentStatus: 'unpaid',
    createdAt: '2026-06-19T10:00:00Z',
    updatedAt: '2026-06-19T10:00:00Z',
    statusHistory: [
      {
        status: 'review',
        timestamp: '2026-06-19T10:00:00Z',
        note: 'Customer submitted repair assessment request. Initial shoe photos uploaded successfully.'
      }
    ]
  },
  {
    id: 'RESO-4910',
    customerName: 'Brooke Raboutou',
    customerEmail: 'brooke@usaclimbing.org',
    customerPhone: '0918-987-6543',
    shoeBrand: 'Scarpa',
    shoeModel: 'Instinct VS Women',
    shoeSize: 'EU 38.0',
    rubberType: 'All-Around Performance Thin (3.5mm - 4.0mm)',
    needsRandRepair: false,
    customNotes: 'Sole is perfectly worn, ready for fresh rubber before breaching the structural leather liner.',
    images: [SHOE_PLA_IMGS.instincts],
    status: 'quoted',
    quotedPrice: 1800.00, // ₱1,500 Half Sole, ₱300 return courier
    paymentStatus: 'unpaid',
    createdAt: '2026-06-18T14:30:00Z',
    updatedAt: '2026-06-19T09:15:00Z',
    statusHistory: [
      {
        status: 'review',
        timestamp: '2026-06-18T14:30:00Z',
        note: 'Customer submitted assessment request.'
      },
      {
        status: 'quoted',
        timestamp: '2026-06-19T09:15:00Z',
        note: 'Resoler reviewed shoe wear. Good repairability candidates. Quoted basic ₱1,500.00 half sole + ₱300.00 secure return shipping back. Ready for payment & customer packaging.'
      }
    ]
  },
  {
    id: 'RESO-3319',
    customerName: 'Janja Garnbret',
    customerEmail: 'janja@champions.sl',
    customerPhone: '0999-555-8888',
    shoeBrand: 'Five Ten',
    shoeModel: 'Hiangle',
    shoeSize: 'EU 39.5',
    rubberType: 'Durable Edging Compound (4.0mm - 4.2mm)',
    needsRandRepair: true,
    customNotes: 'Heavy toe wear from indoor climbing wall training. Both rands have small holes.',
    images: [SHOE_PLA_IMGS.anasazis],
    status: 'resoling',
    quotedPrice: 2400.00, // ₱1,500 sole, ₱600 toe rand rebuild, ₱300 shipping
    paymentStatus: 'paid',
    createdAt: '2026-06-15T08:00:00Z',
    updatedAt: '2026-06-20T11:00:00Z',
    statusHistory: [
      {
        status: 'review',
        timestamp: '2026-06-15T08:00:00Z',
        note: 'Customer submitted assessment.'
      },
      {
        status: 'quoted',
        timestamp: '2026-06-15T15:20:00Z',
        note: 'Resoler assessed: Severe damage to toes requires brand new rands to support rubber bond. Quoted ₱1,500 sole + ₱600 specialized dual rand rebuild + ₱300 shipping. Total: ₱2,400.'
      },
      {
        status: 'active',
        timestamp: '2026-06-16T11:45:00Z',
        note: 'Order finalized. Customer paid, printed mail-in labels, and sent the parcel.'
      },
      {
        status: 'resoling',
        timestamp: '2026-06-20T11:00:00Z',
        note: 'Shoes received at workshop. Original sole shaved off, rands wrapped in heated rubber compound. Currently vulcanizing rubber sole interface!'
      }
    ]
  },
  {
    id: 'RESO-1150',
    customerName: 'Tomoa Narasaki',
    customerEmail: 'tomoa@japanclimbing.jp',
    customerPhone: '0915-001-9999',
    shoeBrand: 'Unparallel',
    shoeModel: 'Flagship',
    shoeSize: 'EU 42.0',
    rubberType: 'Let Resoler Choose',
    needsRandRepair: false,
    customNotes: 'Please choose the best sticky rubber for clean footwork.',
    images: [SHOE_PLA_IMGS.solutions],
    status: 'shipped',
    quotedPrice: 1800.00,
    paymentStatus: 'paid',
    trackingNumber: 'PH-RESOLE-7819',
    shippingCarrier: 'LBC Express',
    createdAt: '2026-06-10T09:00:00Z',
    updatedAt: '2026-06-14T16:45:00Z',
    statusHistory: [
      {
        status: 'review',
        timestamp: '2026-06-10T09:00:00Z',
        note: 'Customer submitted assessment request.'
      },
      {
        status: 'quoted',
        timestamp: '2026-06-10T12:00:00Z',
        note: 'Resoler approved. Quoted ₱1,500 + ₱300 shipping.'
      },
      {
        status: 'active',
        timestamp: '2026-06-11T08:30:05Z',
        note: 'Payment captured.'
      },
      {
        status: 'resoling',
        timestamp: '2026-06-13T10:00:00Z',
        note: 'Shoes came in. Sanding-edge profiling complete.'
      },
      {
        status: 'quality_check',
        timestamp: '2026-06-14T14:00:00Z',
        note: 'Checked bonds, edge beveled, chalked, brushed, and boxed for return shipping.'
      },
      {
        status: 'shipped',
        timestamp: '2026-06-14T16:45:00Z',
        note: 'Dispatched back to client via LBC. Waybill generated.'
      }
    ]
  }
];
