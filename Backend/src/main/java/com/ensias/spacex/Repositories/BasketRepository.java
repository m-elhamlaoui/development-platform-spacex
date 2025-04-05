package com.ensias.spacex.Repositories;

import com.ensias.spacex.Exceptions.BasketNotFoundException;
import com.ensias.spacex.model.Basket;
import org.springframework.stereotype.Repository;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@ApplicationScope
@Repository
public class BasketRepository {
    private final Map<String, Basket> baskets = new HashMap<>();

    public String createBasket(){
        String uniqueID = UUID.randomUUID().toString();
        baskets.put(uniqueID,new Basket());
        return uniqueID;
    }

    public Basket getBasket(String uid) throws BasketNotFoundException
    {
        if(!baskets.containsKey(uid)){
            throw new BasketNotFoundException();
        }
        return baskets.get(uid);
    }

}
