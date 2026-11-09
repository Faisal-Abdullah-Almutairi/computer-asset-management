
package com.assetflow.backend.model;

import org.springframework.data.annotation.Id;
import jakarta.validation.constraints.NotBlank;

public record ComputerAsset(
    @Id
    Long id,

    @NotBlank
    String brand,

    @NotBlank
    String model,

    String assignedTo,

    @NotBlank
    String status
) {
}



