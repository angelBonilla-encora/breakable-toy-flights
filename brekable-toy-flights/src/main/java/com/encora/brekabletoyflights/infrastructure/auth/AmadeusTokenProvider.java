package com.encora.brekabletoyflights.infrastructure.auth;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.concurrent.TimeUnit;

@Component
public class AmadeusTokenProvider {

    private final RestTemplate restTemplate;
    private final RedisTemplate<String, String> redisTemplate;
    private final String clientId;
    private final String clientSecret;

    public AmadeusTokenProvider(
            RestTemplate restTemplate,
            RedisTemplate<String, String> redisTemplate,
            @Value("${amadeus.client-id}") String clientId,
            @Value("${amadeus.client-secret}") String clientSecret
    ) {
        this.restTemplate = restTemplate;
        this.redisTemplate = redisTemplate;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public String getToken() {
        String token = redisTemplate.opsForValue().get("AMADEUS_TOKEN");
        if (token != null) return token;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<AmadeusTokenResponse> response = restTemplate.exchange(
                "https://test.api.amadeus.com/v1/security/oauth2/token",
                HttpMethod.POST,
                request,
                AmadeusTokenResponse.class
        );

        AmadeusTokenResponse tokenResponse =  response.getBody();
        if (tokenResponse == null || tokenResponse.getAccess_token() == null) {
            throw new RuntimeException("Amadeus authentication failed");
        }

        redisTemplate.opsForValue().set(
                "AMADEUS_TOKEN",
                tokenResponse.getAccess_token(),
                30,
                TimeUnit.MINUTES
        );

        return tokenResponse.getAccess_token();
    }
}

