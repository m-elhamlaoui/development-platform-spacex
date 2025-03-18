pluginManagement {
	repositories {
		maven { url = uri("https://repo.spring.io/snapshot") }
		gradlePluginPortal()
	}
}
rootProject.name = "SpaceX"
include("Backend","Frontend")
