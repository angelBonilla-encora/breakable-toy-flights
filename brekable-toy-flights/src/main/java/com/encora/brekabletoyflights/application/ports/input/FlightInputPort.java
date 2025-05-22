package com.encora.brekabletoyflights.application.ports.input;

import com.encora.brekabletoyflights.domain.model.FlightCriteriaSearch;
import com.encora.brekabletoyflights.domain.model.FlightResult;

public interface FlightInputPort {
    FlightResult getFlights(FlightCriteriaSearch flightCriteriaSearch);
}
