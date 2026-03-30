package com.lavajato.backend.config;

import com.zaxxer.hikari.HikariDataSource;
import java.net.URI;
import java.net.URISyntaxException;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Value("${DATABASE_USERNAME:}")
    private String databaseUsername;

    @Value("${DATABASE_PASSWORD:}")
    private String databasePassword;

    @Bean
    public DataSource dataSource() {
        DatabaseSettings settings = resolveDatabaseSettings();

        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setJdbcUrl(settings.jdbcUrl());
        dataSource.setUsername(settings.username());
        dataSource.setPassword(settings.password());
        return dataSource;
    }

    private DatabaseSettings resolveDatabaseSettings() {
        if (databaseUrl == null || databaseUrl.isBlank()) {
            return new DatabaseSettings(
                "jdbc:postgresql://localhost:5432/lavajato",
                fallback(databaseUsername, "postgres"),
                fallback(databasePassword, "postgres")
            );
        }

        if (databaseUrl.startsWith("jdbc:postgresql://")) {
            return new DatabaseSettings(
                databaseUrl,
                fallback(databaseUsername, "postgres"),
                fallback(databasePassword, "postgres")
            );
        }

        if (databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("postgres://")) {
            return parseRenderStyleUrl(databaseUrl);
        }

        throw new IllegalStateException("Formato de DATABASE_URL nao suportado.");
    }

    private DatabaseSettings parseRenderStyleUrl(String rawUrl) {
        try {
            URI uri = new URI(rawUrl);
            String[] credentials = uri.getUserInfo() != null ? uri.getUserInfo().split(":", 2) : new String[0];
            String username = credentials.length > 0 ? credentials[0] : fallback(databaseUsername, "postgres");
            String password = credentials.length > 1 ? credentials[1] : fallback(databasePassword, "postgres");
            int port = uri.getPort() == -1 ? 5432 : uri.getPort();
            String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath();

            return new DatabaseSettings(jdbcUrl, username, password);
        } catch (URISyntaxException error) {
            throw new IllegalStateException("DATABASE_URL invalida.", error);
        }
    }

    private String fallback(String value, String defaultValue) {
        return value == null || value.isBlank() ? defaultValue : value;
    }

    private record DatabaseSettings(String jdbcUrl, String username, String password) {
    }
}
