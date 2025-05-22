package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight;

import lombok.Data;

@Data
public class AmadeusAirline {
    public String type;
    public String iataCode;
    public String icaoCode;
    public String businessName;
    public String commonName;
}
