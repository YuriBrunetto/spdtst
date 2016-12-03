#!/usr/bin/env node

const meow = require('meow')
const speedTest = require('speedtest-net')
const updateNotifier = require('update-notifier')

// silly usage for tests
const cli = new meow([
  'Usage'
])

// check for updates
updateNotifier({ pkg: cli.pkg }).notify()

let st = speedTest({ maxTime: 15000 })

st.on('data', data => {
  let download = data.speeds.download
  let upload = data.speeds.upload

  console.log('Download speed: ' + download + 'kB/s')
  console.log('Upload speed: ' + upload + 'kB/s')

  console.log({data})
})

st.on('downloadprogress', progress => {
  console.log('Download progress -> ' + progress + '%')
})

st.on('uploadprogress', progress => {
  console.log('Upload progress -> ' + progress + '%')
})

st.on('error', err => {
  console.error(err)
})
