# Быстрый старт

* Склонируйте репозиторий:
git clone <URL_репозитория>
cd <папка_проекта>
Создайте файл .env на основе шаблона .env.example и заполните нужные переменные. Пример уже настроеного env отправлю на hh

* Запустите миграции базы данных:
docker compose run --rm app npx knex migrate:latest --knexfile knexfile.cjs

* Запустите проект (собственно сервис и база в контейнерах):
docker compose up