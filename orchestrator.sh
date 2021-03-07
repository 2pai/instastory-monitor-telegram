#!/bin/bash

echo "Run Collector"
npm run collect
echo "Run Downloader"
npm run download
echo "Run Dispatcher"
npm run dispatch
