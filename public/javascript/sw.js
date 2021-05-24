
self.addEventListener('install', (event) => {
    console.log("SW Installed")
    event.waitUntil(
        caches.open('static')
        .then((cache) => {

            cache.addAll([
                '/',
                '../views/main.ejs',
                '/main.js',
                './css/main.css',
                './alarm.mp3',
                'https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.css',
                './icons/menu.svg',
                './icons/cross.svg',
                './icons/cam.svg'
            ])
        })
    )
})

self.addEventListener('activate', () => {
    console.log("SW Activated")
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then((res) => {
                if(res){
                    return res
                } else {
                    return fetch(event.request)
                }
            })
    )
})