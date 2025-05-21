FROM eclipse-temurin:17-alpine
COPY app.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar","-Dspring.profiles.active=prod"]
EXPOSE 8080
