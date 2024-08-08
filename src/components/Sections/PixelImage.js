import React, { useState, useEffect, Suspense } from 'react';
import Image from '../../../static/undith.jpg'

const ReactP5Wrapper = React.lazy(() => import('react-p5-wrapper').then(module => ({ default: module.ReactP5Wrapper })));

function sketch(p5, props) {

    let img;
    let imgAddress;
    let initHover = false;
    let stage = 0;
    let startMil;
    let canvasWidth, canvasHeight;
    let timeSince = 0;
    let ease = 0;

    p5.updateWithProps = props => {
        if (props.img) {
            imgAddress = props.img;
            console.log("In updateWithProps: " + imgAddress);
            img = p5.loadImage(imgAddress);
        }
        // console.log("In updateWithProps");
    };

    p5.setup = () => {
        if (typeof window !== 'undefined') {
            // canvasWidth = window.innerWidth - 15;
            // canvasHeight = window.innerHeight - 100;
            canvasWidth = 500; // Example default width
            canvasHeight = 400; // Example default height
        } else {
            // Define default sizes or use a responsive approach
            canvasWidth = 800; // Example default width
            canvasHeight = 600; // Example default height
        }

        p5.createCanvas(canvasWidth, canvasHeight);

        // Old image loading
        // img = p5.loadImage(Image);
        // img = p5.loadImage(imgAddress);
        // img = p5.loadImage('./undith.jpg');
    };

    p5.draw = () => {
        p5.background(50);
        img.resize(0, canvasHeight);

        p5.image(img, 0, 0);
        
        let totalDuration = 700;
        let pxSize;
        
        if (initHover) {
            if (timeSince <= totalDuration){
                timeSince = p5.millis()-startMil;
                let timeScale = timeSince/totalDuration;
            
                ease = 1 - p5.pow(1. - timeScale, 3);
                // console.log("Ease:" + ease);
                // console.log("Time since:" + timeSince);
            }
        }

        if (ease < .1){
            pxSize = 20;
        } else if (ease >= .1 && ease < .5){
            pxSize = 10;
        } else if (ease >= .5 && ease < .8){
            pxSize = 4;
        } else if (ease >= .8 && ease < .9) {
            pxSize = 2;
        }

        if (ease < .9){
            pixelateAverage(pxSize);
        }

        if (mouseIn()){
            if (initHover == false){
                initHover = true;
                startMil = p5.millis();
            }
        }
    };

    function pixelateAverage(pxSize) {
        p5.loadPixels();
        p5.noStroke();
        let d = p5.pixelDensity();
        // console.log(d);

        for (let x = pxSize/2; x < canvasWidth; x+=pxSize) {
            for (let y = pxSize/2; y < canvasHeight; y+=pxSize) {
                const i = 4 * d * (y * d * canvasWidth + x);
                const [r, g, b] = [p5.pixels[i], p5.pixels[i + 1], p5.pixels[i + 2]]; // get colors
                p5.fill(r, g, b);
                p5.rect(x-pxSize/2, y-pxSize/2, pxSize, pxSize);
            }
        }  
      }

    function mouseIn(){
        if (p5.mouseX > 0 && p5.mouseX <= p5.width && p5.mouseY > 0 && p5.mouseY <= p5.height){
            return true;
        }
        return false;
    }
}

export function PixImg(props) {
    const [isSSR, setIsSSR] = useState(false);

    useEffect(() => {
        setIsSSR(typeof window !== 'undefined');
    }, []);

    return (
        <>
            {isSSR && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <ReactP5Wrapper sketch={sketch} img={props.img}/>
                    </Suspense>
            )}
        </>
    );
}