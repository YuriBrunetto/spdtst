#!/usr/bin/env node

const meow = require('meow')
const speedTest = require('speedtest-net')

const cli = new meow([
  'Usage',
  'Just type anything...',
  '...and then you can make history...',
  '...whit us!'
])

let st = speedTest({ maxTime: 20000 })

st.on('data', data => {
  console.dir(data)
})
st.on('error', err => {
  console.error(err)
})
