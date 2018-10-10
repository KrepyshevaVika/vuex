import Vue from 'vue';
import Vuex from 'vuex';
import { getTopNodes, getNodeChildren, getNodeById } from './services/service';
import { updateState } from './handleUpdateState/recursions';

const GET_SUCCESS = 'GET_SUCCESS';
const SHOW_CHILD_SUCCESS = 'SHOW_CHILD_SUCCESS';
const HIDDEN_CHILD_SUCCESS = 'HIDDEN_CHILD_SUCCESS';
const GET_BY_ID_SUCCESS = 'GET_BY_ID_SUCCESS';
const MESSAGE_ERROR = 'MESSAGE_ERROR';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodes: [],
    infoAboutNode: {},
    messageError: ""
  },
  mutations: {
    [GET_SUCCESS] (state, nodes) {
      state.nodes = nodes;
    },
    [MESSAGE_ERROR] (state, msgError) {
      state.messageError = msgError;
    },
    [SHOW_CHILD_SUCCESS] (state, payload) {
      let oldNodes = state.nodes.slice();
      let mewState = updateState(oldNodes, payload.nodes, payload.targerId);
      state.nodes = [...mewState];
      //state.nodes.push({name: "ttt", children: [{name:"yyy"},{name:"iii"}]});
      state.messageError = "";
    },
    [HIDDEN_CHILD_SUCCESS] (state, nodes) {
      state.nodes = [...nodes];
      console.log(state.nodes);
    },
    [GET_BY_ID_SUCCESS] (state, node) {
      state.infoAboutNode = node;
    }
  },
  actions: {
    getTop({ commit }) {
      getTopNodes().then((data) => {
        commit('GET_SUCCESS', data);
      }).catch((error) => {
        commit('MESSAGE_ERROR', error);
      });
    },
    getChild({ commit }, id) {
      getNodeChildren(id).then((data) => {
        commit('SHOW_CHILD_SUCCESS', { nodes: data, targerId: id });
      }).catch((error) => {
        commit('MESSAGE_ERROR', error);
      });
    },
    getById({ commit }, id) {
      getNodeById(id).then((data) => {
        commit('GET_BY_ID_SUCCESS', data);
      }).catch((error) => {
        commit('MESSAGE_ERROR', error);
      });
    }
  }

})
