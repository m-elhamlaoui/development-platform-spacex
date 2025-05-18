# SpaceX

Un projet full-stack combinant **Spring Boot** (backend) et **Angular** (frontend** — non inclus ici) pour gérer un panier de voyages spatiaux.  
Le backend expose une API REST permettant de créer un panier, d’y ajouter/retraiter des voyages, et de rechercher/consulter des voyages selon différents critères.

# SpaceX Backend API

## 1. Introduction

Le projet **SpaceX** est une application RESTful développée avec Spring Boot (Java 17) côté serveur et Angular 18  côté client. Il permet de :
- Explorer et rechercher des voyages spatiaux
- Consulter les voyages en cours et à venir
- Gérer un **panier** d’achats (création, ajout, suppression, consultation)

L’application s’appuie sur une base de données en mémoire (H2 par défaut via JPA) et stocke les paniers dans un bean Spring en **application scope**.

 ---

## 2. Prérequis

- **Java 17**
- (Node 20 n’est pas requis globalement : Gradle embarque un Node.js local pour la compilation Angular.)

 ---

## 3. Lancement

### Linux / macOS

 ```bash
 ./gradlew ngbuild
 ./gradlew StackRun
 ```

### Windows (PowerShell / CMD)

 ```powershell
 .\gradlew.bat ngbuild
 .\gradlew.bat StackRun
 ```

Les API sont exposées par défaut sur le port **8080**.

### TLDR 

ce projet combine deux sous projets (springboot - angular) gere par gradle, il est destine a gerer une agence de voyages inter-galactiques, la platforme permet de voir les differents courants, futures voyages ainsi que les reserver

Ce projet a pour objectif de mettre en pratique les technologies étudiées au cours Plates-formes de développement, notamment :

- JAKARTA EE (avec Spring framework)
- JPA (avec H2 et Postgres)
- EJB (Spring Beans)
- Dependency Injection (Spring IOC)
- REST API
- travaille collaborative sur git 

---
### 4.Frontend

 ```
src
├── app
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── components
│   │   ├── booking
│   │   │   ├── booking.component.css
│   │   │   ├── booking.component.html
│   │   │   ├── booking.component.spec.ts
│   │   │   ├── booking.component.ts
│   │   │   └── booking.route.ts
│   │   ├── card
│   │   │   ├── card.component.css
│   │   │   ├── card.component.html
│   │   │   ├── card.component.spec.ts
│   │   │   └── card.component.ts
│   │   ├── checkout
│   │   │   ├── checkout.component.css
│   │   │   ├── checkout.component.html
│   │   │   ├── checkout.component.spec.ts
│   │   │   └── checkout.component.ts
│   │   ├── home
│   │   │   ├── home.component.css
│   │   │   ├── home.component.html
│   │   │   ├── home.component.spec.ts
│   │   │   ├── home.component.ts
│   │   │   └── home.route.ts
│   │   ├── navbar
│   │   │   ├── navbar.component.css
│   │   │   ├── navbar.component.html
│   │   │   ├── navbar.component.spec.ts
│   │   │   └── navbar.component.ts
│   │   ├── scene
│   │   │   ├── scene.component.css
│   │   │   ├── scene.component.html
│   │   │   ├── scene.component.spec.ts
│   │   │   └── scene.component.ts
│   │   ├── search
│   │   │   ├── search.component.css
│   │   │   ├── search.component.html
│   │   │   ├── search.component.spec.ts
│   │   │   ├── search.component.ts
│   │   │   └── search.route.ts
│   │   └── trip-list
│   │       ├── trip-list.component.css
│   │       ├── trip-list.component.html
│   │       ├── trip-list.component.spec.ts
│   │       ├── trip-list.component.ts
│   │       └── trip-list.route.ts
│   ├── DTO
│   │   ├── checkoutPayment.dto.ts
│   │   ├── checkoutPayment.reply.dto.ts
│   │   ├── getCurrentTravels.Reply.dto.ts
│   │   ├── search.dto.ts
│   │   └── searchReply.dto.ts
│   ├── enums
│   │   └── planet.enum.ts
│   ├── models
│   │   └── CheckoutModel.ts
│   └── services
│       ├── checkout.service.spec.ts
│       ├── checkout.service.ts
│       ├── search.service.ts
│       ├── travel-services.service.spec.ts
│       └── travel-services.service.ts
├── index.html
├── main.ts
├── public
│   ├── 11.png
│   ├── earth.jpg
│   ├── favicon.ico
│   ├── jupiter.jpg
│   ├── mars.jpg
│   ├── mercury.jpg
│   ├── neptune.jpg
│   ├── saturn.jpg
│   ├── scene.bin
│   ├── scene.gltf
│   ├── stars.jpg
│   ├── sun.png
│   ├── uranus.jpg
│   └── venus.jpg
└── styles.css
 ```

 ### 4.2 Description des composants

#### 4.2.1 component

##### 4.2.1.1 booking

contient la page qui présente les différentes réservations du client
##### 4.2.1.2 card 

contient la représentation de chaque voyage sous forme de Mat-card (material design)
##### 4.2.1.3 checkout

contient la page qui simule la procédure de paiement
##### 4.2.1.4 home 

page principale
##### 4.2.1.5 navbar 

contient la barre de navigation
##### 4.2.1.6 scene

responsable de l’animation des constellations et de l’affichage des voyages en cours
##### 4.2.1.7 search

page de recherche des voyages
##### 4.2.1.8 trip-list

contient la page qui affiche les futurs voyages
#### 4.2.2 services 

##### 4.2.2.1 travel-services 

