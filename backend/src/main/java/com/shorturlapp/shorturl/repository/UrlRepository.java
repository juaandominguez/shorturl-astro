package com.shorturlapp.shorturl.repository;

import com.shorturlapp.shorturl.entity.Url;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UrlRepository extends JpaRepository<Url, Long> {
    Url findByShortUrl(String shortUrl);
}

