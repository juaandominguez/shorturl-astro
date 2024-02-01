package com.shorturlapp.shorturl.controller;

import com.shorturlapp.shorturl.dto.UrlDTO;
import com.shorturlapp.shorturl.entity.Url;
import com.shorturlapp.shorturl.service.UrlService;
import jakarta.validation.Valid;
import org.hibernate.id.uuid.UuidGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URL;
import java.util.UUID;

@RestController
public class UrlController {
    private static final String BASE_URL = "http://localhost:4321/";
    @Autowired
    private UrlService urlService;
    @PostMapping("shorturl")
    public ResponseEntity<Url> postShortUrl(@RequestBody @Valid UrlDTO url) {
        try{
            new URL(url.getOriginalUrl());
            Url existingUrl = urlService.getUrlByShortUrl(BASE_URL + url.getId());
            if(existingUrl != null) {
                return ResponseEntity.status(409).build();
            }
            Url retUrl = urlService.createUrl(new Url(null, url.getOriginalUrl(), BASE_URL + url.getId()));

            if(url.getId() == null){
                url.setId(UUID.randomUUID().toString());
            }
            return ResponseEntity.created(URI.create(BASE_URL + url.getId())).body(retUrl);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("shorturl")
    public ResponseEntity<String> getShortUrl(@RequestParam String id) {
        Url existingUrl = urlService.getUrlByShortUrl(BASE_URL + id);
        if(existingUrl == null) {
            return ResponseEntity.status(404).body("Not found");
        }
        return ResponseEntity.ok().body(existingUrl.getOriginalUrl());
    }

    @DeleteMapping("shorturl")
    public ResponseEntity<String> deleteShortUrl(@RequestBody String url) {
        Url existingUrl = urlService.getUrlByShortUrl(url);
        if(existingUrl == null) {
            return ResponseEntity.status(404).body("Not found");
        }
        urlService.deleteUrl(existingUrl.getId());
        return ResponseEntity.noContent().build();
    }
}
