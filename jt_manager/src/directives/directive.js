import Vue from 'vue';
Vue.directive("time", {
    bind(el, binding) {
        let value = binding.value;
        let date = new Date();
        date.setTime(value);
        let y= date.getFullYear();
        let m= String(date.getMonth()+1).padStart(2,"0");
        let d= String(date.getDate()).padStart(2,"0");
        let h= String(date.getHours()).padStart(2,"0");
        let min= String(date.getMinutes()).padStart(2,"0");
        let se=String(date.getSeconds()).padStart(2,"0");
        el.innerHTML=`${y}-${m}-${d} ${h}:${min}:${se}`;
        
    }
})