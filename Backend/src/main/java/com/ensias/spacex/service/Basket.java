package com.ensias.spacex.service;

import com.ensias.spacex.model.Travel;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.List;

@Component
@SessionScope
public class Basket {

    // Liste des voyages dans le panier
    private final List<Travel> travels = new ArrayList<>();


     //recuperer les voyages du panier

    public List<Travel> getTravels() {
        return travels;
    }


     // ajouter un voyage au panier

    public void addTravel(Travel travel) {
        travels.add(travel);
    }


     // retirer du panier un voyage par son ID

    public void removeTravelById(Long travelId) {
        travels.removeIf(t -> t.getId().equals(travelId));
    }


    //vider completement le panier

    public void clear() {
        travels.clear();// hadi optionnelle
    }
}
