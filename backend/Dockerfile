# Use an official PHP runtime as a parent image
FROM php:8.0-apache

# Set the working directory in the container
WORKDIR /var/www/html

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

# Install Composer dependencies
RUN composer install

# Copy the rest of the application code into the container
COPY . .

# Set the appropriate permissions for Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Expose port 80 for the web server
EXPOSE 8080

# Start Apache when the container starts
CMD ["apache2-foreground"]