package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight;

import java.util.ArrayList;

public class AmadeusTravelerPricing {
    public String travelerId;
    public String fareOption;
    public String travelerType;
    public AmadeusPrice price;
    public ArrayList<AmadeusFareDetailsBySegment> fareDetailsBySegment;
}
