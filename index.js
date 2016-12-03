#!/usr/bin/env node

const meow = require('meow')
const speedTest = require('speedtest-net')

// silly usage for tests
const cli = new meow([
  'Usage',
  'Just type anything...',
  '...and then you can make history...',
  '...with us!'
])

let st = speedTest({ maxTime: 20000 })

st.on('data', data => {
  console.dir(data)
})
st.on('error', err => {
  console.error(err)
})
