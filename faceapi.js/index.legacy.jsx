import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

async function fetchFaces(input) {
    //console.log("detecting faces...");
    return await faceapi
        .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions()
    //.withFaceLandmarks();
}

async function loadModel(model) {
    //console.log("loading model...")
    return Promise.all([
        faceapi.loadTinyFaceDetectorModel('/assets/faceapi/models'),
        faceapi.loadFaceExpressionModel('/assets/faceapi/models')
    ].map((p) => p.catch(err => ({ error: err })))
    )
}

export const useFaceApiDetection = (interval) => {
    const [modelReady, setModelReady] = useState(false);
    const [inputRef, setFaceApiInput] = useState(null);
    const [results, setResults] = useState(null);
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
                    .then(results => setResults(results))
                    .catch(err => console.log("error", err))
            }, interval);
            setIntervalId(id);
            return () => clearInterval(intervalId);
        }
    }, [inputRef, modelReady]);
    useEffect(() => {
        if (results && results.detection) {
            results.detection.lookAt = {
                x: (results.detection.relativeBox.x + results.detection.relativeBox.width) / 2,
                y: (results.detection.relativeBox.y + results.detection.relativeBox.height) / 2,
                z: 0
            }
        }
    }, [results])
    return [results, setFaceApiInput];
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
