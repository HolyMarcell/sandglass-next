docker build . -t local/sandglass
docker compose -f docker-compose-prod.yml up -d
docker compose -f docker-compose-prod.yml restart sandglass_app
