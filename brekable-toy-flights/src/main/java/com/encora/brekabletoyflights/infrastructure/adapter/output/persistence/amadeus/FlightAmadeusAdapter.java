package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus;

import com.encora.brekabletoyflights.application.ports.output.FlightOutputPort;
import com.encora.brekabletoyflights.domain.model.FlightCriteriaSearch;
import com.encora.brekabletoyflights.domain.model.FlightResult;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight.AmadeusFlightApiResponse;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight.AmadeusFlightResponse;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.mapper.AmadeusFlightMapper;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.util.AmadeusFlightQueryBuilder;
import com.encora.brekabletoyflights.infrastructure.auth.AmadeusTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FlightAmadeusAdapter implements FlightOutputPort {

    private final RestTemplate restTemplate;
    private final AmadeusTokenProvider amadeusTokenProvider;
    private final AmadeusFlightMapper amadeusFlightMapper;



    @Override
    public FlightResult searchFlights(FlightCriteriaSearch flightCriteriaSearch) {
        String accessToken = amadeusTokenProvider.getToken();
        String baseUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?max=20";
        String queryParams = AmadeusFlightQueryBuilder.toQueryParams(flightCriteriaSearch);

        String url = baseUrl + "&" + queryParams;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<AmadeusFlightApiResponse> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                AmadeusFlightApiResponse.class
        );

        List<AmadeusFlightResponse> offers = response.getBody().getData();

        return amadeusFlightMapper.toFlightResult(offers);





    }
}
