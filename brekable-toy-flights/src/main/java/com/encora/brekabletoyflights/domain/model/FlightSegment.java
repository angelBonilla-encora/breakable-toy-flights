package com.encora.brekabletoyflights.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.util.Date;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightSegment {
    private Date departureTime;
    private Date arrivalTime;
    private Airport departureAirport;
    private Airport arrivalAirport;
    private Airline airline;
    private Airline operatingAirline;
    private String flightNumber;
    private String aircraft;
    private Duration duration;
    private Price totalPrice;
    private Price pricePerTraveler;
    private String cabin;
//    private FlightClass flightClass;
    private String flightClass;
    private List<Amenity> amenities;
}
