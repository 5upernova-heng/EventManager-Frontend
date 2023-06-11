import React, { useEffect, useState, useContext, useRef } from "react";
import NodeLayer from "./NodeLayer";
import { MapContext } from "../../context/MapContextProvider";
import "/src/styles/LiveMap.css";

function LiveMap({}) {
    const {
        map,
        routes,
        showRoutes,
        nodes,
        showAllTips,
        setShowAllTips,
        initNodes,
        allNodes,
    } = useContext(MapContext);
    const { name, imgWidth, imgHeight, src, fixedX, fixedY, scaleRange } = map;

    const [canvasKey, setKey] = useState(0);
    const [scale, setScale] = useState(1);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [lastTranslate, setLastTranslate] = useState({ x: 0, y: 0 });
    const [scaleMin, scaleMax] = [...scaleRange];

    const imageDivRef = useRef();
    const canvasRef = useRef();
    const imageRef = useRef();

    useEffect(() => {
        imageDivRef.current.addEventListener("wheel", preventDefaultBehave);
        initNodes();
    }, []);

    useEffect(() => {
        clear();
        if (showRoutes) {
            console.log(routes);
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            routes.map((route) => {
                const { x: x1, y: y1 } = allNodes[route[0]];
                const { x: x2, y: y2 } = allNodes[route[1]];
                if (route[2] === "0") {
                    drawLine(context, x1, y1, x2, y2, 5, "black");
                } else {
                    drawLine(context, x1, y1, x2, y2, 5, "blue");
                }
            });
        }
    }, [showRoutes, routes]);

    const clear = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawLine = (context, x1, y1, x2, y2, lineWidth, color) => {
        x1 = fixedX(x1);
        x2 = fixedX(x2);
        y1 = fixedY(y1);
        y2 = fixedY(y2);
        context.beginPath();
        context.strokeStyle = color;
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

    const toggleTipsShow = () => {
        setShowAllTips(!showAllTips);
    };

    return (
        <div
            draggable
            className="drag-map"
            ref={imageDivRef}
            onWheel={onWheel}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="d-flex float-button-group gap-2 m-2">
                <button
                    onClick={reset}
                    type="button"
                    className="btn btn-lg btn-light"
                >
                    <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                </button>
                <button
                    onClick={toggleTipsShow}
                    type="button"
                    className={`btn btn-lg btn-light ${
                        showAllTips ? "active" : ""
                    }`}
                >
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                </button>
            </div>
            <h1 className="map-label m-2">{name}</h1>
            <div
                style={{
                    transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                }}
            >
                <img
                    ref={imageRef}
                    src={src}
                    width={`${imgWidth}px`}
                    height={`${imgHeight}px`}
                    style={{
                        position: "relative",
                    }}
                    alt="Map"
                ></img>
                <canvas
                    key={canvasKey}
                    className="map-canvas shadow"
                    width={`${imgWidth}px`}
                    height={`${imgHeight}px`}
                    ref={canvasRef}
                ></canvas>
                <NodeLayer
                    nodes={nodes}
                    scale={scale}
                    fixedX={fixedX}
                    fixedY={fixedY}
                />
            </div>
        </div>
    );
}

export default LiveMap;
