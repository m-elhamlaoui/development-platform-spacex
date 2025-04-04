package com.ensias.spacex;

import com.ensias.spacex.DTO.TravelDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class SpaceXApplicationTests {

	@LocalServerPort
	int port;

	@Autowired
	private RestTemplateBuilder builder;



	@Test
	void shouldReturnOneCurrentTravelWithCorrectDetails() {
		RestTemplate template = builder.rootUri("http://localhost:" + port).build();
		ResponseEntity<TravelDto[]> response = template.exchange(RequestEntity.get("/api/v1/currentTravels").build(), TravelDto[].class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		TravelDto[] travels = response.getBody();
		assertThat(travels).isNotNull();
		assertThat(travels.length).isEqualTo(1);
		assertThat(travels[0].getDepart()).isEqualTo("MRS");
		assertThat(travels[0].getArrive()).isEqualTo("TRR");
	}

	@Test
	void shouldReturnOneFutureTravelWithCorrectDetails() {
		RestTemplate template = builder.rootUri("http://localhost:" + port).build();
		ResponseEntity<TravelDto[]> response = template.exchange(RequestEntity.get("/api/v1/exploreTravels").build(), TravelDto[].class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		TravelDto[] travels = response.getBody();
		assertThat(travels).isNotNull();
		assertThat(travels.length).isEqualTo(1);
		assertThat(travels[0].getDepart()).isEqualTo("MON");
		assertThat(travels[0].getArrive()).isEqualTo("JUP");
	}


}
