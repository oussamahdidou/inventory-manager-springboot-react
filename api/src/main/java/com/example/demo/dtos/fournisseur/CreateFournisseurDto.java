package com.example.demo.dtos.fournisseur;

import lombok.Data;

@Data
public class CreateFournisseurDto {
    private String nom;
    private String contact;
    private String adresse;
    private String telephone;
}
