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
import * as faceapi from 'face-api.js';

const modelPath = "/assets/faceapi/models";
const Demo = () => {
  const videoRef = useRef();
  const [model, setModel] = useState(faceapi.SsdMobilenetv1);
  const [detections, setFaceApiInput] = useFaceApiDetection(videoRef, model, modelPath);
  return (
    <div>
      <video width={"640"} height={"360"} ref={videoRef} controls autoplay>
        <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"  />
        <source src="http://clips.vorwaerts-gmbh.de/VfE.webm"      type="video/webm" />
        <source src="http://clips.vorwaerts-gmbh.de/VfE.ogv"       type="video/ogg"  />
      </video>
      <div>X: {detections ? detections.box.x : 0}</div>
      <div>Y: {detections ? detections.box.y : 0}</div>
    </div>
  );
};
```


### `useFaceApiOverlay`

React state hook drawing bounding boxes on a provided canvas and using faceapi.js detections.


#### Usage

```jsx
import { useRef } from 'react';
import { useFaceApiDetection, useFaceApiOverlay } from './react-hooks-collection/face-api.js';
import * as faceapi from 'face-api.js';

const modelPath = "/assets/faceapi/models";
const Demo = () => {
  const videoRef = useRef();
  const [model, setModel] = useState(faceapi.SsdMobilenetv1);
  const [detections, setFaceApiInput] = useFaceApiDetection(videoRef, model, modelPath);
  const canvasRef = useRef()
  useFaceApiOverlay(detections, canvasRef);
  return (
    <div>
      <video width={"640"} height={"360"} ref={videoRef} controls autoplay>
        <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"  />
        <source src="http://clips.vorwaerts-gmbh.de/VfE.webm"      type="video/webm" />
        <source src="http://clips.vorwaerts-gmbh.de/VfE.ogv"       type="video/ogg"  />
      </video>
      <div>X: {detections ? detections.box.x : 0}</div>
      <div>Y: {detections ? detections.box.y : 0}</div>
      <canvas width={"640"} height={"360"} ref={canvasRef} />
    </div>
  );
};
```
