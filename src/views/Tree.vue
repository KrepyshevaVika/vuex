<template>
  <div class="main-component">
    <div class="inner-main">
        <button type="button" class="btn btn-success" v-on:click="say('hi')">+</button>  

        <list v-bind:elems="nodes"></list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import liItem from '@/components/LiItem.vue';

export default {
  created: function () {
    this.getTop();
  },
  components: {
    list: () => import('@/components/List.vue')
  },
  computed: mapState([
    'nodes'
  ]),
  methods: {
    ...mapActions([
      'getTop',
    ]),
    say: function (message) {
      alert(message)
    },

  }
}
</script>

<style scoped lang="less">
.inner-main {
  width: 300px;
  outline: 2px solid  gray;
  padding: 10px;
}

li {
  list-style-type: none;
}

.li {
  cursor: pointer;
}

.item:focus { 
  outline: 2px dashed green; 
}

.line { 
  outline: 2px dashed green; 
}

.item{
  display: flex;
  align-items: center;
}

.item > div:first-child{
  padding-right: 10px;
  font-size: 15px;
}

.item > div:first-child{
  padding-right: 10px;
  font-size: 15px;
}

.item .icon{
  transition: transform .5s ease, color .5s ease;
  font-size: 40px;
}  

.item .icon.active{
  transform: rotate(90deg);
}  

.item .icon.disable{
  cursor: default;
  color: white;
}  

.item:hover .btnCanOpen{
  display: block;
}

.item .btn{
  display: none; 
  margin-right: 5px;
  border-radius: 5px !important;
} 

.hidden {
  display: none;
} 

.main-component {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.inner-ul {
  height:350px;
  overflow: auto;
  padding: 10px 10px 0px 20px;
}

.text {
  white-space: pre;
  margin-right: 10px;
}
</style>