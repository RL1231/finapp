# --- Stage 1: Build the Application ---
FROM maven:3.9.16-eclipse-temurin-25 AS build
WORKDIR /app

# Copy configuration and source code
COPY pom.xml .
COPY src ./src

# Package the application (skipping tests for build speed)
RUN mvn clean package -DskipTests

# --- Stage 2: Runtime Environment ---
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]