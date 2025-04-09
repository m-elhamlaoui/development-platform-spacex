package com.ensias.spacex.controllers;

import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.Exceptions.BasketNotFoundException;
import com.ensias.spacex.model.Travel;
import com.ensias.spacex.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CheckoutController {

    private final BasketService basketService;

    @Autowired
    public CheckoutController(BasketService basketService) {
        this.basketService = basketService;
    }

    @PostMapping("/checkout")
    public List<Travel> getBasket(@RequestBody BasketRequestDto id){
        try {
            return basketService.getBasket(id.getBasketId());
        } catch (BasketNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "the travel cannot be found :/"
            );
        }
    }
}
