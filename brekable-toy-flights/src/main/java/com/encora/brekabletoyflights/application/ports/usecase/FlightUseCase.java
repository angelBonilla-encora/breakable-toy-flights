package com.encora.brekabletoyflights.application.ports.usecase;

import com.encora.brekabletoyflights.application.ports.input.FlightInputPort;
import com.encora.brekabletoyflights.application.ports.output.FlightOutputPort;
import com.encora.brekabletoyflights.domain.model.FlightCriteriaSearch;
import com.encora.brekabletoyflights.domain.model.FlightResult;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class FlightUseCase implements FlightInputPort {
    private final FlightOutputPort flightOutputPort;

    @Override
    public FlightResult getFlights(FlightCriteriaSearch flightCriteriaSearch) {
        return flightOutputPort.searchFlights(flightCriteriaSearch);
    }
}
