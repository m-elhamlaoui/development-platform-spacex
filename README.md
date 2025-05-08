# SpaceX

Un projet full-stack combinant **Spring Boot** (backend) et **Angular** (frontend** — non inclus ici) pour gérer un panier de voyages spatiaux.  
Le backend expose une API REST permettant de créer un panier, d’y ajouter/retraiter des voyages, et de rechercher/consulter des voyages selon différents critères.

# SpaceX Backend API

## 1. Introduction

Le projet **SpaceX** est une application RESTful développée avec Spring Boot (Java 17) côté serveur et Angular côté client. Il permet de :
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

 ---

## 4. Arborescence du projet (Backend)

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

## 5. Description des composants

### 5.1 Configuration

- **LoadData** (`@Configuration`, profil `!test`) : initialise quelques objets `Travel` en base au démarrage (dates et prix).
- **LoadTestData** (`@Configuration`, profil `test`) : injecte des voyages passés, en cours et futurs pour les tests.

### 5.2 Modèles

- **Travel** (`@Entity`) :
    - `id` (auto-généré)
    - `depart`, `arrive`
    - `dateDepart`, `dateArrivee`
    - `prix`
- **Basket** (non-JPA) : liste en mémoire de `Travel` avec `addTravel(...)` et `removeTravelById(...)` (lève `TravelNotFoundException`).

### 5.3 Repositories

- **TravelRepository** (`JpaRepository<Travel,Long>`) :
    - `getCurrentTravelsAtDate(Date now)`
    - `findAvailableTravels(Date now)`
    - `searchForTravels(String depart, String arrive, Date now)`
- **BasketRepository** (`@ApplicationScope`) :
    - `createBasket()` → nouvel UUID
    - `getBasket(String id)` → `Basket` ou `BasketNotFoundException`

### 5.4 Services

- **TravelService** :
    - `getCurrentTravels()` → `List<TravelDto>` (calcule un pourcentage d’avancement)
    - `getExploredTravels()` → `List<Travel>`
    - `searchForTravels(SearchRequestDto)` → `List<Travel>`
- **BasketService** :
    - `createNewBasket()` → `CreateBasketReplyDto`
    - `addToBasket(BasketRequestAddDelDto)` / `removeFromBasket(...)`
    - `getBasket(String)` → `List<Travel>`




### 5.5 Contrôleurs REST

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


### 5.6 DTOs

- **BasketRequestAddDelDto** : `{ "basketId": "String", "travelId": Long }`
- **BasketRequestDto**       : `{ "basketId": "String" }`
- **CreateBasketReplyDto**   : `{ "basketId": "String" }`
- **SearchRequestDto**       : `{ "depart": "String", "arrive": "String" }`
- **TravelDto**              : `{ depart, arrive, dateDepart, dateArrive, percentage }`

### 5.7 Tests d’intégration

- **SpaceXApplicationTests** (`@SpringBootTest`, profil `test`) :
    1. Voyage courant (GET `/api/v1/currentTravels`)
    2. Voyage futur (GET `/api/v1/exploreTravels`)
    3. Création/ajout/suppression dans un panier

 ---

## 6. Évolutions possibles

- Persistance réelle des paniers (JPA/Hibernate)
- Sécurisation (Spring Security, JWT)
- Pagination et filtres avancés
- Couche Angular : CLI, composants, services HTTP

 ---

## 7. Licence

_MIT LICENSE_

