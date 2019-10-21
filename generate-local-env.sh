#!/bin/bash
#
# Copyright 2019 Globo.com authors. All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
#
# This script will generate environment variables for local development 
#


echo 'REACT_APP_HUSKYCI_FE_API_ADDRESS="http://127.0.0.1:8888"' > .env
echo 'SKIP_PREFLIGHT_CHECK=true' >> .env