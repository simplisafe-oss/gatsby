#!/usr/bin/env bash
##################################################
# This shell script is executed by nx-release.mjs #
##################################################

NX_VERSION=$1
ANGULAR_CLI_VERSION=$2
TYPESCRIPT_VERSION=$3
PRETTIER_VERSION=$4

if [[ $NX_VERSION == "--local" ]]; then
    NX_VERSION="*"
fi

rm -rf dist
npx nx run-many -t=build --parallel || { echo 'Build failed' ; exit 1; }

cd dist/packages

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i "" "s|exports.nxVersion = '\*';|exports.nxVersion = '$NX_VERSION';|g" gatsby/src/utils/versions.js
    sed -i "" "s|\*|$NX_VERSION|g" gatsby/package.json
else
    sed -i "s|exports.nxVersion = '\*';|exports.nxVersion = '$NX_VERSION';|g" gatsby/src/utils/versions.js
    sed -i "s|\*|$NX_VERSION|g" gatsby/package.json
fi

if [[ $NX_VERSION == "*" ]]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -E -i "" "s|\"@simplisafe-oss\/([^\"]+)\": \"\\*\"|\"@simplisafe-oss\/\1\": \"file:$PWD\/\1\"|" gatsby/package.json
    else
    echo $PWD
        sed -E -i "s|\"@simplisafe-oss\/([^\"]+)\": \"\\*\"|\"@simplisafe-oss\/\1\": \"file:$PWD\/\1\"|" gatsby/package.json
    fi
fi
