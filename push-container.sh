#!/bin/bash
#
# Copyright 2019 Globo.com authors. All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
#
# This script will push huskyCI-dashboard container to docker hub
#

lastRelease=$(curl -s https://api.github.com/repos/globocom/huskyCI-dashboard/releases/latest | grep "tag_name" | awk -F '"' '{print $4}')
docker tag huskyci/dashboard:latest huskyci/dashboard:$lastRelease
docker push huskyci/dashboard:$lastRelease && docker push huskyci/dashboard:latest
