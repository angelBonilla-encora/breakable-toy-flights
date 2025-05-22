package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.airport;

import lombok.Data;

import java.util.List;

@Data
public class AmadeusAirportResponse {
    private List<AmadeusAirport> data;
}
