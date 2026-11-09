
package com.assetflow.backend.repository;

import com.assetflow.backend.model.ComputerAsset;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AssetRepository
        extends ListCrudRepository<ComputerAsset, Long>,
                PagingAndSortingRepository<ComputerAsset, Long> {
}

