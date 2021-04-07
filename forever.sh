#!/bin/bash
cd /root/jcm/zenbot_jcm_1/
docker-compose up -d mongodb
sh forever.sh trade --paper
cd /root/jcm/zenbot_jcm_2
sh forever.sh trade --paper
cd /root/juampi/zenbont_jp_1
sh forever.sh trade --paper
cd /root/juampi/zenbont_jp_2
sh forever.sh trade --paper
