# Notatnik Vue

Projekt to prosta aplikacja notatnika napisana we Vue 3 przy użyciu Composition API. Strona posiada podstawowy routing:
Strona główna wyświetla przypięte notatki oraz pogodę domyślnie dla miejscowości Gdańsk (API OpenWeather).
Strona "notes" wyświetla wszystkie notatki oraz umożliwia dodanie nowych. Notatka składa się z tytułu oraz opcjonalnego opisu, a notatkę można też przypiąć. Notatki zapisują się w localStorage, więc po odświeżeniu strony czy wyjściu z niej nie powinny znikać.
Strona logowania to tylko strona z walidatorem email i hasła. Nie ma żadnego związku z logowaniem. Jeśli email będzie poprawny, a hasło spełni założenia (min. 8 znaków, 1 litera mała, 1 litera duża, 1 cyfra, 1 znak specjalny), użytkownik zostanie "zalogowany", czyli zostanie przekierowany do strony głównej, gdzie wyświetli się jego nazwa.

### Instalacja projektu

```sh
npm install
```

### Serwer dewoloperski

```sh
npm run dev
```

### Kompilacja i minifikacja do wersji produkcyjnej

```sh
npm run build
```
