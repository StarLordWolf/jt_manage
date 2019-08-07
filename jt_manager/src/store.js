import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';

Vue.use(Vuex)
function autoLoader(routes){
  routes[0].component=()=>import("@/views/AdminMain");
  routes[0].children.forEach(route=>{
      route.component=()=>import(`@/views/${route.name}/${route.name}`);
      route.children.forEach(r=>{
          r.component=()=>import(`@/views/${route.name}/${r.name}`);
      })
  });
  return routes;
}
export default new Vuex.Store({
  state: {
    routeData: []
  },
  mutations: {
    updateRouteData(state,obj){
      state.routeData=obj;
      sessionStorage.setItem("routeData",JSON.stringify(obj));
      let routes=autoLoader(obj);
      router.addRoutes(routes);
      router.push({name:"main"});
   }
  },
  actions: {

  }
})
