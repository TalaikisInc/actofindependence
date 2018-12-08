#!/bin/bash

cd /opt && \
  git init --bare nakamoto.git && \
  git clone nakamoto.git nakamoto

cp /root/.scripts/post-receive /opt/nakamoto.git/hooks
chmod ug+x /opt/nakamoto.git/hooks/post-receive
cp /root/.scripts/.env /opt/nakamoto
