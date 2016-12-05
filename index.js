#!/usr/bin/env node

const meow = require('meow')
const speedTest = require('speedtest-net')
const updateNotifier = require('update-notifier')

// silly usage
const cli = new meow([
  'brought to you by @yuribrunetto',
  ' '
])

// check for updates
updateNotifier({ pkg: cli.pkg }).notify()

let st = speedTest({ maxTime: 20000 })

st.on('data', data => {
  let download = (data.speeds.download * 100).toFixed(2)
  let upload = (data.speeds.upload * 100).toFixed(2)
  let ping = data.server.ping

  console.log('\nFinal results:')
  console.log('Download speed: ' + download + ' kB/s')
  console.log('Upload speed: ' + upload + ' kB/s')
  console.log('Latency: ' + ping + ' ms')
})

st.on('downloadspeedprogress', speed => {
  console.log('Download: ' + (speed * 100).toFixed(2) + ' kB/s')
})
st.on('uploadspeedprogress', speed => {
  console.log('Upload: ' + (speed * 100).toFixed(2) + ' kB/s')
})

st.on('error', err => {
  if (err.code === 'ENOTFOUND')
    console.error('Unable to connect to the server. Please, check your internet connection.')
})
