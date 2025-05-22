package com.encora.brekabletoyflights.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightCriteriaSearch {
    private Airport originAirport;
    private Airport destinationAirport;
    private LocalDate departureDate;
    private LocalDate returnDate;
    private int numberOfAdults;
    private Currency currency;
    private boolean nonStop;
}
