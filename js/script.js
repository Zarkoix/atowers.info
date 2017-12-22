var currentRoute

var fetchOptions = {
  method: 'GET',
  headers: {},
  mode: 'cors',
  cache: 'default'
}

window.onhashchange = function() {
    console.log('hashChange')
    if (currentRoute && routes[currentRoute].resetData) {
      routes[currentRoute].resetData()
    }
    document.getElementById("left").classList.remove('load')
    document.getElementById("left").classList.add('unload')
    document.getElementById("right").classList.remove('load')
    document.getElementById("right").classList.add('unload')
    setTimeout(function () {
        openPage()
    }, 400)
}

window.onload = function () {
  if (!fetch) console.log('Browser does not support fetch, using fallback')
  openPage()
}

function openPage () {
    var route = window.location.hash.slice(2, window.location.hash.length)
    if (route === '') route = 'root'
    if (typeof routes[route] === 'object') {
      currentRoute = route
      var container = document.getElementById("container")

      fetch('routes/' + route + '/' + route + '.html', fetchOptions).then(function(response) {
          return response.text()
      }).then(function(text) {
        container.innerHTML = text
        setTimeout( function () {
          document.getElementById("left").classList.add('load')
          document.getElementById("right").classList.add('load')
        }, 400 )
        routes[route].script()
      })

    } else {
      window.location = ''
    }
}


var routes
routes = {
    root: {
        script: function () {
            fetchImage("/graphics/icon__dark.svg", document.getElementById("graphic"))
        }
    },
    resume: {
      script: function () {
        setTimeout(function () {
          // document.getElementById("left").style.transform = "translateX(50%)"
        }, 400)
      },
      callback: function (f, p) {
        switch (f) {
          case 'changeSection':
            if (!this.data.section) {
              document.getElementById("left").style.transform = "translateX(0)"
            }
            document.getElementById("right").style.transform = "translateX(100vw)"
            var oldSection = this.data.section
            this.data.section = p
            console.log("going from " + oldSection + " to " + p)
            setTimeout(function () {
              if (oldSection) {
                document.getElementById(oldSection + "__content").style.display = "none"
                document.getElementById(oldSection).classList.remove("active")
              }
              document.getElementById(p + "__content").style.display = "block"
              document.getElementById(p).classList.add("active")
              document.getElementById("right").style.transform = "translateX(0)"
            }, 400);
            console.log(this.data)
            break;
        }
      },
      data: {
        section: false
      },
      resetData: function () {
        this.data.section = false
      }
  },
  projects: {
      script: function () {
        scanThenFetchImages('.imgContainer > img')
      }
  }
}

function callback(r, f, p) {
  routes[r].callback(f, p)
}

function fetchImage(image, object) {
  if (fetch) {
    fetch(image, fetchOptions).then(function(response) {
      console.log('using fetch')
      return response.blob()
    }).then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob)
      object.src = objectURL
    })
  } else {
    console.log('not using fetch')
    object.setAttribute('src', image)
  }
}

function scanThenFetchImages (selector) {
  console.log('scanning for images with: ' + selector)
  document.body.querySelectorAll(selector).forEach(function (currentValue) {
    if (currentValue.getAttribute('img-src')) fetchImage(currentValue.getAttribute('img-src'), currentValue)
  })
}