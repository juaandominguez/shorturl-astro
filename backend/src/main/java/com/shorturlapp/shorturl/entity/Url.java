package com.shorturlapp.shorturl.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "url")
public class Url {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String originalUrl;
    @NotNull
    private String shortUrl;

}
