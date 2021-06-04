var videoPlayer = document.querySelector('#player')
var canvasElement = document.querySelector('#canvas')
var captureButton = document.querySelector('#capture-btn')

function initMedia() {
    if( !('mediaDevices' in naviator) ) {
        navigator.mediaDevices = {}
    }

    if(!('getUserMedia' in navigator.mediaDevices)) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if(!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented'))
            }

            return new Promise((resolve, reject) => {
                getUserMedia.call(navigator, constraints, resolve, reject)
            })
        }
    }

    navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
            videoPlayer.srcObject = stream
            videoPlayer.style.display = 'block'
        })
        .catch(err => {
            console.log("Error!")
        })
}

(initMedia())()