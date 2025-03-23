package com.ensias.spacex.controllers;

import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.DTO.TravelDto;
import com.ensias.spacex.service.BasketService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BasketController {

    private final BasketService basketService;

    @Autowired
    public BasketController(BasketService basketService){
        this.basketService = basketService;
    }
    @PostMapping("/addToBasket")
    public List<TravelDto> addToBasket(@RequestBody List<BasketRequestDto> basketRequests,
                                       HttpSession session) {

        return basketService.addToBasket(basketRequests, session);

    }
    @PostMapping("/removeFromBasket")
    public List<TravelDto> removeFromBasket(@RequestBody List<BasketRequestDto> basketRequests,
                                            HttpSession session) {
        return basketService.removeFromBasket(basketRequests, session);
    }

}
