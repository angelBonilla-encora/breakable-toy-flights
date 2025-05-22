package com.encora.brekabletoyflights.application.ports.output;

import com.encora.brekabletoyflights.domain.model.Airport;

import java.util.List;

public interface AirportOutputPort {
    List<Airport> getAirportsByTerm(String term);

    //cache
    void saveAirports(List<Airport> airports);
    void saveAirport(Airport airport);
}
