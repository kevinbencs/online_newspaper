import { Dispatch, RefObject, SetStateAction } from "react";

export const visualize = (props: { analyserNode: AnalyserNode, setAnimationId: Dispatch<SetStateAction<number | null>>, canvasRef: RefObject<HTMLCanvasElement | null> }) => {

    if (!props.canvasRef.current) return;

    const canvas = props.canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    const bufferLength = props.analyserNode.frequencyBinCount; // Frekvencia spektrum hossza
    const dataArray = new Uint8Array(bufferLength); // Az adatok ebben tárolódnak


    const draw = () => {
        props.analyserNode.getByteFrequencyData(dataArray); // A frekvencia adatok lekérdezése

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height); // Canvas törlése
        canvasCtx.fillStyle = 'rgba(0,0,0,0)'; // Háttér színe
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5; // Minden oszlop szélessége
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2; // A hangerősséghez arányosítjuk

            // Színek
            const red = (barHeight / 4) % 255;
            const green = 80;
            const blue = (barHeight + 100) % 255;

            canvasCtx.fillStyle = `rgb(${red},${green},${blue})`;
            canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1; // Következő oszlop pozíciója

        }

        props.setAnimationId(requestAnimationFrame(draw)); // A következő frame kirajzolása
    };

    draw();
};