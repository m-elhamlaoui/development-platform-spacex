package com.ensias.spacex.configuration;

import com.ensias.spacex.Repositories.TravelRepository;
import com.ensias.spacex.model.Travel;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Calendar;
import java.util.Date;

@Configuration
@Profile("!test")
public class LoadData {
    @Bean
    CommandLineRunner initData (TravelRepository repo){
        return args -> {
            Calendar cal = Calendar.getInstance();
            // Past ended flight
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, -14);
            Date f11date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, -7);
            Date f12date = cal.getTime();
            repo.save(new Travel("TRR", "MRS", f11date, f12date, 45000L));   // started and ended

            // Past flight not ended
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, -7);
            Date f21date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 14);
            Date f22date = cal.getTime();
            repo.save(new Travel("TRR", "JUP", f21date, f22date, 45000L));   // started and not ended
            // Past flight not ended
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, -8);
            f21date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 21);
            f22date = cal.getTime();
            repo.save(new Travel("TRR", "MRS", f21date, f22date, 45000L));   // started and not ended
            // Past flight not ended
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, -10);
            f21date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 12);
            f22date = cal.getTime();
            repo.save(new Travel("TRR", "MER", f21date, f22date, 45000L));   // started and not ended
            // Past flight not ended
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, -12);
            f21date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 8);
            f22date = cal.getTime();
            repo.save(new Travel("TRR", "NEP", f21date, f22date, 45000L));   // started and not ended
            // Past flight not ended
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, -6);
            f21date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 19);
            f22date = cal.getTime();
            repo.save(new Travel("TRR", "SAT", f21date, f22date, 45000L));   // started and not ended

            // future flight
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, 7);
            Date f31date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 21);
            Date f32date = cal.getTime();
            repo.save(new Travel("TRR", "JUP", f31date, f32date, 45000L)); // Future flight
            repo.flush();
            // future flight
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, 8);
            f31date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 11);
            f32date = cal.getTime();
            repo.save(new Travel("TRR", "MRS", f31date, f32date, 45000L)); // Future flight
            repo.flush();
            // future flight
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, 8);
            f31date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 12);
            f32date = cal.getTime();
            repo.save(new Travel("TRR", "NEP", f31date, f32date, 45000L)); // Future flight
            repo.flush();
            // future flight
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, 9);
            f31date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 14);
            f32date = cal.getTime();
            repo.save(new Travel("TRR", "SAT", f31date, f32date, 45000L)); // Future flight
            repo.flush();
            // future flight
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, 10);
            f31date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 15);
            f32date = cal.getTime();
            repo.save(new Travel("TRR", "VNS", f31date, f32date, 45000L)); // Future flight
            repo.flush();
            // future flight
            cal.setTime(new Date());
            cal.add(Calendar.DAY_OF_MONTH, 11);
            f31date = cal.getTime();
            cal.add(Calendar.DAY_OF_MONTH, 21);
            f32date = cal.getTime();
            repo.save(new Travel("TRR", "MER", f31date, f32date, 45000L)); // Future flight
            repo.flush();
        };
    }
}
