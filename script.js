$(function(){
  $('#birth').datetimepicker({
    locale: "it",
    viewMode: 'years',
    format: 'DD/MM/YYYY'
  })
  $('#CSFdate,#PEVdate,#PEAdate,#PESS_aassdate,#PESS_aaiidate').datetimepicker({
    locale: "it",
    format: 'DD/MM/YYYY'
  })
})
Vue.component('qInline', {
  props:["model", "prefix"],
  template: '#qInline_tmpl'
})
Vue.component('qTest', {
  props:["model", "prefix"],
  template: '#qTest_tmpl'
})

Vue.component('qTextarea', {
  props:["model","prefix"],
  template: '#qTextarea_tmpl'
})
Vue.component('qCheck', {
  props:["model","prefix"],
  template: '#qCheck_tmpl'
})
Vue.component('qPositiv', {
  props:["model","prefix"],
  template: '#qPositiv_tmpl'
})
vm=new Vue({
  el: 'body',
  created: function(){
    var self=this
    var mapname= function(v,k,o){v.name=k;};
    _.each(this.patient,mapname);
    _.each(this.investigations,mapname);
    _.each(["CSF","PEV","PEA","PESS_aass","PESS_aaii"],function(key){
      _.each(self.investigations[key],mapname);
    });
  },
  data: {
    patient:{
      surname:{label:"Cognome"},
      name:{ label:"Nome" },
      birth:{ label:"Nato il", pholder:"Data di nascita" },
      birthplace:{ label:"a", pholder:"Luogo di nascita" },
      resident:{label:"Residente a", pholder:"Residenza"},
      address:{label:"in", pholder:"Via/piazza"},
      phone:{label:"Tel"},
      CF:{label:"CF"},
      exemption:{label:"Esenzione"},
      IC:{label:"IC"},
      IA:{label:"IA"},
      anamnesis:{label:"Anamnesi"}
    },
    investigations:{
      CSF:{
        done:{label:"Liquor"},
        date:{label:"data"},
        normal:{label:"Normale",pholder:" "},
        OB:{label:"OB",pholder:" "},
        parts:{label:"n° frazioni",pholder:" "},
      },
      PEV:{
        done:{label:"PEV",value:""},
        date:{label:"data"}
      },
      PEA:{
        done:{label:"PEA",value:""},
        date:{label:"data"}
      },
      PESS_aass:{
        done:{label:"PESS_aass",value:""},
        date:{label:"data"}
      },
      PESS_aaii:{
        done:{label:"PESS_aaii",value:""},
        date:{label:"data"}
      },
      NMR:{
        done:{label:"RMN"},
        date:{label:"data"},
        brain:{label:"encefalo",pholder:" "},
        spinalCord:{label:"OB",pholder:" "}
      },
      Ab_AQP:{label:"Ab anti AQP",value:""},
      Ab_MOG:{label:"Ab anti MOG",value:""},
      xrTorso:{label:"Rx Torace", pholder:" "},
      TBTest:{label:"Test per TBC", pholder:" "},

    }
  },
  methods:{
    extractDataset:function(ds){
      return _.zipObject(_.map(ds, "name"),_.map(ds, "value"))
    }
  },
  computed: {
    dataset: function () {
      var self=this;
      var ret= {
        patient: this.extractDataset(this.patient),
        investigations: this.extractDataset(this.investigations),
      }
      _.each(["CSF","PEV","PEA","PESS_aass","PESS_aaii","RMN"],function(key){
        ret.investigations[key]=self.extractDataset(self.investigations[key])
      });
      return ret;
    }
  }
})

