package com.ensias.spacex.configuration;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *  this function is used to redirect every URL not maintained by a controller to Angular
 */
@Controller
public class SPAForwarder {
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect(@PathVariable String path) {
        return "forward:/";
    }
}
