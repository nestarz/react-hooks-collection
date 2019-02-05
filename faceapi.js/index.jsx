import * as faceapi from 'face-api.js';
import { useEffect, useState } from 'react';
import { useInterval } from 'hooks/useInterval';

async function fetchFaces(input) {
  console.log("detecting faces...");
  return await faceapi
    .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions()
  //.withFaceLandmarks();
}

async function loadModel(models) {
  return Promise.all(models.map((model, i) => {
    model.netLoader(model.path)
  }))
}

export const useFaceApiDetection = (faceApiConfig) => {
  const [isActive, setIsActive] = useState(false)
  const [modelReady, setModelReady] = useState(false);
  const [results, setResults] = useState(null);
  const [bboxCenter, setBboxCenter] = useState({
    x: null,
    y: null,
    z: null
  });
  const [bestFaceExpression, setBestFaceExpression] = useState({
    name: null,
    score: null
  });

  useInterval(async () => {
    if (!(modelReady && faceApiConfig.input && isActive)) {
      console.log("not ok")
      return
    }
    await fetchFaces(faceApiConfig.input)
      .then(results => setResults(results))
      .catch(err => console.log("error", err))
  }, faceApiConfig.interval)

  useEffect(() => {
    setIsActive(true)
    loadModel(faceApiConfig.models)
      .then(w => setModelReady(true))
    return function cleanup() {
      setIsActive(false)
    }
  }, []);

  useEffect(() => {
    if (results && results.detection) {
      setBboxCenter({
        x: (results.detection.relativeBox.x + results.detection.relativeBox.width) / 2,
        y: (results.detection.relativeBox.y + results.detection.relativeBox.height) / 2,
        z: 0
      })
    }
    if (results && results.expressions) {
      setBestFaceExpression(findBestExpression(results.expressions))
    }
  }, [results])

  return { bboxCenter, bestFaceExpression };
}

function clearCanvas(canvas) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  var w = canvas.width;
  canvas.width = 1;
  canvas.width = w;
}

export const useFaceApiOverlay = (results, canvasRef) => {
  useEffect(() => {
    if (results && results.detection && canvasRef.current) {
      const canvas = canvasRef.current;
      clearCanvas(canvas)
      const detectionsForSize = faceapi.resizeResults(results.detection, { width: canvas.width, height: canvas.height })
      faceapi.drawDetection(canvas, detectionsForSize, { withScore: true })
    }
  }, [results, canvasRef.current])
}


const findBestExpression = (expressions) => {
  if (typeof expressions == "undefined" ||
    expressions == null ||
    expressions.length == 0) {
    return null
  }
  const getBestExpression = (obj) => obj.reduce((obj1, obj2) => {
    return obj1.probability > obj2.probability ? obj1 : obj2
  })

  return getBestExpression(expressions)
}
