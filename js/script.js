window.onhashchange = function() {
    console.log('hashChange')
    document.getElementById("left").classList.remove('load')
    document.getElementById("left").classList.add('unload')
    document.getElementById("right").classList.remove('load')
    document.getElementById("right").classList.add('unload')
    setTimeout(function () {
        openPage()
    }, 400)
}

window.onload = function () {
    console.log('load')
    openPage()
}

function openPage () {
    var route = window.location.hash.slice(2, window.location.hash.length)
    if (route === '') route = 'root'
    if (typeof routes[route] === 'object') {
        console.log('root')

        var container = document.getElementById("container")

        var myInit = { method: 'GET',
            headers: {},
            mode: 'cors',
            cache: 'default' }

        var reader = new FileReader()

        fetch('routes/' + route + '/' + route + '.html', myInit).then(function(response) {
            return response.blob()
        }).then(function(myBlob) {
            reader.readAsText(myBlob)
        })

        reader.onload = function() {
            container.innerHTML = reader.result
            setTimeout( function () {
                document.getElementById("left").classList.add('load')
                document.getElementById("right").classList.add('load')
            }, 400 )
            routes[route].script()

            console.log('exeucted')
        }

    }
}


var routes
routes = {
    root: {
        script: function () {
            fetchImage("graphic.png", document.getElementById("graphic"))
        }
    },
    resume: {
        script: function () {
          document.getElementById("educationLink").addEventListener("click", function () {
            document.getElementById("educationLinkTarget").scrollIntoView(true)
          })
          document.getElementById("employmentLink").addEventListener("click", function () {
            document.getElementById("employmentLinkTarget").scrollIntoView(true)
          })
          document.getElementById("hobbiesLink").addEventListener("click", function () {
            document.getElementById("hobbiesLinkTarget").scrollIntoView(true)
          })
          document.getElementById("serviceLink").addEventListener("click", function () {
            document.getElementById("serviceLinkTarget").scrollIntoView(true)
          })

        }
    },
  projects: {
      script: function () {

      }
  }
}


var fetchOptions = { method: 'GET',
  headers: {},
  mode: 'cors',
  cache: 'default' }

function fetchImage(image, object) {
  fetch(image, fetchOptions).then(function(response) {
    return response.blob()
  }).then(function(myBlob) {
    var objectURL = URL.createObjectURL(myBlob)
    object.src = objectURL
  })
}