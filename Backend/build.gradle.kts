plugins {
	java
	id("org.springframework.boot") version "3.4.3"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.ensias.spacex"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa") // makes life easier (don't wanna write SQL commands)
	runtimeOnly("com.h2database:h2") // at first i will stick to an in memory database
  runtimeOnly("org.postgresql:postgresql")
	compileOnly("org.projectlombok:lombok") // because no one write Getters and Setters anymore :p
	developmentOnly("org.springframework.boot:spring-boot-devtools") // because it is handy
	annotationProcessor("org.projectlombok:lombok")
	implementation("org.springframework.boot:spring-boot-starter-web")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
