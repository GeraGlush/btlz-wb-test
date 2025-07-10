# Быстрый старт

* Склонируйте репозиторий:
git clone <URL_репозитория>
cd <папка_проекта>

* Добавьте .env в корень репозитория и credentials.json в src/config/google/ 

* Запустите docker на пк

* Запустите миграции базы данных:
docker compose run --rm app npx knex migrate:latest --knexfile knexfile.cjs

* Запустите проект (собственно сервис и база в контейнерах):
docker compose up