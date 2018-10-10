<template>
  <ul class="inner-ul">
    <li is="li-item" v-for="elem in elems" v-bind:elem="elem" 
        v-on:handleToLoad="handleToLoad"></li>
  </ul>   
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Vue from 'vue';

export default {
  props: ['elems'],
  components: {
    liItem: () => import('@/components/LiItem.vue')
  },
  computed: mapState([
    'nodes'
  ]),
  methods: {
    ...mapActions([
      'getChild',
    ]),
    ...mapMutations({
      deleteChild: 'HIDDEN_CHILD_SUCCESS' 
    }),
    handleToLoad: function(elem) {
      if (elem.count_child > 0) {

        if(!elem.id) return;
       // this.handleOpenInfo(id);
        let tmpNodes = this.nodes.slice();
        let target = this.targetElem(tmpNodes, elem.id);

        if (target) {
          Vue.delete( target, 'children' );// delete target.children;
          this.deleteChild(this.nodes);
        } else 
          this.getChild(elem.id);

      }else this.say('war');// this.handleOpenInfo(id);
    },
    targetElem: function(menuNodes, id) { 
      for (let elem of menuNodes) {
        if ((elem.id === id) && (elem.children && elem.children.length > 0)) {
          return elem;    
        }
        if (elem.children && elem.children.length > 0) {
          let tmp = this.targetElem(elem.children, id);
          if(tmp)
            return tmp;
        }     
      }
    }

  }
}
</script>

<style scoped lang="less">
.inner-ul {
  overflow: auto;
  padding: 10px 10px 0px 20px;
}
</style>