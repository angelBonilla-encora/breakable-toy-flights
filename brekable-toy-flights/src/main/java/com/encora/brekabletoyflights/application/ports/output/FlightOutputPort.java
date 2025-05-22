package com.encora.brekabletoyflights.application.ports.output;

import com.encora.brekabletoyflights.domain.model.FlightCriteriaSearch;
import com.encora.brekabletoyflights.domain.model.FlightResult;

public interface FlightOutputPort {
    FlightResult searchFlights(FlightCriteriaSearch flightCriteriaSearch);

}
