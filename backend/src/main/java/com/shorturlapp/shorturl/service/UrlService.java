package com.shorturlapp.shorturl.service;

import com.shorturlapp.shorturl.entity.Url;
import com.shorturlapp.shorturl.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UrlService {
    @Autowired
    private UrlRepository urlRepository;


    public List<Url> getAllUrls() {
        return urlRepository.findAll();
    }
    public Url getUrlById(Long id) {
        return urlRepository.findById(id).orElse(null);
    }
    public Url getUrlByShortUrl(String shortUrl) {
        return urlRepository.findByShortUrl(shortUrl);
    }

    public Url createUrl(Url url) {
        return urlRepository.save(url);
    }

    public Url updateUrl(Url url) {
        Url existingUrl = urlRepository.findById(url.getId()).orElse(null);
        existingUrl.setShortUrl(url.getShortUrl());
        existingUrl.setOriginalUrl(url.getOriginalUrl());
        return urlRepository.save(existingUrl);
    }
    public void deleteUrl(Long id) {
        urlRepository.deleteById(id);
    }
}

