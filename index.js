#!/usr/bin/env node

'use strict'

const meow = require('meow')
const chalk = require('chalk')
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

  let msg = chalk.magenta('\n-- Final results --\n')
  msg += chalk.blue(`Download speed: ${download} kB/s\n`)
  msg += chalk.blue(`Upload speed: ${upload} kB/s\n`)
  msg += chalk.blue(`Latency: ${ping}ms`)

  console.log(msg)
})

st.on('downloadspeedprogress', speed => {
  let msg = chalk.green(`Download: ${(speed * 125).toFixed(2)} kB/s`)
  console.log(msg)
})
st.on('uploadspeedprogress', speed => {
  let msg = chalk.yellow(`Upload: ${(speed * 125).toFixed(2)} kB/s`)
  console.log(msg)
})

st.on('error', err => {
  if (err.code === 'ENOTFOUND')
    console.error(chalk.bgRed.white('Unable to connect to the server. Please, check your internet connection.'))
})
