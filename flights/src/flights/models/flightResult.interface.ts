export interface CurrencyAmount {
  basePrice: number;
  fees: number;
  totalPrice: number;
  currency: string;
}

interface Airport {
  iataCode: string;
  name: string | null;
  country: string | null;
  city: string | null;
}

export interface Airline {
  name: string | null;
  code: string;
}

export interface Segment {
  departureTime: string;
  arrivalTime: string;
  departureAirport: Airport;
  arrivalAirport: Airport;
  airline: Airline;
  operatingAirline: Airline;
  flightNumber: string;
  aircraft: string;
  duration: string;
  totalPrice: CurrencyAmount;
  pricePerTraveler: CurrencyAmount;
  cabin: string;
  flightClass: string;
  amenities: any[];
}

export interface FlightResult {
  totalDuration: string;
  totalPrice: CurrencyAmount;
  pricePerTraveler: CurrencyAmount;
  segments: Segment[];
}

export interface FlightResponse {
  results: FlightResult[];
}
