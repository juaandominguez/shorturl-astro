package com.shorturlapp.shorturl.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrlDTO {
    @NotNull
    private String originalUrl;
    private String id;
}
