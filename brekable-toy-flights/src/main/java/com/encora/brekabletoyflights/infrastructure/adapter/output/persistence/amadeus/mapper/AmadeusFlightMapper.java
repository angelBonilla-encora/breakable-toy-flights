package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.mapper;

import com.encora.brekabletoyflights.domain.model.*;
import com.encora.brekabletoyflights.domain.model.Currency;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.airport.AmadeusAirportResponse;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight.*;
import com.encora.brekabletoyflights.infrastructure.auth.AmadeusTokenProvider;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.web.util.UriComponentsBuilder;

@Mapper(componentModel = "spring")
public class AmadeusFlightMapper {

    @Autowired
    protected RedisTemplate<String, Object> redisTemplate;
    @Autowired
    protected RestTemplate restTemplate;
    @Autowired
    protected AmadeusTokenProvider amadeusTokenProvider;
    @Autowired
    protected AmadeusAirportMapper amadeusAirportMapper;


    public FlightResult toFlightResult(List<AmadeusFlightResponse> responses) {
        List<Itinerary> allItineraries = responses.stream()
                .flatMap(r -> r.itineraries.stream()
                        .map(i -> toDomainItinerary(i, r)))
                .collect(Collectors.toList());

        return FlightResult.builder()
                .results(allItineraries)
                .build();
    }

    protected Itinerary toDomainItinerary(AmadeusItinerary amadeusItinerary, AmadeusFlightResponse response) {
        List<FlightSegment> segments = amadeusItinerary.segments.stream()
                .map(s -> toFlightSegment(s, response))
                .collect(Collectors.toList());

        Duration totalDuration = Duration.parse(amadeusItinerary.duration);

        Price totalPrice = toDomainPrice(response.price);

        return Itinerary.builder()
                .segments(segments)
                .totalDuration(totalDuration)
                .totalPrice(totalPrice)
                .pricePerTraveler(totalPrice)
                .build();
    }

    protected FlightSegment toFlightSegment(AmadeusSegment segment, AmadeusFlightResponse response) {
        Price price = toDomainPrice(response.price);

        return FlightSegment.builder()
                .departureTime(segment.departure.at)
                .arrivalTime(segment.arrival.at)
                .departureAirport(toAirport(segment.departure.iataCode))
                .arrivalAirport(toAirport(segment.arrival.iataCode))
                .airline(toAirline(segment.carrierCode))
                .operatingAirline(
                        segment.operating != null ? toAirline(segment.operating.carrierCode) : null
                )
                .flightNumber(segment.number)
                .aircraft(segment.aircraft.code)
                .duration(Duration.parse(segment.duration))
                .cabin(getCabin(segment, response))
                .flightClass(getFlightClass(segment, response))
                .totalPrice(price)
                .pricePerTraveler(price)
                .amenities(getAmenities(segment,response))
                .build();
    }

    protected Price toDomainPrice(AmadeusPrice amadeusPrice) {
        BigDecimal base = new BigDecimal(amadeusPrice.base);
        BigDecimal total = new BigDecimal(amadeusPrice.total);
        BigDecimal fees = total.subtract(base);

        return Price.builder()
                .basePrice(base)
                .fees(fees)
                .totalPrice(total)
                .currency(Currency.valueOf(amadeusPrice.currency.toUpperCase()))
                .build();
    }

//    protected Airport toAirport(String iataCode) {
//        Airport airport = (Airport) redisTemplate.opsForValue().get("airport:" + iataCode);
//
//        return Airport.builder()
//                .iataCode(airport.getIataCode())
//                .name(airport.getName())
//                .city(airport.getCity())
//                .country(airport.getCountry())
//                .build();
//    }

    protected Airport toAirport(String iataCode) {
        String key = "airport:" + iataCode;
        Object cached = redisTemplate.opsForValue().get(key);

        if (cached instanceof Airport airport) {
            return Airport.builder()
                    .iataCode(airport.getIataCode())
                    .name(airport.getName())
                    .city(airport.getCity())
                    .country(airport.getCountry())
                    .build();
        }

        String accessToken = amadeusTokenProvider.getToken();
        String url = UriComponentsBuilder
                .fromHttpUrl("https://test.api.amadeus.com/v1/reference-data/locations")
                .queryParam("subType", "AIRPORT")
                .queryParam("keyword", iataCode)
                .queryParam("view", "LIGHT")
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<AmadeusAirportResponse> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                AmadeusAirportResponse.class
        );

        AmadeusAirportResponse responseBody = response.getBody();
        if (responseBody == null || responseBody.getData() == null || responseBody.getData().isEmpty()) {
            return null;
        }

        List<Airport> airports = amadeusAirportMapper.toAirportList(responseBody.getData());
        Airport found = airports.stream()
                .filter(a -> iataCode.equalsIgnoreCase(a.getIataCode()))
                .findFirst()
                .orElse(null);

        if (found != null) {
            redisTemplate.opsForValue().set(key, found);
            redisTemplate.opsForSet().add("airport:all", iataCode);

            return Airport.builder()
                    .iataCode(found.getIataCode())
                    .name(found.getName())
                    .city(found.getCity())
                    .country(found.getCountry())
                    .build();
        }

        return null;
    }


    protected Airline toAirline(String code) {
        Airline redisAirline = (Airline) redisTemplate.opsForValue().get("airline:" + code);

        if (redisAirline != null) {
            return redisAirline;
        }

        String accessToken = amadeusTokenProvider.getToken();

        String url = "https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=" + code;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<AmadeusAirlineResponse> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                AmadeusAirlineResponse.class
        );

        AmadeusAirlineResponse responseBody = response.getBody();
        if (responseBody == null || responseBody.getData() == null || responseBody.getData().isEmpty()) {
            return Airline.builder()
                    .code(code)
                    .name("")
                    .build();
        }

        AmadeusAirline amadeusAirline = responseBody.getData().get(0);
        Airline airline = Airline.builder()
                .code(amadeusAirline.iataCode)
                .name(amadeusAirline.businessName != null ? amadeusAirline.businessName : amadeusAirline.commonName)
                .build();

        redisTemplate.opsForValue().set("airline:" + code, airline);

        return airline;
    }

    protected String getCabin(AmadeusSegment segment, AmadeusFlightResponse response) {
        return response.travelerPricings.stream()
                .flatMap(tp -> tp.fareDetailsBySegment.stream())
                .filter(f -> f.segmentId.equals(segment.id))
                .map(f -> f.cabin)
                .findFirst()
                .orElse("");
    }

    protected List<Amenity> getAmenities(AmadeusSegment segment, AmadeusFlightResponse response) {
        return response.travelerPricings.stream()
                .flatMap(tp -> tp.fareDetailsBySegment.stream())
                .filter(f -> f.segmentId.equals(segment.id))
                .flatMap(f -> f.amenities.stream())
                .map(a -> Amenity.builder()
                        .name(a.description)
                        .isChargeable(a.isChargeable)
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }


    protected String getFlightClass(AmadeusSegment segment, AmadeusFlightResponse response) {
        return response.travelerPricings.stream()
                .flatMap(tp -> tp.fareDetailsBySegment.stream())
                .filter(f -> f.segmentId.equals(segment.id))
                .map(f -> f.myclass)
                .map(String::toUpperCase)
                .findFirst()
                .orElse("");
    }

}