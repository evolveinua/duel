var link = location.href;


if(link.indexOf('?deviceId=') != -1) {
    console.log(location);


} else {
    var linkArea = document.getElementById('connection-link');
    socket.on('id', id => {
        linkArea.innerHTML = link + '?deviceId=#' + id;
    });

    socket.io('orientationChanged', data => {
        console.log(data);
    });
}