# New Ones — strona wizytówka

Statyczna strona (HTML + CSS + odrobina JS), bez części serwerowej. Hosting: GitHub Pages.

## Struktura
- `index.html` — strona główna
- `o-nas.html`, `budowa.html`, `wykonczenia.html`, `realizacje.html`, `kontakt.html`
- `assets/css/style.css` — wygląd; kolory firmowe na górze pliku (`--orange`, `--bg`)
- `assets/js/main.js` — menu mobilne, galeria (lightbox)
- `assets/img/` — zdjęcia; `placeholder.svg` to tymczasowy zamiennik

## Podmiana zdjęć
Wrzuć zdjęcie do `assets/img/` (najlepiej `.webp` lub `.jpg`, szerokość ok. 1600–2000 px, do ~300 KB)
i zamień `src="assets/img/placeholder.svg"` na ścieżkę do pliku. Miejsca oznaczone są komentarzami `PODMIEŃ`.

## Fonty
Bebas Neue i Montserrat (licencja SIL OFL) są w `assets/fonts/` i ładują się z tej strony, a nie z serwerów
Google (bez przekazywania adresów IP odwiedzających do Google). Deklaracje `@font-face` są na początku `style.css`.

## Przejścia między stronami
`@view-transition` na końcu `style.css`: nagłówek i pasek kontaktu zostają na miejscu, treść się przenika.
Działa w Chrome/Edge/Safari 18.2+, w pozostałych przeglądarkach strona przeładowuje się zwyczajnie.

## Zmiany w CSS/JS
Linki do `style.css` i `main.js` mają numer wersji (`?v=2`). Po zmianie tych plików podbij numer
we wszystkich plikach `.html`, żeby przeglądarki odwiedzających pobrały nową wersję zamiast starej z pamięci.

## Podgląd lokalny
```
python -m http.server 8080
```
i otwórz http://localhost:8080

## Publikacja na GitHub Pages
1. Utwórz repozytorium i wypchnij pliki do gałęzi `main`.
2. Settings → Pages → Source: *Deploy from a branch*, gałąź `main`, folder `/ (root)`.
3. Własna domena: Settings → Pages → Custom domain → `newones.pl` (lub `www.newones.pl`).
   W DNS domeny ustaw rekordy A `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   oraz CNAME `www` → `<login>.github.io`. **Nie zmieniaj rekordów MX** — obsługują pocztę w Google Workspace.
4. Zaznacz *Enforce HTTPS*.
