# react-hooks-collection
Personal collection of react hooks

## faceapi.js hooks
Provide bindings with faceapi.js repository.

### `useFaceApiDetection`

React state hook that load model and provide detections according to an input source (video, image, ...anything faceapi.js accept).


#### Usage

```jsx
import { useRef } from 'react';
import { useFaceApiDetection } from './react-hooks-collection/face-api.js';

const Demo = () => {
  const videoRef = useRef();
  const [detections, setFaceApiInput] = useFaceApiDetection(videoRef);

  return (
    <div>
      <video width={"640"} height={"360"} ref={videoRef} controls autoplay>
        <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"  /><!-- Safari / iOS, IE9 -->
        <source src="http://clips.vorwaerts-gmbh.de/VfE.webm"      type="video/webm" /><!-- Chrome10+, Ffx4+, Opera10.6+ -->
        <source src="http://clips.vorwaerts-gmbh.de/VfE.ogv"       type="video/ogg"  /><!-- Firefox3.6+ / Opera 10.5+ -->
      </video>
    </div>
  );
};
```
