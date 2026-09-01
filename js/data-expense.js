/**
 * WCB Medical & Travel Expense Request - Data Models & Datasets
 */
const ExpenseDatasets = {
  default: {
    claimNumber: "20042047",
    workerName: "Madeleine Willson",
    header: {
      address: "333 Broadway Winnipeg, MB R3C 4W3",
      phone: "(204) 954-4321",
      tollFree: "1-855-954-4321",
      website: "wcb.mb.ca"
    },
    prescriptionDrugs: [
      { drugName: "Naproxen", prescriptionDate: "February 28, 2024", datePurchased: "February 29, 2024", healthcareProvider: "Dr. Best", paidAmount: 20.00 }
    ],
    overTheCounterDrugs: [
      { drugName: "Advil", datePurchased: "March 28, 2024", paidAmount: 8.00, sellerName: "Shoppers Drug Mart", reason: "Pain" }
    ],
    medicalSupplies: [
      { itemPurchased: "Tensor", datePurchased: "February 28, 2024", wasPrescribed: true, healthcareProvider: "Dr. Best", paidAmount: 10.00, sellerName: "Shoppers DrugMart" }
    ],
    parking: [
      { facilityAddress: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada", date: "March 28, 2024", paidAmount: 10.00, meterUsed: true, meterNumber: "12245" }
    ],
    mileage: [
      { appointmentDate: "March 28, 2024", facilityAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3,Canada", kmRoundTrip: 20 }
    ],
    busTaxiFare: [
      { appointmentDate: "March 28, 2024", startingAddress: "", facilityAddress: "HSC Winnipeg Women’s Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada", transportType: "Bus", paidAmount: 3.00 },
      { appointmentDate: "March 27, 2024", startingAddress: "25 Furby St, Winnipeg MB R3C2A2, Canada", facilityAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada", transportType: "Taxi", paidAmount: 15.00 }
    ]
  },
  minimal: {
    claimNumber: "20042047",
    workerName: "Madeleine Willson",
    prescriptionDrugs: [
      { drugName: "Amoxicillin 500mg", prescriptionDate: "April 02, 2024", datePurchased: "April 03, 2024", healthcareProvider: "Dr. Best", paidAmount: 14.50 }
    ],
    overTheCounterDrugs: [],
    medicalSupplies: [],
    parking: [],
    mileage: [],
    busTaxiFare: [
      { appointmentDate: "April 03, 2024", startingAddress: "Home", facilityAddress: "Clinic", transportType: "Bus", paidAmount: 3.25 }
    ]
  },
  stressTest: {
    claimNumber: "20042047",
    workerName: "Madeleine Willson (Stress Test - Multi Month Claim)",
    prescriptionDrugs: [
      { drugName: "Naproxen 500mg", prescriptionDate: "Jan 10, 2024", datePurchased: "Jan 11, 2024", healthcareProvider: "Dr. Best", paidAmount: 22.50 },
      { drugName: "Cyclobenzaprine 10mg", prescriptionDate: "Jan 18, 2024", datePurchased: "Jan 18, 2024", healthcareProvider: "Dr. Best", paidAmount: 18.20 },
      { drugName: "Gabapentin 300mg", prescriptionDate: "Feb 01, 2024", datePurchased: "Feb 02, 2024", healthcareProvider: "Dr. Best", paidAmount: 34.00 },
      { drugName: "Naproxen Refill", prescriptionDate: "Feb 15, 2024", datePurchased: "Feb 16, 2024", healthcareProvider: "Dr. Best", paidAmount: 22.50 },
      { drugName: "Physiotherapy Gel", prescriptionDate: "Mar 01, 2024", datePurchased: "Mar 02, 2024", healthcareProvider: "Dr. Best", paidAmount: 15.75 }
    ],
    overTheCounterDrugs: [
      { drugName: "Advil Extra Strength", datePurchased: "Jan 12, 2024", paidAmount: 11.99, sellerName: "Shoppers Drug Mart", reason: "Acute pain" },
      { drugName: "Robaxacet Platinum", datePurchased: "Jan 22, 2024", paidAmount: 16.49, sellerName: "Rexall Pharmacy", reason: "Spasms" },
      { drugName: "Voltaren Emulgel", datePurchased: "Feb 20, 2024", paidAmount: 19.99, sellerName: "Costco", reason: "Joint pain" }
    ],
    medicalSupplies: [
      { itemPurchased: "Tensor Bandage", datePurchased: "Jan 10, 2024", wasPrescribed: true, healthcareProvider: "Dr. Best", paidAmount: 12.50, sellerName: "Shoppers" },
      { itemPurchased: "Lumbar Support", datePurchased: "Jan 19, 2024", wasPrescribed: true, healthcareProvider: "Dr. Best", paidAmount: 45.00, sellerName: "Orthotics Plus" },
      { itemPurchased: "Posture Brace", datePurchased: "Feb 18, 2024", wasPrescribed: true, healthcareProvider: "Dr. Best", paidAmount: 65.00, sellerName: "Medigas" }
    ],
    parking: [
      { facilityAddress: "333 St Mary Ave, Winnipeg", date: "Jan 15, 2024", paidAmount: 12.00, meterUsed: true, meterNumber: "M-1049" },
      { facilityAddress: "HSC Physiotherapy Wing", date: "Jan 25, 2024", paidAmount: 14.50, meterUsed: false, meterNumber: "Lot 4 Ticket #884" },
      { facilityAddress: "St. Boniface Specialist Clinic", date: "Feb 22, 2024", paidAmount: 15.00, meterUsed: false, meterNumber: "Lot B Ticket #102" }
    ],
    mileage: [
      { appointmentDate: "Jan 15, 2024", facilityAddress: "HSC Sherbrook Clinic", workplaceAddress: "WCB, 333 Broadway", kmRoundTrip: 24 },
      { appointmentDate: "Jan 25, 2024", facilityAddress: "Pan Am Clinic", workplaceAddress: "WCB, 333 Broadway", kmRoundTrip: 18 },
      { appointmentDate: "Feb 22, 2024", facilityAddress: "St. Boniface Hospital", workplaceAddress: "WCB, 333 Broadway", kmRoundTrip: 16 }
    ],
    busTaxiFare: [
      { appointmentDate: "Jan 12, 2024", startingAddress: "25 Furby St", facilityAddress: "440 Edmonton St", transportType: "Taxi", paidAmount: 16.50 },
      { appointmentDate: "Jan 18, 2024", startingAddress: "25 Furby St", facilityAddress: "HSC Women's Hospital", transportType: "Bus", paidAmount: 3.15 },
      { appointmentDate: "Feb 02, 2024", startingAddress: "25 Furby St", facilityAddress: "440 Edmonton St", transportType: "Taxi", paidAmount: 17.00 }
    ]
  }
};
