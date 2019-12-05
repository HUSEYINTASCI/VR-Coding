# VR Chat in A-Frame

The VR Chat is a demonstration of the [`sharedspace`](https://github.com/delapuente/aframe-sharedspace-component) component to enable multiuser experiences in A-Frame.

[Open the chat](https://vr-chat.glitch.me/), grant permissions to the site to use your microphone and share the link (or open it in another browser [with WebRTC support](https://caniuse.com/#feat=rtcpeerconnection)). Wait for your friends to start chatting.

## Source guide

This section provides a walk-through of the sources, explaining the purpose of each relevant piece of code.

### The HTML

Starting in the `<head>` tag, these two lines adds A-Frame and register the `sharedspace` component:

```html
<script src="https://aframe.io/releases/0.7.0/aframe.min.js"></script>
<script src="https://unpkg.com/aframe-sharedspace-component@1.0.0/dist/aframe-sharedspace-component.min.js"></script>
```

Inside the `<body>` tag, the A-Frame scene setup includes an entity which represents the room with the `sharedspace` and `participants` components. The first deals with the network stuff whereas the second manages the avatars of the participants. Find more about these components [by reading the docs](https://github.com/delapuente/aframe-sharedspace-component/tree/master/dist#component-overview).

Setting `audio` to `true` enables local-audio sharing. Setting `hold` to `true` instructs the component to not connect yet, since first we want to generate a random name for the room.

The entities inside the room creates a basic environment with a blue table in the middle.

```html
<a-scene embedded>
  <a-entity sharedspace="audio: true; hold: true" participants>

    <!-- Room -->
    <a-sky color="#333"></a-sky>
    <a-plane rotation="-90 0 0" width="15" height="15" color="#777"></a-plane>

    <!-- Table -->
    <a-cylinder class="table"
                position="0 0.8 0"
                height="0.02" color="#8ae0f4"
                segments-height="1" segments-radial="6">
    </a-cylinder>

  </a-entity>
</a-scene>
```

By default, the `participants` component will look for a `template` tag in the HTML and use its content as the avatar representation. The avatar uses a model from [Sketchfab](https://sketchfab.com) nested in an empty entity.


```html
<template>
  <a-entity>
    <a-entity position="0 -0.1 0.15" rotation="0 180 0" scale="0.01 0.01 0.01"
              obj-model="obj: url(https://cdn.glitch.com/4e53a88a-96d2-46e5-ab4b-f8f1b9c2d486%2Fface.obj?1506059732633)"  >
    </a-entity>
  </a-entity>
</template>
```

Nesting is needed to correct the location and orientation regarding the camera. Try remixing the project and removing the nesting. Remove also the `position` and `rotation` components. Leave the `scale` untouched since the original model is huge for the scene.

### The JavaScript

The first piece of JavaScript retreives important elements of the scene:

```js
var scene = document.querySelector('a-scene');
var room = document.querySelector('[sharedspace]');
var table = document.querySelector('.table');
```

The second part will fix the orientation of the participants after joining. The `participants` component will take care of positioning the participants automatically around a central point but it does not deal with orientation.

The `participantadded` event is triggered when a new avatar is added to the room and contains a reference to the avatar element.

```js
room.addEventListener('participantadded', function onAdded(evt) {
  var participant = evt.detail.participant;
  if (!participant.hasLoaded) {
    participant.addEventListener('loaded', onAdded.bind(null, evt));
    return;
  }
    
  var tablePosition = table.getAttribute('position');
  var participantY = participant.getAttribute('position').y;
  participant.object3D.lookAt(new THREE.Vector3(
    tablePosition.x, participantY, tablePosition.z
  ));

  var radToDeg = THREE.Math.radToDeg;
  var rotation = participant.object3D.rotation;
  rotation.y += Math.PI;

  participant.setAttribute('rotation', {
    x: radToDeg(rotation.x),
    y: radToDeg(rotation.y),
    z: radToDeg(rotation.z)
  });    

});
```

Finally, the following code will join the room specified in the URL or will generate a new one. The last line will set the room name and let the `sharedspace` component to connect by setting the `hold` property to `false`.

```js
let roomName = window.location.search.substr(1);
if (!roomName) {
  roomName = 'room-' + Date.now();
  history.pushState({}, '', window.location + `?${roomName}`);
}
connect();

function connect() {
  if (!scene.hasLoaded) {
    scene.addEventListener('loaded', connect);
    return;
  }
  room.setAttribute('sharedspace', { room: roomName, hold: false });
}
```

## Credits

[Anime Face Model Stocking](https://sketchfab.com/models/d049b6a85d204057b170ef9dbc851200) by [stocking](https://sketchfab.com/stocking) is licensed under [CC Attribution](http://creativecommons.org/licenses/by/4.0/)