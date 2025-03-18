package com.ensias.spacex.Repositories;

import com.ensias.spacex.model.Travel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TravelRepository extends JpaRepository <Travel,Long> {

    @Query(value = "select t from Travel t  where t.dateArrivee > :now and t.dateDepart < :now")
    List<Travel> getCurrentTravelsAtDate(@Param("now")Date now);
    @Query(value = "select t from Travel t  where t.depart = :depart  and t.arrive = :arrive and t.dateArrivee > :date")
    List<Travel> searchForTravels(@Param("depart")String depart,@Param("arrive")String arrive,@Param("date") Date date);
}
