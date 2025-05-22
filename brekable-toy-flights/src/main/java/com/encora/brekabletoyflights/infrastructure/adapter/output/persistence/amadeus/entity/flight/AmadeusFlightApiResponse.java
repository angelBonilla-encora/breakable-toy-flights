package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AmadeusFlightApiResponse {
    private List<AmadeusFlightResponse> data;
}

