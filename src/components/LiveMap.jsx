import React, { useEffect } from "react";
import { useContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import MapLayer from "./map/MapLayer";
import { MapContext } from "../context/MapContextProvider";
import "/src/styles/LiveMap.css";

function LiveMap({ draw }) {
    const {
        imgWidth,
        imgHeight,
        routes,
        nodes,
        fixedX,
        fixedY,
        scale,
        setScale,
        scaleMin,
        scaleMax,
        startPoint,
        setStartPoint,
        translate,
        setTranslate,
        lastTranslate,
        setLastTranslate,
    } = useContext(MapContext);

    const imageDivRef = useRef();
    const canvasRef = useRef();
    const imageRef = useRef();

    useEffect(() => {
        imageDivRef.current.addEventListener("wheel", preventDefaultBehave);
    }, []);

    useEffect(() => {
        if (draw) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            routes.map((route) => {
                const { x: x1, y: y1 } = nodes[route[0]];
                const { x: x2, y: y2 } = nodes[route[1]];
                drawLine(context, x1, y1, x2, y2, 5);
            });
        }
    }, [draw, routes]);

    const drawCircle = (context, x, y, radius) => {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    };

    const drawLine = (context, x1, y1, x2, y2, lineWidth) => {
        x1 = fixedX(x1);
        x2 = fixedX(x2);
        y1 = fixedY(y1);
        y2 = fixedY(y2);
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = lineWidth;
        context.stroke();
    };

    const preventDefaultBehave = (event) => {
        event.preventDefault();
    };

    const onWheel = (event) => {
        let newScale = scale + event.deltaY * -0.001;
        newScale = Math.min(Math.max(scaleMin, newScale), scaleMax);
        setScale(newScale);
    };

    const onDragStart = (event) => {
        setStartPoint({ x: event.clientX, y: event.clientY });
    };

    const onDragOver = (event) => {
        event.preventDefault();
        const { x, y } = startPoint;
        const { x: transX, y: transY } = lastTranslate;
        const newTransX = (event.clientX - x) / scale + transX;
        const newTransY = (event.clientY - y) / scale + transY;
        setTranslate({ x: newTransX, y: newTransY });
    };

    const onDragEnd = () => {
        setLastTranslate(translate);
    };

    const reset = () => {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
        setLastTranslate({ x: 0, y: 0 });
    };

    return (
        <div>
            <button onClick={reset} className="btn btn-lg btn-light mt-1">
                <i className="fa fa-arrows-alt" aria-hidden="true"></i>
            </button>
            <div
                draggable
                className="border drag-map"
                ref={imageDivRef}
                onWheel={onWheel}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div
                    style={{
                        transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                    }}
                >
                    <img
                        ref={imageRef}
                        src="/src/assets/map.jpg"
                        style={{
                            width: "100%",
                            position: "relative",
                        }}
                        alt="Map"
                    ></img>
                    <canvas
                        className="map-canvas shadow"
                        width={`${imgWidth}px`}
                        height={`${imgHeight}px`}
                        ref={canvasRef}
                    ></canvas>
                    <MapLayer nodes={nodes} />
                </div>
            </div>
        </div>
    );
}

LiveMap.propTypes = {
    draw: PropTypes.bool,
    // route format: [{x, y}, {x, y}, ...]
};

export default LiveMap;
