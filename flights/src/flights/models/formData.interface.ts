import { Airport, Currency } from ".";

export interface FormData {
  departureAirportIataCode: string;
  arrivalAirportIataCode: string;
  departureDate: Date;
  returnDate?: Date;
  currency: Currency;
  numberOfAdults: number;
}
