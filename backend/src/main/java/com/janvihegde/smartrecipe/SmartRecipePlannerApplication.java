package com.janvihegde.smartrecipe;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;

@Slf4j
@SpringBootApplication
public class SmartRecipePlannerApplication {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private Environment env;

    public static void main(String[] args) {
        SpringApplication.run(SmartRecipePlannerApplication.class, args);
    }

    @PostConstruct
    public void testConnection() {
        System.out.println("CONNECTED TO: " + mongoTemplate.getDb().getName());
        System.out.println("Collections: " + mongoTemplate.getDb().listCollectionNames().into(new ArrayList<>()));
        System.out.println("Recipe count = " + mongoTemplate.getCollection("recipe").countDocuments());
    }

    @PostConstruct
    public void checkActiveProfiles() {
        log.info("ACTIVE PROFILES: {}", String.join(", ", env.getActiveProfiles()));
        log.info("DEFAULT PROFILES: {}", String.join(", ", env.getDefaultProfiles()));
    }
    @PostConstruct
    public void printProperties() {
        System.out.println("DB FROM PROPERTIES = " + env.getProperty("spring.data.mongodb.database"));
        System.out.println("URI FROM PROPERTIES = " + env.getProperty("spring.data.mongodb.uri"));
    }

}
