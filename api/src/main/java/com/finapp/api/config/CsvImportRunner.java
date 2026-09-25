package com.finapp.api.config;

import com.finapp.api.service.CsvImportService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CsvImportRunner implements CommandLineRunner {
    private final CsvImportService csvImportService;

    public CsvImportRunner(CsvImportService csvImportService) {
        this.csvImportService = csvImportService;
    }

    @Override
    public void run(String... args) throws Exception {
        csvImportService.importCsv();
    }
}
