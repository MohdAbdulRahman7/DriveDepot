FROM maven:3.8.7-openjdk-18 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:18-ea-8-jdk-slim
COPY --from=build /target/driver-depot-0.01-SNAPSHOT.jar driver-depot.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","driver-depot.jar"]