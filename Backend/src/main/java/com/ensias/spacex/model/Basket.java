package com.ensias.spacex.model;

import com.ensias.spacex.Exceptions.TravelNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class Basket {

    private final List<Travel> travels = new ArrayList<>();

    public void addTravel(Travel travel) {
        travels.add(travel);
    }

    public void removeTravelById(Long travelId) throws TravelNotFoundException{
        boolean removed = travels.removeIf(t -> t.getId().equals(travelId));
        if(!removed){
            throw new TravelNotFoundException();
        }
        }
    }
