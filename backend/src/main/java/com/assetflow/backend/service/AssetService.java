
package com.assetflow.backend.service;

import com.assetflow.backend.model.ComputerAsset;
import com.assetflow.backend.repository.AssetRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AssetService {

    private final AssetRepository repository;

    public AssetService(AssetRepository repository) {
        this.repository = repository;
    }

    
    
public ComputerAsset addAsset(ComputerAsset asset) {
    ComputerAsset newAsset = new ComputerAsset(
        null,
        asset.brand(),
        asset.model(),
        asset.assignedTo(),
        asset.status()
    );

    return repository.save(newAsset);
}


  
    public ComputerAsset getAssetById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(
                        "Asset not found with ID: " + id));
    }

    
    public List<ComputerAsset> getAllAssets() {
        return repository.findAll();
    }

   
    public Page<ComputerAsset> getAssetsByPage(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

   
    public ComputerAsset updateAsset(Long id, ComputerAsset updatedAsset) {

        getAssetById(id);

        ComputerAsset asset = 
        new ComputerAsset(
        id,
        updatedAsset.brand(),
        updatedAsset.model(),
        updatedAsset.assignedTo(),
        updatedAsset.status()
    );



        return repository.save(asset);
    }

   
    public void deleteAsset(Long id) {
        getAssetById(id);
        repository.deleteById(id);
    }
}

