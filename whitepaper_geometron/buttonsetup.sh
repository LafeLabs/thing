sudo mv listen-for-shutdown.py /usr/local/bin/
sudo chmod +x /usr/local/bin/listen-for-shutdown.py
sudo mv listen-for-shutdown.sh /etc/init.d/
sudo chmod +x /etc/init.d/listen-for-shutdown.sh
sudo update-rc.d listen-for-shutdown.sh defaults

sudo mv listen-for-go-button.py /usr/local/bin/
sudo chmod +x /usr/local/bin/listen-for-go-button.py
sudo mv listen-for-go-button.sh /etc/init.d/
sudo chmod +x /etc/init.d/listen-for-go-button.sh
sudo update-rc.d listen-for-go-button.sh defaults