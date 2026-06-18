#!/usr/bin/env bash
# Сборка статики и деплой на VPS (alina.cd-agency.ru).
# На сервере есть другие проекты — трогаем только свою директорию.
set -euo pipefail

SERVER="root@72.56.39.225"
REMOTE_DIR="/var/www/alina.cd-agency.ru"

echo "==> Сборка статики"
npm run build

echo "==> Загрузка в ${SERVER}:${REMOTE_DIR}"
tar -C out -czf - . | ssh "$SERVER" "
  mkdir -p '${REMOTE_DIR}' &&
  rm -rf '${REMOTE_DIR}'/* &&
  tar -C '${REMOTE_DIR}' -xzf - &&
  chown -R www-data:www-data '${REMOTE_DIR}'
"

echo "==> Готово: https://alina.cd-agency.ru"
