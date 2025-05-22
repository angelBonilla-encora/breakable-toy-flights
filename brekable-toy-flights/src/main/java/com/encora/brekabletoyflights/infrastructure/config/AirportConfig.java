package com.encora.brekabletoyflights.infrastructure.config;

import com.encora.brekabletoyflights.application.ports.input.AirportInputPort;
import com.encora.brekabletoyflights.application.ports.usecase.AirportUseCase;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.AirportAmadeusAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AirportConfig {
    private final AirportAmadeusAdapter airportAmadeusAdapter;

    public AirportConfig(AirportAmadeusAdapter airportAmadeusAdapter) {
        this.airportAmadeusAdapter = airportAmadeusAdapter;
    }

    @Bean
    public AirportInputPort airportInputPort() {
        return new AirportUseCase(airportAmadeusAdapter);
    }
}
