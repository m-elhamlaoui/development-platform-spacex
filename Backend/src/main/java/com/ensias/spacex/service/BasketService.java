package com.ensias.spacex.service;

import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.DTO.TravelDto;
import com.ensias.spacex.Repositories.TravelRepository;
import com.ensias.spacex.model.Travel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BasketService {

    private final TravelRepository travelRepository;
    private final Basket basket; // le bean session-scoped

    @Autowired
    public BasketService(TravelRepository travelRepository, Basket basket) {
        this.travelRepository = travelRepository;
        this.basket = basket;
    }




    public List<TravelDto> addToBasket(List<BasketRequestDto> basketRequests) {
        for (BasketRequestDto request : basketRequests) {
            Long travelId = request.getId();
            if (travelId != null) {
                // Chercher en BD (ou autre source) le Travel correspondant
                Optional<Travel> optTravel = travelRepository.findById(travelId);
                optTravel.ifPresent(basket::addTravel);
            }
        }
        // Retourner le panier mis à jour en DTO
        return basket.getTravels()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    public List<TravelDto> removeFromBasket(List<BasketRequestDto> basketRequests) {
        for (BasketRequestDto request : basketRequests) {
            Long travelId = request.getId();
            if (travelId != null) {
                basket.removeTravelById(travelId);
            }
        }

        return basket.getTravels()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    private TravelDto convertToDto(Travel travel) {
        TravelDto dto = new TravelDto();
        dto.setDepart(travel.getDepart());
        dto.setArrive(travel.getArrive());
        dto.setDateDepart(travel.getDateDepart());
        dto.setDateArrive(travel.getDateArrivee());
        dto.setPercentage(0);
        return dto;
    }
}
