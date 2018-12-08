#!/bin/bash

cd /opt && \
  git init --bare act.git && \
  git clone act.git act

cp /root/.scripts/post-receive /opt/act.git/hooks
chmod ug+x /opt/act.git/hooks/post-receive
cp /root/.scripts/.env /opt/act
