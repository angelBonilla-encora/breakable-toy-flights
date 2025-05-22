import type { FlightResponse } from "../models/flightResult.interface";

export const dataRoundTrip: FlightResponse = {
  results: [
    {
      totalDuration: "PT4H45M",
      totalPrice: {
        basePrice: 277.0,
        fees: 199.76,
        totalPrice: 476.76,
        currency: "USD",
      },
      pricePerTraveler: {
        basePrice: 277.0,
        fees: 199.76,
        totalPrice: 476.76,
        currency: "USD",
      },
      segments: [
        {
          departureTime: "2025-05-31T07:20:00.000+00:00",
          arrivalTime: "2025-05-31T14:05:00.000+00:00",
          departureAirport: {
            iataCode: "MEX",
            name: "Mexico City International Airport",
            country: null,
            city: null,
          },
          arrivalAirport: {
            iataCode: "JFK",
            name: "John F. Kennedy International Airport",
            country: null,
            city: null,
          },
          airline: {
            name: null,
            code: "VB",
          },
          operatingAirline: {
            name: null,
            code: "VB",
          },
          flightNumber: "100",
          aircraft: "320",
          duration: "PT4H45M",
          totalPrice: {
            basePrice: 277.0,
            fees: 199.76,
            totalPrice: 476.76,
            currency: "USD",
          },
          pricePerTraveler: {
            basePrice: 277.0,
            fees: 199.76,
            totalPrice: 476.76,
            currency: "USD",
          },
          cabin: "ECONOMY",
          flightClass: "B",
          amenities: [],
        },
      ],
    },
    {
      totalDuration: "PT5H30M",
      totalPrice: {
        basePrice: 277.0,
        fees: 199.76,
        totalPrice: 476.76,
        currency: "USD",
      },
      pricePerTraveler: {
        basePrice: 277.0,
        fees: 199.76,
        totalPrice: 476.76,
        currency: "USD",
      },
      segments: [
        {
          departureTime: "2025-06-14T15:15:00.000+00:00",
          arrivalTime: "2025-06-14T18:45:00.000+00:00",
          departureAirport: {
            iataCode: "JFK",
            name: "John F. Kennedy International Airport",
            country: null,
            city: null,
          },
          arrivalAirport: {
            iataCode: "MEX",
            name: "Mexico City International Airport",
            country: null,
            city: null,
          },
          airline: {
            name: null,
            code: "VB",
          },
          operatingAirline: {
            name: null,
            code: "VB",
          },
          flightNumber: "101",
          aircraft: "320",
          duration: "PT5H30M",
          totalPrice: {
            basePrice: 277.0,
            fees: 199.76,
            totalPrice: 476.76,
            currency: "USD",
          },
          pricePerTraveler: {
            basePrice: 277.0,
            fees: 199.76,
            totalPrice: 476.76,
            currency: "USD",
          },
          cabin: "ECONOMY",
          flightClass: "Z",
          amenities: [],
        },
      ],
    },
  ],
};

export const dataNo: FlightResponse = {
  results: [
    {
      totalDuration: "PT4H45M",
      totalPrice: {
        basePrice: 277.0,
        fees: 199.76,
        totalPrice: 476.76,
        currency: "USD",
      },
      pricePerTraveler: {
        basePrice: 277.0,
        fees: 199.76,
        totalPrice: 476.76,
        currency: "USD",
      },
      segments: [
        {
          departureTime: "2025-05-31T07:20:00.000+00:00",
          arrivalTime: "2025-05-31T14:05:00.000+00:00",
          departureAirport: {
            iataCode: "MEX",
            name: "Mexico City International Airport",
            country: null,
            city: null,
          },
          arrivalAirport: {
            iataCode: "JFK",
            name: "John F. Kennedy International Airport",
            country: null,
            city: null,
          },
          airline: {
            name: null,
            code: "VB",
          },
          operatingAirline: {
            name: null,
            code: "VB",
          },
          flightNumber: "100",
          aircraft: "320",
          duration: "PT4H45M",
          totalPrice: {
            basePrice: 277.0,
            fees: 199.76,
            totalPrice: 476.76,
            currency: "USD",
          },
          pricePerTraveler: {
            basePrice: 277.0,
            fees: 199.76,
            totalPrice: 476.76,
            currency: "USD",
          },
          cabin: "ECONOMY",
          flightClass: "B",
          amenities: [],
        },
      ],
    },
  ],
};
