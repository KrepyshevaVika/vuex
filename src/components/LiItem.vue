<template>
  <li v-on:click.stop="$emit('handleToLoad', elem)" class="li" >

    <div class="item">
      <font-awesome-icon icon="angle-right" v-if="(elem.count_child > 0)" class="icon"/>

      <div class="text">{{ elem.name }}</div>

      <div class="btn-group">
        <button type="button" 
                v-if="!elem.node_type.is_endpoint"
                class="btn btn-success btnCanOpen"
                >+
        </button>
        <button type="button" 
                class="btn btn-danger btnCanOpen"
                >&ndash;
        </button>
      </div>
    </div>

    <list v-if="(elem.children && elem.children.length > 0)" v-bind:elems="elem.children" ></list>

  </li>
</template>

<script>//v-bind:class="{'icon': (elem.count_child > 0)}"
export default {
  name: 'liItem',
  props: ['elem'],
  components: {
    list: () => import('@/components/List.vue')
  },
}
</script>

<style scoped lang="less">
.li {
  list-style-type: none;
  cursor: pointer;
}

.item:focus { 
  outline: 2px dashed green; 
}

.line { 
  outline: 2px dashed green; 
}

.text {
  white-space: pre;
  margin-right: 10px;
  padding-left: 10px;
}

.item{
  display: flex;
  align-items: center;
  height: 40px;
  position: relative;
  margin-left: 15px;
}
/*
.icon + .text {
  padding-right: 50px;
}*/

.item .icon{
  transition: transform .5s ease, color .5s ease;
  font-size: 40px;
  margin-left: -20px;
 /* position: absolute;
  left: -15px;*/
}  


.item .icon.active{
  transform: rotate(90deg);
}  

.item .icon.disable{
  cursor: default;
  color: white;
}  

.item:hover .btnCanOpen{
  display: inline-block;
}

.item .btn{
  display: none; 
  margin-right: 5px;
  border-radius: 5px !important;
} 
</style>
