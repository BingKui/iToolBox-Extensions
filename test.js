const ChildProcess = require('child_process')
const os = require('os');


function openDesktop(url = '') {
    const env = {
        ...process.env
    }
    // NB: We're gonna launch Desktop and we definitely don't want to carry over
    // `ELECTRON_RUN_AS_NODE`. This seems to only happen on Windows.
    delete env['ELECTRON_RUN_AS_NODE']

    // url = 'x-github-client://' + url

    if (os.platform() === 'darwin') {
        return ChildProcess.spawn('open', [url], {
            env
        })
    } else if (os.platform() === 'win32') {
        return ChildProcess.spawn('cmd', ['/c', 'start', url], {
            env
        })
    } else {
        throw new Error(
            `Desktop command line interface not currently supported on platform ${process.platform}`
        )
    }
}
openDesktop('/Applications/iTools.app');