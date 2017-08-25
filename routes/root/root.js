setTimeout( function () {
    document.getElementById("left").classList.add('load')
    document.getElementById("right").classList.add('load')
}, 1000 )

console.log('exeucted')

var myImage = document.getElementById("graphic")

var myInit = { method: 'GET',
    headers: {},
    mode: 'cors',
    cache: 'default' }


fetch('graphic.png', myInit).then(function(response) {
    return response.blob()
}).then(function(myBlob) {
    var objectURL = URL.createObjectURL(myBlob)
    myImage.src = objectURL
})