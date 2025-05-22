package com.encora.brekabletoyflights.application.ports.input;

import com.encora.brekabletoyflights.domain.model.Airport;

import java.util.List;

public interface AirportInputPort {
    List<Airport> searchAirportsByTerm(String term);

}
