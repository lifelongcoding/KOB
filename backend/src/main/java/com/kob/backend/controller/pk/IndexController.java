package com.kob.backend.controller.pk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.xml.ws.RequestWrapper;

@Controller
public class IndexController {
    @RequestMapping("/")
    public String index() {
        return "pk/index.html";
    }
}
