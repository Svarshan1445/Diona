/**
 * WCB Worker Progress Report - Data Models & Datasets
 */
const ProgressDatasets = {
  default: {
    claimNumber: "20042047",
    workerName: "Madeleine Willson",
    header: {
      address: "333 Broadway Winnipeg, MB R3C 4W3",
      phone: "(204) 954-4321",
      tollFree: "1-855-954-4321",
      website: "wcb.mb.ca"
    },
    returnToWork: {
      status: "returned", // "not_missed" | "not_returned" | "returned"
      returnedDate: "March 15, 2024",
      dutyType: "modified_reduced", // "full_regular" | "full_reduced" | "modified_regular" | "modified_reduced" | "other"
      dutyOtherText: "",
      progressNotes: "Terrible. Testing Testing",
      expectedReturnDate: "",
      concerns: "",
      employerContactName: "",
      employerContactDate: ""
    },
    recovery: {
      fullyRecovered: false,
      recoveryComments: "",
      painScaleRating: 6,
      continuingTreatment: true,
      treatmentProviderType: "Physiotherapist",
      lastTreatmentDate: "March 20, 2024",
      lastTreatmentProvider: "Dr. Best",
      nextTreatmentDate: "April 05, 2024",
      nextTreatmentProvider: "Dr. Best",
      chiroPhysioFrequency: "2 times per week",
      takingMedication: true,
      medicationName: "Naproxen 500mg",
      doingHomeExercises: true,
      homeExercisesList: "Lumbar stabilization stretches, pelvic tilts, seated hamstring stretches, 3 sets daily."
    },
    otherInformation: {
      additionalNotes: "No info Testing Testing"
    }
  },
  minimal: {
    claimNumber: "20042047",
    workerName: "Madeleine Willson",
    header: {
      address: "333 Broadway Winnipeg, MB R3C 4W3",
      phone: "(204) 954-4321",
      tollFree: "1-855-954-4321",
      website: "wcb.mb.ca"
    },
    returnToWork: {
      status: "not_returned",
      returnedDate: "",
      dutyType: "",
      dutyOtherText: "",
      progressNotes: "Currently resting at home under doctor's instructions.",
      expectedReturnDate: "April 15, 2024",
      concerns: "Persistent pain during bending or prolonged sitting.",
      employerContactName: "Sarah Jenkins (HR Manager)",
      employerContactDate: "March 10, 2024"
    },
    recovery: {
      fullyRecovered: false,
      recoveryComments: "Slow improvement in morning mobility.",
      painScaleRating: 8,
      continuingTreatment: true,
      treatmentProviderType: "Physiotherapist & Chiropractor",
      lastTreatmentDate: "March 25, 2024",
      lastTreatmentProvider: "Dr. Best",
      nextTreatmentDate: "April 02, 2024",
      nextTreatmentProvider: "Dr. Best",
      chiroPhysioFrequency: "3 times per week",
      takingMedication: true,
      medicationName: "Cyclobenzaprine & Naproxen",
      doingHomeExercises: false,
      homeExercisesList: ""
    },
    otherInformation: {
      additionalNotes: "Awaiting MRI specialist consultation appointment next week."
    }
  },
  recovered: {
    claimNumber: "20042047",
    workerName: "Madeleine Willson",
    header: {
      address: "333 Broadway Winnipeg, MB R3C 4W3",
      phone: "(204) 954-4321",
      tollFree: "1-855-954-4321",
      website: "wcb.mb.ca"
    },
    returnToWork: {
      status: "returned",
      returnedDate: "February 01, 2024",
      dutyType: "full_regular",
      dutyOtherText: "",
      progressNotes: "Successfully transitioned back to regular full duties without restrictions.",
      expectedReturnDate: "",
      concerns: "None. Feeling confident in performing all job tasks.",
      employerContactName: "David Miller (Supervisor)",
      employerContactDate: "February 01, 2024"
    },
    recovery: {
      fullyRecovered: true,
      recoveryComments: "Full range of motion restored, no remaining stiffness.",
      painScaleRating: 1,
      continuingTreatment: false,
      treatmentProviderType: "",
      lastTreatmentDate: "January 28, 2024",
      lastTreatmentProvider: "Dr. Best",
      nextTreatmentDate: "",
      nextTreatmentProvider: "",
      chiroPhysioFrequency: "",
      takingMedication: false,
      medicationName: "",
      doingHomeExercises: true,
      homeExercisesList: "Core strengthening and daily maintenance stretches."
    },
    otherInformation: {
      additionalNotes: "Thank you for the support throughout the rehabilitation process."
    }
  }
};
