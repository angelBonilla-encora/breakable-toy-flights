package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight;

import java.util.ArrayList;

public class AmadeusFlightResponse {
    public String type;
    public String id;
    public String source;
    public boolean instantTicketingRequired;
    public boolean nonHomogeneous;
    public boolean oneWay;
    public boolean isUpsellOffer;
    public String lastTicketingDate;
    public String lastTicketingDateTime;
    public int numberOfBookableSeats;
    public ArrayList<AmadeusItinerary> itineraries;
    public AmadeusPrice price;
    public AmadeusPricingOptions pricingOptions;
    public ArrayList<String> validatingAirlineCodes;
    public ArrayList<AmadeusTravelerPricing> travelerPricings;
}
