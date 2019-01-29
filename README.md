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
        <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"  />
        <source src="http://clips.vorwaerts-gmbh.de/VfE.webm"      type="video/webm" />
        <source src="http://clips.vorwaerts-gmbh.de/VfE.ogv"       type="video/ogg"  />
      </video>
    </div>
  );
};
```
