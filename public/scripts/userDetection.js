var link = location.href;


if(link.indexOf('?deviceId=') != -1) {
    console.log(location);
    var ac = new Accelerometer();

} else {
    var linkArea = document.getElementById('connection-link');
    socket.on('id', id => {
        linkArea.innerHTML = link + '?deviceId=#' + id;
    });
}

let deltaNode = document.getElementById('delta');

socket.on('orientationChanged', data => {
    console.log(data);
    deltaNode.innerHTML = data;
});