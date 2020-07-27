import axios from 'axios';
import store from "../store";

const prefix = process.env.NODE_ENV === 'production' && process.env.SERVER_URL ? process.env.SERVER_URL : "";
export default {
  async getDrawDurationChart() {
    try {
      store.dispatch({type: 'GET_DRAW_DURATION_CHART_PENDING'})
      const paths = await axios
          .get(prefix + `/api/paths/chart/draw/duration`)
          .then(res => res.data);
      store.dispatch({type: 'GET_DRAW_DURATION_CHART_FULFILLED'})
      return paths || [];
    } catch (err) {
      console.log(err);
      store.dispatch({type: 'GET_DRAW_DURATION_CHART__REJECTED', payload: err})
    }
  },
  async getEditCountChart() {
    try {
      store.dispatch({type: 'GET_EDIT_COUNT_CHART_PENDING'})
      const paths = await axios
          .get(prefix + `/api/paths/chart/edit/count`)
          .then(res => res.data);
      store.dispatch({type: 'GET_EDIT_COUNT_CHART_FULFILLED'})
      return paths || [];
    } catch (err) {
      console.log(err);
      store.dispatch({type: 'GET_EDIT_COUNT_CHART_REJECTED', payload: err})
    }
  },
  async getEditDurationChart() {
    try {
      store.dispatch({type: 'GET_EDIT_DURATION_CHART_PENDING'})
      const paths = await axios
          .get(prefix + `/api/paths/chart/edit/duration`)
          .then(res => res.data);
      store.dispatch({type: 'GET_EDIT_DURATION_CHART_FULFILLED'})
      return paths || [];
    } catch (err) {
      console.log(err);
      store.dispatch({type: 'GET_EDIT_DURATION_CHART_REJECTED', payload: err})
    }
  },
  async getEvaluationCountChart() {
    try {
      store.dispatch({type: 'GET_EVALUATION_COUNT_CHART_PENDING'})
      const paths = await axios
          .get(prefix + `/api/paths/chart/evaluation/count`)
          .then(res => res.data);
      store.dispatch({type: 'GET_EVALUATION_COUNT_CHART_FULFILLED'})
      return paths || [];
    } catch (err) {
      console.log(err);
      store.dispatch({type: 'GET_EVALUATION_COUNT_CHART_REJECTED', payload: err})
    }
  },
  async getEvaluationPerPathChart() {
    try {
      store.dispatch({type: 'GET_EVALUATION_PER_PATH_CHART_PENDING'})
      const paths = await axios
          .get(prefix + `/api/paths/chart/evaluation/per/path`)
          .then(res => res.data);
      store.dispatch({type: 'GET_EVALUATION_PER_PATH_CHART_FULFILLED'})
      return paths || [];
    } catch (err) {
      console.log(err);
      store.dispatch({type: 'GET_EVALUATION_PER_PATH_CHART_REJECTED', payload: err})
    }
  },
  async getDrawTypesCountPerUserChart() {
    try {
      store.dispatch({type: 'GET_DRAW_TYPES_COUNT_PER_USER_CHART_PENDING'})
      const paths = await axios
          .get(prefix + `/api/paths/chart/draw/types/count/per/user`)
          .then(res => res.data);
      store.dispatch({type: 'GET_DRAW_TYPES_COUNT_PER_USER_CHART_FULFILLED'})
      return paths || [];
    } catch (err) {
      console.log(err);
      store.dispatch({type: 'GET_DRAW_TYPES_COUNT_PER_USER_CHART_REJECTED', payload: err})
    }
  },
  async getDrawTypesTotalCountChart() {
    try {
      store.dispatch({type: 'GET_DRAW_TYPES_TOTAL_COUNT_CHART_PENDING'})
      const paths = await axios
          .get(prefix + `/api/paths/chart/draw/types/total/count`)
          .then(res => res.data);
      store.dispatch({type: 'GET_DRAW_TYPES_TOTAL_COUNT_CHART_FULFILLED'})
      return paths || [];
    } catch (err) {
      console.log(err);
      store.dispatch({type: 'GET_DRAW_TYPES_TOTAL_COUNT_CHART_REJECTED', payload: err})
    }
  },
  async getDrawTypesDistancePerUserChart() {
    try {
      store.dispatch({type: 'GET_DRAW_TYPES_DISTANCE_PER_USER_CHART_PENDING'})
      const paths = await axios
          .get(prefix + `/api/paths/chart/draw/types/distance/per/user`)
          .then(res => res.data);
      store.dispatch({type: 'GET_DRAW_TYPES_DISTANCE_PER_USER_CHART_FULFILLED'})
      return paths || [];
    } catch (err) {
      console.log(err);
      store.dispatch({type: 'GET_DRAW_TYPES_DISTANCE_PER_USER_CHART_REJECTED', payload: err})
    }
  },
  async getDrawTypesTotalDistanceChart() {
    try {
      store.dispatch({type: 'GET_DRAW_TYPES_TOTAL_DISTANCE_CHART_PENDING'})
      const paths = await axios
          .get(prefix + `/api/paths/chart/draw/types/total/distance`)
          .then(res => res.data);
      store.dispatch({type: 'GET_DRAW_TYPES_TOTAL_DISTANCE_CHART_FULFILLED'})
      return paths || [];
    } catch (err) {
      console.log(err);
      store.dispatch({type: 'GET_DRAW_TYPES_TOTAL_DISTANCE_CHART_REJECTED', payload: err})
    }
  },

}
