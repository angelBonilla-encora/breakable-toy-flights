package com.encora.brekabletoyflights.application.ports.usecase;

import com.encora.brekabletoyflights.application.ports.input.AirportInputPort;
import com.encora.brekabletoyflights.application.ports.output.AirportOutputPort;
import com.encora.brekabletoyflights.domain.model.Airport;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class AirportUseCase implements AirportInputPort {

    private final AirportOutputPort airportOutputPort;


    @Override
    public List<Airport> searchAirportsByTerm(String term) {
        return airportOutputPort.getAirportsByTerm(term);
    }
}
