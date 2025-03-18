tasks.register("StackRun") {
    group = "application"
    description = "Build Angular and run Spring Boot application"
    dependsOn("Frontend:Ngbuild", "Backend:bootRun")
}

