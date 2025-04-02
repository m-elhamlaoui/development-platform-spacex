package com.ensias.spacex.service;

import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.DTO.CreateBasketReplyDto;
import com.ensias.spacex.Exceptions.BasketNotFoundException;
import com.ensias.spacex.Exceptions.TravelNotFoundException;
import com.ensias.spacex.Repositories.BasketRepository;
import com.ensias.spacex.Repositories.TravelRepository;
import com.ensias.spacex.model.Travel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BasketService {

    private final TravelRepository travelRepository;
    private final BasketRepository basketRepository;

    @Autowired
    public BasketService(TravelRepository travelRepository, BasketRepository basketRepository) {
        this.travelRepository = travelRepository;
        this.basketRepository = basketRepository;
    }

    public void addToBasket(BasketRequestDto request) throws BasketNotFoundException ,TravelNotFoundException {
        Optional<Travel> optTravel = travelRepository.findById(request.getTravelId());
        if(optTravel.isPresent()){
            basketRepository.getBasket(request.getBasketId()).addTravel(optTravel.get());
        }else {
            throw new TravelNotFoundException();
        }
    }

    public void removeFromBasket(BasketRequestDto request) throws BasketNotFoundException, TravelNotFoundException {
       basketRepository.getBasket(request.getBasketId()).removeTravelById(request.getTravelId());
    }

    public CreateBasketReplyDto createNewBasket() {
        return new CreateBasketReplyDto(basketRepository.createBasket());
    }
}
