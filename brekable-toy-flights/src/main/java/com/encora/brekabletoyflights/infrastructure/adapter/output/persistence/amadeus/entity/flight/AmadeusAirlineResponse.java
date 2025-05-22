package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight;


import lombok.Data;

import java.util.List;

@Data
public class AmadeusAirlineResponse {
    private List<AmadeusAirline> data;

}
