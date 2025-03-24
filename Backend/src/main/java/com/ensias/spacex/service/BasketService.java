package com.ensias.spacex.service;

import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.Repositories.TravelRepository;
import com.ensias.spacex.model.Travel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BasketService {

    private final TravelRepository travelRepository;
    private final Basket basket;

    @Autowired
    public BasketService(TravelRepository travelRepository, Basket basket) {
        this.travelRepository = travelRepository;
        this.basket = basket;
    }

    public void addToBasket(BasketRequestDto request) {
        if (request.getId() != null) {
            Optional<Travel> optTravel = travelRepository.findById(request.getId());
            optTravel.ifPresent(basket::addTravel);
        }
    }

    public void removeFromBasket(BasketRequestDto request) {
        if (request.getId() != null) {
            basket.removeTravelById(request.getId());
        }
    }
}
