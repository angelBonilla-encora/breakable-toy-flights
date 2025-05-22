package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus;


import com.encora.brekabletoyflights.application.ports.output.AirportOutputPort;
import com.encora.brekabletoyflights.domain.model.Airport;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.airport.AmadeusAirportResponse;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.mapper.AmadeusAirportMapper;
import com.encora.brekabletoyflights.infrastructure.auth.AmadeusTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AirportAmadeusAdapter implements AirportOutputPort {

    private final RestTemplate restTemplate;
    private final AmadeusTokenProvider amadeusTokenProvider;
    private final RedisTemplate<String, Object> redisTemplate;
    private final AmadeusAirportMapper amadeusAirportMapper;
    private static final String AIRPORT_KEY_PREFIX = "airport:";
    private static final String AIRPORT_SET_KEY = "airport:all";

    public List<Airport> getAirportsByTerm(String term) {
        String lowerTerm = term.toLowerCase();

        List<Airport> cachedAirports = getAllCachedAirports().stream()
                .filter(a -> a.getCity().toLowerCase().contains(lowerTerm) || a.getName().toLowerCase().contains(lowerTerm))
                .toList();

        if (!cachedAirports.isEmpty()) {
            return cachedAirports;
        }

        String accessToken = amadeusTokenProvider.getToken();
        String url = UriComponentsBuilder.fromHttpUrl("https://test.api.amadeus.com/v1/reference-data/locations")
                .queryParam("subType", "AIRPORT")
                .queryParam("keyword", term)
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
        if (responseBody == null || responseBody.getData() == null) return List.of();

        List<Airport> newAirports = amadeusAirportMapper.toAirportList(responseBody.getData());

        saveAirports(newAirports);

        return newAirports;
    }

    @Override
    public void saveAirports(List<Airport> airports) {
        if (airports == null || airports.isEmpty()) return;

        for (Airport airport : airports) {
            saveAirport(airport);
        }
    }

    @Override
    public void saveAirport(Airport airport) {
        if (airport == null || airport.getIataCode() == null) return;

        String key = AIRPORT_KEY_PREFIX + airport.getIataCode();
        redisTemplate.opsForValue().set(key, airport);
        redisTemplate.opsForSet().add(AIRPORT_SET_KEY, airport.getIataCode());
    }

    private List<Airport> getAllCachedAirports() {
        var allCodes = redisTemplate.opsForSet().members(AIRPORT_SET_KEY);
        if (allCodes == null || allCodes.isEmpty()) return List.of();

        return allCodes.stream()
                .map(code -> redisTemplate.opsForValue().get(AIRPORT_KEY_PREFIX + code))
                .filter(Airport.class::isInstance)
                .map(Airport.class::cast)
                .toList();
    }
}
