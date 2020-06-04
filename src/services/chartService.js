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
      store.dispatch({type: 'GET_EDIT_COUNT_CHART__REJECTED', payload: err})
    }
  },
}
