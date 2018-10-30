// script.js
"use strict";

const JalanBaseUrl = 'http://jws.jalan.net/APICommon/AreaSearch/V1/?key=';
const ApiKey = config.KEY;

const vm = new Vue({
  el: '#app',
  data: {
    prefs: [],
    hotelid: '',
    hotelname: '',
    postcode: '',
    hoteladdress: '',
    largearea: '',
    smallarea: '',
    hoteltype: '',
    samplerate: '',
    numberofratings: '',
    rating: ''
  },
  methods: {
    get_location: function () {
      const request = 'ajax.php?url=' + JalanBaseUrl + ApiKey
      axios.get(request, {
        timeout: 30000,
        responseType: 'document'
      })
        .then(function (response) {
          const xml = response.data;
          //console.log(xml)

          const areas = xml.getElementsByTagName('prefecture');
       //   const areas = xml.getElementsByTagName('Hotel');

          // console.log(areas.length)
          console.log(areas)


          // HTMLCollectionだとは確認とれた
          //console.log(Object.prototype.toString.call(areas));

          for (var i = 0; i < areas.length; i++) {

            const largeareas = areas[i].getElementsByTagName('largearea');

            for (var j = 0; j < largeareas.length; j++) {

              const objPrefs = {
                //HTMLCollectionはattributesで指定必要あり
                pref_code: areas[i].attributes[0].value,
                pref_name: areas[i].attributes[1].value,
                large_code: largeareas[j].attributes[0].value,
                large_name: largeareas[j].attributes[1].value
              };

              vm.$data.prefs.push(objPrefs);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }

  },

  created: function (pref_large_code) {
    this.get_location();
  }

});