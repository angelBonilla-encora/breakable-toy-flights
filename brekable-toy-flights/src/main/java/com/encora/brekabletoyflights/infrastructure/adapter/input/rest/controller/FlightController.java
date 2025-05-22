package com.encora.brekabletoyflights.infrastructure.adapter.input.rest.controller;
import com.encora.brekabletoyflights.application.ports.input.FlightInputPort;
import com.encora.brekabletoyflights.domain.model.Airport;
import com.encora.brekabletoyflights.domain.model.FlightCriteriaSearch;
import com.encora.brekabletoyflights.domain.model.FlightResult;
import com.encora.brekabletoyflights.domain.model.Currency;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;

@RestController
@RequestMapping("/search-flights")
@RequiredArgsConstructor
public class FlightController {
    private final FlightInputPort flightInputPort;
    @GetMapping
    public FlightResult searchFlight(
            @RequestParam String originAirportCode,
            @RequestParam String destinationAirportCode,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate returnDate,
            @RequestParam int numberOfAdults,
            @RequestParam Currency currency,
            @RequestParam(defaultValue = "false") boolean nonStop
    ) {
        Airport origin = Airport.builder()
                .iataCode(originAirportCode)
                .build();

        Airport destination = Airport.builder()
                .iataCode(destinationAirportCode)
                .build();

        FlightCriteriaSearch flightCriteriaSearch = FlightCriteriaSearch.builder()
                .originAirport(origin)
                .destinationAirport(destination)
                .departureDate(departureDate)
                .returnDate(returnDate)
                .numberOfAdults(numberOfAdults)
                .currency(currency)
                .nonStop(nonStop)
                .build();

        return flightInputPort.getFlights(flightCriteriaSearch);
    }

}
