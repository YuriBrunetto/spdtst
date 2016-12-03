#!/usr/bin/env node

const meow = require('meow')
const speedTest = require('speedtest-net')
const updateNotifier = require('update-notifier')

// silly usage for tests
const cli = new meow([
  'Usage',
  'Just type anything...',
  '...and then you can make history...',
  '...with us!'
])

// check for updates
updateNotifier({ pkg: cli.pkg }).notify()

let st = speedTest({ maxTime: 20000 })

st.on('data', data => {
  console.dir(data)
})
st.on('error', err => {
  console.error(err)
})
