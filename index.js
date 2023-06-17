console.log('Iniciando...')
let { spawn } = require('child_process')
let path = require('path')
let fs = require('fs')
let package = require('./package.json')
const CFonts  = require('cfonts')
CFonts.say('ALEMAN_BOT\nALEMAN\nALEMAN_BOT', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
})
CFonts.say(`EL MEJOR BOT DE WHATSAPP 2022 LA MEJOR CALIDAD Y SERVICIO DE WHATSAPP ALEMAN_BOT
|< ================================================== >|
[•]-SERVIDOR : PRIVADO
[•]-BOT VERSION : 10.8.9
[•]-ESTADO : ACTIVO
[•]-Owner : ALEMAN
[•]-GRACIAS POR USAR LE BOT DE ALEMAN 
[•]-CERRADO EL BOT ALEMAN
|< ================================================== >|`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [path.join(__dirname, file), ...process.argv.slice(2)]
  CFonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  })
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', code => {
    isRunning = false
    console.error('Ocurrio un error inesperado:', code)
    if (code === 0) return
    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0])
      start(file)
    })
  })
  // console.log(p)
}

start('main.js')
