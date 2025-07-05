FROM php:8.2-cli

WORKDIR /app

# Install PostgreSQL PDO extension
RUN apt-get update && apt-get install -y \
    libpq-dev unzip \
    && docker-php-ext-install pdo pdo_pgsql

COPY server/ /app
COPY .env /app/.env

# Install Composer and dependencies
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php \
    && mv composer.phar /usr/local/bin/composer \
    && rm composer-setup.php

RUN composer install

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "."]