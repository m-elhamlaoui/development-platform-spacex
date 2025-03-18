package com.ensias.spacex.configuration;

import com.ensias.spacex.Repositories.TravelRepository;
import com.ensias.spacex.model.Travel;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
public class LoadData {
    @Bean
    CommandLineRunner initData (TravelRepository repo){
        return args -> {
            repo.save(new Travel("TRR","MRS",new Date(1715820393000L), new Date(1747836720000L),45000L)); // add a travel to travel list
            repo.save(new Travel("MRS","JUP",new Date(1745014392000L), new Date(1776550392L),45000L)); // add a travel to
        };
    }
}
