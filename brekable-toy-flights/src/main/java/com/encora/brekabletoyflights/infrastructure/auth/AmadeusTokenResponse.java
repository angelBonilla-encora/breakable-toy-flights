package com.encora.brekabletoyflights.infrastructure.auth;

import lombok.Getter;

@Getter
public class AmadeusTokenResponse {
    private String type;
    private String username;
    private String application_name;
    private String client_id;
    private String token_type;
    private String access_token;
    private int expires_in;
    private String state;
    private String scope;


}
