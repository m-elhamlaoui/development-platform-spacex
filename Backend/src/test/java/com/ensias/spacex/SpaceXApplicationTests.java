package com.ensias.spacex;

import com.ensias.spacex.DTO.BasketRequestAddDelDto;
import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.DTO.CreateBasketReplyDto;
import com.ensias.spacex.DTO.TravelDto;
import com.ensias.spacex.model.Travel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

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

	@Test
	void basketTest(){
		String basketid;
		RestTemplate template = builder.rootUri("http://localhost:" + port).build();
		// create a basket
		ResponseEntity<CreateBasketReplyDto> response = template.exchange(RequestEntity.post("/api/v1/createBasket").build(), CreateBasketReplyDto.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		basketid = response.getBody().getBasketId();
		assertThat(response).isNotNull(); // make sure it is not null

		// make sure the basket not null and is empty
		RequestEntity<BasketRequestDto> request1 = RequestEntity
				.post(URI.create("http://localhost:" + port + "/api/v1/getBasket"))
				.contentType(MediaType.APPLICATION_JSON)
				.body(new BasketRequestDto(basketid));

		ResponseEntity<Travel[]> response1 = template.exchange(request1, Travel[].class);
		assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.OK);
		Travel[] travels = response1.getBody();
		assertThat(travels).isNotNull();
		assertThat(travels.length).isEqualTo(0);

		// add a travel to the basket
		RequestEntity<BasketRequestAddDelDto> request2 = RequestEntity
				.post(URI.create("http://localhost:" + port + "/api/v1/addToBasket"))
				.contentType(MediaType.APPLICATION_JSON)
				.body(new BasketRequestAddDelDto(basketid,2L));

		ResponseEntity<Travel[]> response2 = template.exchange(request2,Travel[].class);
		assertThat(response2.getStatusCode()).isEqualTo(HttpStatus.OK);
		Travel[] travels2 = response2.getBody();
		assertThat(travels2).isNotNull();
		assertThat(travels2.length).isEqualTo(1);

		// remove travel from basket
		RequestEntity<BasketRequestAddDelDto> request3 = RequestEntity
				.post(URI.create("http://localhost:" + port + "/api/v1/removeFromBasket"))
				.contentType(MediaType.APPLICATION_JSON)
				.body(new BasketRequestAddDelDto(basketid,2L));

		ResponseEntity<Travel[]> response3 = template.exchange(request3, Travel[].class);
		assertThat(response3.getStatusCode()).isEqualTo(HttpStatus.OK);
		Travel[] travels3 = response3.getBody();
		assertThat(travels3).isNotNull();
		assertThat(travels3.length).isEqualTo(0);




	}


}
