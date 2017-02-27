#!/usr/bin/env node

'use strict'

const meow = require('meow')
const speedTest = require('speedtest-net')
const updateNotifier = require('update-notifier')
const pkg = require('./package.json')

updateNotifier({pkg}).notify()

// silly usage
const cli = new meow([
  'brought to you by @yuribrunetto',
  ' '
])


// st
let st = speedTest({ maxTime: 20000 })

st.on('data', data => {
  let download = (data.speeds.download * 125).toFixed(2)
  let upload = (data.speeds.upload * 125).toFixed(2)
  let ping = data.server.ping

  console.log('\nFinal results:')
  console.log('Download speed: ' + download + ' kB/s')
  console.log('Upload speed: ' + upload + ' kB/s')
  console.log('Latency: ' + ping + ' ms')
})

st.on('downloadspeedprogress', speed => {
  console.log('Download: ' + (speed * 125).toFixed(2) + ' kB/s')
})
st.on('uploadspeedprogress', speed => {
  console.log('Upload: ' + (speed * 125).toFixed(2) + ' kB/s')
})

st.on('error', err => {
  if (err.code === 'ENOTFOUND')
    console.error('Unable to connect to the server. Please, check your internet connection.')
})
