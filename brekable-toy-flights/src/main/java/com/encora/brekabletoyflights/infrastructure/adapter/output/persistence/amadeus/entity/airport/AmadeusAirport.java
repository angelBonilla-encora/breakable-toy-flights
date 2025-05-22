package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.airport;

import lombok.Data;

@Data
public class AmadeusAirport {
    private String subType;
    private String name;
    private String iataCode;
    private Address address;
}