service qui communique avec le backend. Il est responsable de la disponibilité de ces informations :
- les futures voyages
- les voyages réservés
- retirer un voyage réservé
- réserver un voyage

la logique du panier est séparée dans un autre service que travel-service utilise
##### 4.2.2.2 basket
responsable du panier de l’utilisateur, il :
- crée un panier sur le serveur et demande l'id
- gère la liste des reservations

##### 4.2.2.3 checkout
responsable de la procédure de paiement
 ---

## 5. Backend
### 5.1 Arborescence du projet (Backend)

 ```
 src/
  └─ main/
      └─ java/com/ensias/spacex/
          ├─ SpaceXApplication.java
          ├─ configuration/
          │   ├─ LoadData.java
          │   └─ LoadTestData.java
          ├─ controllers/
          │   ├─ BasketController.java
          │   ├─ CurrentTravelsController.java
          │   ├─ ExploreTravelsController.java
          │   └─ SearchTravelsController.java
          ├─ DTO/
          │   ├─ BasketRequestAddDelDto.java
          │   ├─ BasketRequestDto.java
          │   ├─ CreateBasketReplyDto.java
          │   ├─ SearchRequestDto.java
          │   └─ TravelDto.java
          ├─ Exceptions/
          │   ├─ BasketNotFoundException.java
          │   └─ TravelNotFoundException.java
          ├─ model/
          │   ├─ Basket.java
          │   └─ Travel.java
          ├─ Repositories/
          │   ├─ BasketRepository.java
          │   └─ TravelRepository.java
          └─ service/
              ├─ BasketService.java
              └─ TravelService.java
 
 src/
  └─ test/java/com/ensias/spacex/
      ├─ LoadTestData.java
      └─ SpaceXApplicationTests.java
 
 build.gradle.kts
 ```

 ---

### 5.2 Description des composants

#### 5.2.1 Configuration

- **LoadData** (`@Configuration`, profil `!test`) : initialise quelques objets `Travel` en base au démarrage (dates et prix).
- **LoadTestData** (`@Configuration`, profil `test`) : injecte des voyages passés, en cours et futurs pour les tests.

#### 5.2.2 Modèles

- **Travel** (`@Entity`) :
    - `id` (auto-généré)
    - `depart`, `arrive`
    - `dateDepart`, `dateArrivee`
    - `prix`
- **Basket** (non-JPA) : liste en mémoire de `Travel` avec `addTravel(...)` et `removeTravelById(...)` (lève `TravelNotFoundException`).

#### 5.2.3 Repositories

- **TravelRepository** (`JpaRepository<Travel,Long>`) :
    - `getCurrentTravelsAtDate(Date now)`
    - `findAvailableTravels(Date now)`
    - `searchForTravels(String depart, String arrive, Date now)`
- **BasketRepository** (`@ApplicationScope`) :
    - `createBasket()` → nouvel UUID
    - `getBasket(String id)` → `Basket` ou `BasketNotFoundException`

#### 5.2.4 Services

- **TravelService** :
    - `getCurrentTravels()` → `List<TravelDto>` (calcule un pourcentage d’avancement)
    - `getExploredTravels()` → `List<Travel>`
    - `searchForTravels(SearchRequestDto)` → `List<Travel>`
- **BasketService** :
    - `createNewBasket()` → `CreateBasketReplyDto`
    - `addToBasket(BasketRequestAddDelDto)` / `removeFromBasket(...)`
    - `getBasket(String)` → `List<Travel>`




#### 5.2.5 Contrôleurs REST

| Route                             | Méthode | Payload / DTO                        | Retour                  |
 |-----------------------------------|:-------:|--------------------------------------|-------------------------|
| `POST /api/v1/createBasket`       | POST    | —                                    | `CreateBasketReplyDto`  |
| `POST /api/v1/getBasket`          | POST    | `BasketRequestDto`                   | `List<Travel>`          |
| `POST /api/v1/addToBasket`        | POST    | `BasketRequestAddDelDto`             | `List<Travel>`          |
| `POST /api/v1/removeFromBasket`   | POST    | `BasketRequestAddDelDto`             | `List<Travel>`          |
| `GET  /api/v1/currentTravels`     | GET     | —                                    | `List<TravelDto>`       |
| `GET  /api/v1/exploreTravels`     | GET     | —                                    | `List<Travel>`          |
| `POST /api/v1/searchTravel`       | POST    | `SearchRequestDto (depart, arrive)`  | `List<Travel>`          |

En cas d’erreur (`BasketNotFoundException`, `TravelNotFoundException`), renvoie **404 Not Found** + message.


#### 5.2.6 DTOs

- **BasketRequestAddDelDto** : `{ "basketId": "String", "travelId": Long }`
- **BasketRequestDto**       : `{ "basketId": "String" }`
- **CreateBasketReplyDto**   : `{ "basketId": "String" }`
- **SearchRequestDto**       : `{ "depart": "String", "arrive": "String" }`
- **TravelDto**              : `{ depart, arrive, dateDepart, dateArrive, percentage }`

#### 5.2.7 Tests d’intégration

- **SpaceXApplicationTests** (`@SpringBootTest`, profil `test`) :
    1. Voyage courant (GET `/api/v1/currentTravels`)
    2. Voyage futur (GET `/api/v1/exploreTravels`)
    3. Création/ajout/suppression dans un panier

 ---

### 5.3 Évolutions possibles

- Persistance réelle des paniers (JPA/Hibernate)
- Sécurisation (Spring Security, JWT)
- Pagination et filtres avancés
- Couche Angular : CLI, composants, services HTTP

 ---

## 6 Licence

_MIT LICENSE_

