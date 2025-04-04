package com.ensias.spacex.controllers;

import com.ensias.spacex.DTO.BasketRequestAddDelDto;
import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.DTO.CreateBasketReplyDto;
import com.ensias.spacex.Exceptions.BasketNotFoundException;
import com.ensias.spacex.Exceptions.TravelNotFoundException;
import com.ensias.spacex.model.Travel;
import com.ensias.spacex.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BasketController {

    private final BasketService basketService;

    @Autowired
    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    // POST /api/v1/addToBasket
    @PostMapping("/addToBasket")
    public List<Travel> addToBasket(@RequestBody BasketRequestAddDelDto request) {
        try {
            basketService.addToBasket(request);
            return basketService.getBasket(request.getBasketId());
        } catch (BasketNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "your basket cannot be found :/"
            );
        } catch (TravelNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "the travel cannot be found :/"
            );
        }
    }

    // POST /api/v1/removeFromBasket
    @PostMapping("/removeFromBasket")
    public List<Travel> removeFromBasket(@RequestBody BasketRequestAddDelDto request) {
        try {
            basketService.removeFromBasket(request);
            return basketService.getBasket(request.getBasketId());
        } catch (BasketNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "your basket cannot be found :/"
            );
        } catch (TravelNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "the travel cannot be found :/"
            );
        }
    }

    @PostMapping("/createBasket")
    public CreateBasketReplyDto createBasket(){
        return basketService.createNewBasket();
    }

    @PostMapping("/getBasket")
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
