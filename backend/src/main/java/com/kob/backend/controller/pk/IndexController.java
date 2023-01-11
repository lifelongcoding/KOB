package com.kob.backend.controller.pk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.xml.ws.RequestWrapper;

@Controller
@RequestMapping("/pk/") //父目录

public class IndexController {
    @RequestMapping("index/")
    public String index() {
        return "pk/index.html";
    }
}
