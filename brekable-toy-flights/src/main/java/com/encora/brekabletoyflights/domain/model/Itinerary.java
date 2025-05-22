package com.encora.brekabletoyflights.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    private Duration totalDuration;
    private Price totalPrice;
    private Price pricePerTraveler;
    private List<FlightSegment> segments;

}
