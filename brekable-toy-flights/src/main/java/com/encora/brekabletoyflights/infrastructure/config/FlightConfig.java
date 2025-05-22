package com.encora.brekabletoyflights.infrastructure.config;

import com.encora.brekabletoyflights.application.ports.input.AirportInputPort;
import com.encora.brekabletoyflights.application.ports.input.FlightInputPort;
import com.encora.brekabletoyflights.application.ports.usecase.AirportUseCase;
import com.encora.brekabletoyflights.application.ports.usecase.FlightUseCase;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.AirportAmadeusAdapter;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.FlightAmadeusAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlightConfig {
    private final FlightAmadeusAdapter flightAmadeusAdapter;

    public FlightConfig(FlightAmadeusAdapter flightAmadeusAdapter) {
        this.flightAmadeusAdapter = flightAmadeusAdapter;
    }

    @Bean
    public FlightInputPort flightInputPort() {
        return new FlightUseCase(flightAmadeusAdapter);
    }
}
