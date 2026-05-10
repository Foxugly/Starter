sudo useradd -r -g www-data -s /usr/sbin/nologin django
sudo mkdir -p /var/log/starter
sudo touch /var/log/starter/gunicorn-access.log
sudo touch /var/log/starter/gunicorn-error.log
sudo chown -R django:www-data /var/log/starter
sudo chmod 755 /var/log/starter
sudo chmod 644 /var/log/starter/gunicorn-access.log /var/log/starter/gunicorn-error.log
sudo mkdir -p /var/www/django_websites/Starter/starter-server/run
sudo chown -R django:www-data /var/www/django_websites/Starter/starter-server/run
sudo chmod 755 /var/www/django_websites/Starter/starter-server/run
sudo systemctl restart starter-gunicorn
sudo systemctl restart starter-celery
sudo systemctl restart qtu uizonline-celery-beat
