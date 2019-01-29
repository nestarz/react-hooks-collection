import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

async function fetchFaces(input) {
    //console.log("detecting faces...");
    return await faceapi
    .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
    //.withFaceLandmarks();
}

async function loadModel() {
    //console.log("loading model...")
    return await faceapi.loadTinyFaceDetectorModel('/assets/faceapi/models');
}

export const useFaceApiDetection = (interval) => {
    const [modelReady, setModelReady] = useState(false);
    const [inputRef, setFaceApiInput] = useState(null); 
    const [detections, setDetections] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    useEffect(() => {
        loadModel().then(w => setModelReady(true))
    }, []);
    useEffect(() => {
        console.log("inputRef", inputRef)
        if (inputRef && modelReady) {
            clearInterval(intervalId);
            const id = setInterval(async () => {
                await fetchFaces(inputRef)
                    .then(detections => setDetections(detections))
                    .catch(err => console.log("error", err))
            }, interval);
            setIntervalId(id);
            return () => clearInterval(intervalId);
        }
    }, [inputRef, modelReady]);
    useEffect(() => {
        if (detections) {
            detections.lookAt = {
                x: (detections.relativeBox.x + detections.relativeBox.width) / 2,
                y: (detections.relativeBox.y + detections.relativeBox.height) / 2,
                z: 0}
        }
    }, [detections])
    return [detections, setFaceApiInput];
}

function clearCanvas(canvas) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
  }

export const useFaceApiOverlay = (detections, canvasRef) => {
    useEffect(() => {
        if (detections && canvasRef.current) {
            const canvas = canvasRef.current;
            clearCanvas(canvas)
            const detectionsForSize = faceapi.resizeResults(detections, { width: canvas.width, height: canvas.height })
            faceapi.drawDetection(canvas, detectionsForSize, { withScore: true })
        }
    }, [detections, canvasRef.current])
}
