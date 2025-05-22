package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.util;

import com.encora.brekabletoyflights.domain.model.FlightCriteriaSearch;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.StringJoiner;

public class AmadeusFlightQueryBuilder {
    private static final DateTimeFormatter DATE_FORMAT =DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static String toQueryParams(FlightCriteriaSearch criteria) {
        StringJoiner params = new StringJoiner("&");

        if (criteria.getOriginAirport() != null && criteria.getOriginAirport().getIataCode() != null) {
            params.add("originLocationCode=" + criteria.getOriginAirport().getIataCode());
        }
        if (criteria.getDestinationAirport() != null && criteria.getDestinationAirport().getIataCode() != null) {
            params.add("destinationLocationCode=" + criteria.getDestinationAirport().getIataCode());
        }
        if (criteria.getDepartureDate() != null) {
            params.add("departureDate=" + DATE_FORMAT.format(criteria.getDepartureDate()));
        }
        if (criteria.getReturnDate() != null) {
            params.add("returnDate=" + DATE_FORMAT.format(criteria.getReturnDate()));
        }
        if (criteria.getNumberOfAdults() <= 0) {
            params.add("adults=1");
        } else {
            params.add("adults=" + criteria.getNumberOfAdults());
        }
        if (criteria.getCurrency() != null) {
            params.add("currencyCode=" + criteria.getCurrency().name());
        } else {
            params.add("currencyCode=USD");
        }
        params.add("nonStop=" + criteria.isNonStop());

        return params.toString();
    }
}
