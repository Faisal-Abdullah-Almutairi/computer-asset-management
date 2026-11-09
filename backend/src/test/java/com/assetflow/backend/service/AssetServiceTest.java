
package com.assetflow.backend.service;


import com.assetflow.backend.model.ComputerAsset;
import com.assetflow.backend.repository.AssetRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class AssetServiceTest {

    @Mock
    private AssetRepository repository;

    @InjectMocks
    private AssetService assetService;

    @Test
    void shouldAddComputerSuccessfully() {
        ComputerAsset input = new ComputerAsset(
            null,
            "Dell",
            "Latitude 5440",
            "Ahmed Ali",
            "Assigned"
        );

        ComputerAsset saved = new ComputerAsset(
            1L,
            "Dell",
            "Latitude 5440",
            "Ahmed Ali",
            "Assigned"
        );

        when(repository.save(any(ComputerAsset.class)))
            .thenReturn(saved);

        ComputerAsset result = assetService.addAsset(input);

        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("Dell", result.brand());
        assertEquals("Latitude 5440", result.model());

        verify(repository, times(1))
            .save(any(ComputerAsset.class));
    }




    
@Test
void shouldGetComputerByIdSuccessfully() {
    ComputerAsset computer = new ComputerAsset(
        1L,
        "Dell",
        "Latitude 5440",
        "Ahmed Ali",
        "Assigned"
    );

    when(repository.findById(1L))
        .thenReturn(java.util.Optional.of(computer));

    ComputerAsset result = assetService.getAssetById(1L);

    assertNotNull(result);
    assertEquals(1L, result.id());
    assertEquals("Dell", result.brand());
    assertEquals("Latitude 5440", result.model());

    verify(repository, times(1)).findById(1L);
}



@Test
void shouldThrowExceptionWhenComputerNotFound() {
    when(repository.findById(999L))
        .thenReturn(java.util.Optional.empty());

    assertThrows(
        java.util.NoSuchElementException.class,
        () -> assetService.getAssetById(999L)
    );

    verify(repository, times(1)).findById(999L);
}



@Test
void shouldUpdateComputerSuccessfully() {
    Long computerId = 1L;

    ComputerAsset existing = new ComputerAsset(
        computerId,
        "Dell",
        "Latitude 5440",
        "Ahmed Ali",
        "Assigned"
    );

    ComputerAsset updatedData = new ComputerAsset(
        null,
        "HP",
        "EliteBook 840",
        "Mohammed Ali",
        "Available"
    );

    ComputerAsset saved = new ComputerAsset(
        computerId,
        "HP",
        "EliteBook 840",
        "Mohammed Ali",
        "Available"
    );

    when(repository.findById(computerId))
        .thenReturn(java.util.Optional.of(existing));

    when(repository.save(any(ComputerAsset.class)))
        .thenReturn(saved);

    ComputerAsset result = assetService.updateAsset(
        computerId,
        updatedData
    );

    assertNotNull(result);
    assertEquals(computerId, result.id());
    assertEquals("HP", result.brand());
    assertEquals("EliteBook 840", result.model());
    assertEquals("Mohammed Ali", result.assignedTo());
    assertEquals("Available", result.status());

    verify(repository, times(1)).findById(computerId);
    verify(repository, times(1))
        .save(any(ComputerAsset.class));
}



@Test
void shouldDeleteComputerSuccessfully() {
    Long computerId = 1L;

    ComputerAsset existing = new ComputerAsset(
        computerId,
        "Dell",
        "Latitude 5440",
        "Ahmed Ali",
        "Assigned"
    );

    when(repository.findById(computerId))
        .thenReturn(java.util.Optional.of(existing));

    assetService.deleteAsset(computerId);

    verify(repository, times(1)).findById(computerId);
    verify(repository, times(1)).deleteById(computerId);
}


@Test
void shouldReturnPaginatedComputers() {
    ComputerAsset computer1 = new ComputerAsset(
        1L, "Dell", "Latitude 5440", "Ahmed", "Assigned"
    );

    ComputerAsset computer2 = new ComputerAsset(
        2L, "HP", "EliteBook 840", null, "Available"
    );

    PageRequest pageRequest = PageRequest.of(0, 2);

    Page<ComputerAsset> mockPage = new PageImpl<>(
        List.of(computer1, computer2),
        pageRequest,
        5
    );

    when(repository.findAll(pageRequest))
        .thenReturn(mockPage);

    Page<ComputerAsset> result =
        assetService.getAssetsByPage(0, 2);

    assertNotNull(result);
    assertEquals(2, result.getContent().size());
    assertEquals(5, result.getTotalElements());
    assertEquals(3, result.getTotalPages());
    assertEquals(0, result.getNumber());

    verify(repository, times(1)).findAll(pageRequest);
}




}
