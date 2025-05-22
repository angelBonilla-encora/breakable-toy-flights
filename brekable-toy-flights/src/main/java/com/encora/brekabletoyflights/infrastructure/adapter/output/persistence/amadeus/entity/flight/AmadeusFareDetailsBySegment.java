package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.jar.JarFile;

public class AmadeusFareDetailsBySegment {
    public String segmentId;
    public String cabin;
    public String fareBasis;
    @JsonProperty("class")
    public String myclass;
    public AmadeusIncludedCheckedBags includedCheckedBags;
    public AmadeusIncludedCabinBags includedCabinBags;
    public List<AmadeusAmenity> amenities;
}
