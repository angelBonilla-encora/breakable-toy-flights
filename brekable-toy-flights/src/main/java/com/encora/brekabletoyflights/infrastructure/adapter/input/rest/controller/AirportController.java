package com.encora.brekabletoyflights.infrastructure.adapter.input.rest.controller;

import com.encora.brekabletoyflights.application.ports.input.AirportInputPort;
import com.encora.brekabletoyflights.domain.model.Airport;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/airports")
@RequiredArgsConstructor

public class AirportController {

    private final AirportInputPort airportInputPort;

    @GetMapping
    public List<Airport> getAirportsByName(@RequestParam String name) {
        return airportInputPort.searchAirportsByTerm(name);
    }
}
