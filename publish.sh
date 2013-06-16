#!/bin/sh

#  publish.sh
#  
#  Commit, sync to GitHub and deply to webserver
#  Created by Henrik Roos on 2013-06-16.
#
git commit -am '$1'
git push
git deploy
exit