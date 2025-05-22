package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.mapper;

import com.encora.brekabletoyflights.domain.model.Airport;
import com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.airport.AmadeusAirport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AmadeusAirportMapper {

    @Mapping(source = "city", target = "address.cityName")
    @Mapping(source = "country", target = "address.countryName")
    AmadeusAirport toAmadeusAirport(Airport airport);

    @Mapping(source = "address.cityName", target = "city")
    @Mapping(source = "address.countryName", target = "country")
    Airport toAirport(AmadeusAirport amadeusAirport);

    List<Airport> toAirportList(List<AmadeusAirport> amadeusAirports);
}

