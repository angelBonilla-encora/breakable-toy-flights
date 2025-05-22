package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight;

public class AmadeusSegment{
    public AmadeusDeparture departure;
    public AmadeusArrival arrival;
    public String carrierCode;
    public String number;
    public AmadeusAircraft aircraft;
    public AmadeusOperating operating;
    public String duration;
    public String id;
    public int numberOfStops;
    public boolean blacklistedInEU;
}
