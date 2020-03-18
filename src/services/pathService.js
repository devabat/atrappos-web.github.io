import axios from 'axios';
import {setAllPaths} from "../actions/actions";
import store from "../store";

const prefix = process.env.NODE_ENV === 'production' && process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : "";
export default {
  async getAll() {
    try {
      const paths = await axios
          .get(prefix + `/api/paths`)
          .then(res => res.data);
          store.dispatch(setAllPaths(paths));
          return paths || [];
    } catch (e) {
      console.log(e);
    }
  },
  saveOne: async (path) => {
    let res = await axios.post(prefix + `/api/path`, path);
    return res.data || {};
  },
  editOne: async (path, id) => {
    let res = await axios.put(prefix + `/api/path`, path, {
      params: {
        id: id
      }
    });
    return res.data || {};
  },
  deleteOne: async (id) => {
    let res = await axios.delete(prefix + `/api/path`,{
      params: {
        id: id
      }
    });
    return res.data || {};
  },
  getOne: async (id) => {
    let res = await axios.get(prefix + `/api/path`, {
      params: {
        id: id
      }
    });
    return res.data || {};
  }
}
