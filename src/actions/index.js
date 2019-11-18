
  
  import {
    GET_CHART_DATA_FROM_VISUALIZATION
  } from './ActionTypes';

  export function getChartDataFromVisualization(path) {
    return {
      type: GET_CHART_DATA_FROM_VISUALIZATION,
      request: {
        op: 'get',
        path,
      },
    };
  }
