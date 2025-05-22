package com.encora.brekabletoyflights.infrastructure.adapter.output.persistence.amadeus.entity.flight;

import java.util.ArrayList;

public class AmadeusPrice {
    public String currency;
    public String total;
    public String base;
    public ArrayList<AmadeusFee> fees;
    public String grandTotal;
}
