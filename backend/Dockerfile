# Use an official PHP runtime as a parent image
FROM php:8.0-apache

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install pdo_mysql zip

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy composer.json and composer.lock and install dependencies before copying code for better caching
COPY composer.json composer.lock ./

# Copy the .env.example file as .env

# Install Composer dependencies
RUN composer install --no-scripts

# Copy the rest of the application code into the container
COPY . .

COPY .env.example .env

# Generate application key
RUN php artisan key:generate
# Set the appropriate permissions for Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Start Apache when the container starts
CMD ["php", "artisan", "serve", "--host", "0.0.0.0"]