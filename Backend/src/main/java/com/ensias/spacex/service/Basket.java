package com.ensias.spacex.service;

import com.ensias.spacex.model.Travel;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.List;

@Component
@SessionScope
public class Basket {

    private final List<Travel> travels = new ArrayList<>();

    public List<Travel> getTravels() {
        return travels;
    }


    public void addTravel(Travel travel) {
        travels.add(travel);
    }


    public void removeTravelById(Long travelId) {
        travels.removeIf(t -> t.getId().equals(travelId));
    }


    //vider completement le panier

    public void clear() {
        travels.clear();// hadi optionnelle
    }
}
