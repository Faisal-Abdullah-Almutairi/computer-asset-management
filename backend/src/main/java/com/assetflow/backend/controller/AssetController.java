

package com.assetflow.backend.controller;

import com.assetflow.backend.model.ComputerAsset;
import com.assetflow.backend.service.AssetService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetService service;

    public AssetController(AssetService service) {
        this.service = service;
    }

   
    @PostMapping
    public ResponseEntity<ComputerAsset> addAsset(@Valid @RequestBody ComputerAsset asset) {

        ComputerAsset savedAsset = service.addAsset(asset);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedAsset);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ComputerAsset> getAssetById(@PathVariable Long id) {

        return ResponseEntity.ok(service.getAssetById(id));
    }

    
    @GetMapping
    public ResponseEntity<Page<ComputerAsset>> getAllAssets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                service.getAssetsByPage(page, size));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ComputerAsset> updateAsset(@PathVariable Long id, @Valid @RequestBody ComputerAsset asset) {

        return ResponseEntity.ok(
                service.updateAsset(id, asset));
    }

   
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {

        service.deleteAsset(id);

        return ResponseEntity.noContent().build();
    }

   
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNotFound(NoSuchElementException exception) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(exception.getMessage());
    }

    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleInvalidArgument(
            IllegalArgumentException exception) {

        return ResponseEntity
                .badRequest()
                .body(exception.getMessage());
    }
}


