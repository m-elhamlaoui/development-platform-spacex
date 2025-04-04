package com.ensias.spacex.service;

import com.ensias.spacex.DTO.SearchRequestDto;
import com.ensias.spacex.DTO.TravelDto;
import com.ensias.spacex.Repositories.TravelRepository;
import com.ensias.spacex.model.Travel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelService {

    private final TravelRepository travelRepository;

    @Autowired
    public TravelService(TravelRepository travelRepository) {
        this.travelRepository = travelRepository;
    }


    public List<TravelDto> getCurrentTravels() {
        List<Travel> travels = travelRepository.getCurrentTravelsAtDate(new Date()); // new Date will have the current Date
        return travels.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<Travel> getExploredTravels() {
        return travelRepository.findAvailableTravels(new Date());

    }

    private TravelDto convertToDto(Travel travel) {
        return new TravelDto(
                travel.getDepart(),
                travel.getArrive(),
                travel.getDateDepart(),
                travel.getDateArrivee(),
                calculatePercentage(travel)
        );
    }

    private int calculatePercentage(Travel travel) {
        long totalTime = travel.getDateArrivee().getTime() - travel.getDateDepart().getTime();
        long elapsedTime = new Date().getTime() - travel.getDateDepart().getTime();
        if (totalTime <= 0) return 0; // Prevent division by zero
        int percentage = (int) ((elapsedTime * 100) / totalTime);
        return Math.min(percentage, 100); // Cap at 100%
    }

    public List<Travel> searchForTravels(SearchRequestDto searchRequestDto) {
        return travelRepository.searchForTravels(searchRequestDto.getDepart(),searchRequestDto.getArrive(),new Date());
    }
}
