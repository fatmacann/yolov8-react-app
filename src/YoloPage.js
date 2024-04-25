import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; 
import Loader from "./loader";
import ButtonHandler from "./btn-handler";
import { Table } from 'antd';
import { detect, detectVideo } from "./utils/detect";
import "./styles/yolopage.css";
import detectionData from './detect.json'; 
import MultipleColorChart from './MultipleColorChart'
import Donut from './Donut'
import Area from './Area'
const YoloPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const modelName = "yolov8n";
  const [detections, setDetections] = useState([]);

  const columns = [
    {
      title: 'Object',
      dataIndex: 'object_name',
      key: 'object_name',
      width: 100, 
    },
    {
      title: 'Detection Time',
      dataIndex: 'detection_time',
      key: 'detection_time',
      width: 200, 
    },
  ];


  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.origin}/yolov8n_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions });
          },});
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);
      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
          }); 

      tf.dispose([warmupResults, dummyInput]);
    });
  }, []);
  useEffect(() => {
    const transformedData = detectionData.map((item, index) => {
      const [objectName, detectionTime] = item.split(/ (.+)/);
      return {
        key: index,
        object_name: objectName,
        detection_time: detectionTime,
      };
    });
    setDetections(transformedData);
  }, []);


return (
  <div className="yolo-page-container">
    {loading.loading && (
      <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
    )}
    <div className="landing-container">
      <div className="header">
        <h1>SmartSightAI</h1>
      </div>

      <div className="content">
        <video
          autoPlay
          muted
          ref={cameraRef}
          onPlay={() =>
            detectVideo(
              cameraRef.current,
              model,
              canvasRef.current,
              selectedClass
            )
          }
        />
        <canvas
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
        />
      </div>
      <div>
      <ButtonHandler cameraRef={cameraRef}/>
      </div>
    </div>
    <div className="detections-table">
      <Table
      columns={columns}
      dataSource={detections}
      style={{ width: '100%', height: '50px' }}
    />
    </div>
    <div className="chart1-container">
      <Area />
    </div>
    <div className="chart2-container">
      <MultipleColorChart />
    </div>
    <div className="chart3-container">
      <Donut />
    </div>
  </div>
);
};


export default YoloPage;
