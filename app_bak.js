// script.js
const vm = new Vue({
  el: '#app',   // div#app にマウントする
  data: {
    prefs: [],   // 取得する県の一覧
    largeareas: [], // 取得する中項目一覧
    smallareas: [], // 取得する小項目一覧
    city: '016010', // 都市の初期値
    weather: [],  // 天気情報の一覧
    title: '',    // 表示する都市の名前
    text: ''    // 天気の説明文
  },
  methods: {
    get_location: function () {
      const request = 'ajax.php?url=http://jws.jalan.net/APICommon/AreaSearch/V1/?key=sgr158b429a382'
      axios.get(request, {
        timeout: 3000,
        responseType: 'document'
      })
        .then(function (response) {
          const xml = response.data;
          const prefs = xml.getElementByTagName('Prefecture');

          console.log(prefs)

          for (var i = 0; i < prefs.length; i++) {
            const largeareas = prefs[i].getElementByTagName('LargeArea');
            for (var j = 0; j < largeareas.length; j++) {
              const obj = {
                name: largeareas[j].name,
                cd: largeareas[j].cd
              };
              vm.$data.largeareas.push(obj);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    get_info: function (largearea) {
      const request = 'ajax.php?url=http://weather.livedoor.com/forecast/webservice/json/v1?city=' + city;
      axios.get(request, {
        timeout: 3000,
        responseType: 'document'
      })
        .then(function (response) {

        })

        .catch(function (error) {
          vm.$data.weather = {
            title: 'エラーです'
          }
        });
    }
  },
  created: function () {
    this.get_location()
    this.get_info(this.largearea);
  }
});