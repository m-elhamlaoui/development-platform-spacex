package com.ensias.spacex.service;

import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.DTO.TravelDto;
import com.ensias.spacex.Repositories.TravelRepository;
import com.ensias.spacex.model.Travel;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BasketService {

    private final TravelRepository travelRepository;

    @Autowired
    public BasketService(TravelRepository travelRepository) {
        this.travelRepository = travelRepository;
    }


    public List<TravelDto> addToBasket(List<BasketRequestDto> basketRequests, HttpSession session) {
        // initialiser la liste du panier dans la session
        @SuppressWarnings("unchecked")
        List<Travel> basket = (List<Travel>) session.getAttribute("basket");
        if (basket == null) {
            basket = new ArrayList<>();
        }

        // pour chaque requete, recuperer le Travel correspondant en BD et l’ajouter
        for (BasketRequestDto request : basketRequests) {
            Long travelId = request.getId();
            if (travelId != null) {
                Optional<Travel> optTravel = travelRepository.findById(travelId);
                optTravel.ifPresent(basket::add);
            }
        }

        session.setAttribute("basket", basket);

        return basket.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    public List<TravelDto> removeFromBasket(List<BasketRequestDto> basketRequests, HttpSession session) {

        @SuppressWarnings("unchecked")
        List<Travel> basket = (List<Travel>) session.getAttribute("basket");
        if (basket == null) {
            // si le panier est vide/inexistant, on renvoie une liste vide ou le panier actuel (null).
            return new ArrayList<>();
        }

        for (BasketRequestDto request : basketRequests) {
            Long travelId = request.getId();
            if (travelId != null) {
                basket.removeIf(travel -> travel.getId().equals(travelId));
            }
        }

        session.setAttribute("basket", basket);


        return basket.stream().map(this::convertToDto).collect(Collectors.toList());
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
