package com.encora.brekabletoyflights.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Price {

    private BigDecimal basePrice;
    private BigDecimal fees;
    private BigDecimal totalPrice;
    private Currency currency;


}
