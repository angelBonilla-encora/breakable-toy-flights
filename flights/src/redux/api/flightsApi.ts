// import { Product } from "@/products/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flightsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Airports", "Flights"],

  endpoints: (build) => ({
    getFlights: build.query({
      query: ({
        originAirportCode,
        destinationAirportCode,
        departureDate,
        currency,
        numberOfAdults,
        nonStop,
        returnDate,
      }) => {
        return {
          url: "/search-flights",
          params: {
            originAirportCode,
            destinationAirportCode,
            departureDate,
            currency,
            numberOfAdults,
            nonStop,
            ...(returnDate ? { returnDate } : {}),
          },
        };
      },
      providesTags: ["Flights"],
    }),
    
    

    getAirports: build.query({
      query: ({ name }) => {
        return {
          url: "/airports",
          params: {
            name
          },
        };
      },
      providesTags: ["Airports"],
    }),
  }),
});

export const { useGetAirportsQuery, useGetFlightsQuery } = flightsApi;
