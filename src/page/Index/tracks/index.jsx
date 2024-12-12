import * as Echarts from "echarts";
// import "echarts";
// import 'echarts-gl';
import { useEffect, useRef } from "react";
import style from "./index.module.less";
import "../../../utils/china.js"
{/* <script type="text/javascript" src="./china.js"></script> */ }
let dataList = [{
  name: "南海诸岛",
  value: 0
},
{
  name: '北京',
  value: 2
},
{
  name: '天津',
  value: 0
},
{
  name: '上海',
  value: 4
},
{
  name: '重庆',
  value: 0
},
{
  name: '河北',
  value: 0
},
{
  name: '河南',
  value: 4,
  city: [{
    name: '濮阳',
    value: 1
  },
  {
    name: '南阳',
    value: 1
  },
  {
    name: '郑州',
    value: 1
  },
  {
    name: '安阳',
    value: 1
  }]
},
{
  name: '云南',
  value: 0
},
{
  name: '辽宁',
  value: 0
},
{
  name: '黑龙江',
  value: 0
},
{
  name: '湖南',
  value: 0
},
{
  name: '安徽',
  value: 0
},
{
  name: '山东',
  value: 1
},
{
  name: '新疆',
  value: 0
},
{
  name: '江苏',
  value: 1
},
{
  name: '浙江',
  value: 0
},
{
  name: '江西',
  value: 0
},
{
  name: '湖北',
  value: 3,
  city: [{
    name: '武汉',
    value: 3
  }]
},
{
  name: '广西',
  value: 0
},
{
  name: '甘肃',
  value: 0
},
{
  name: '山西',
  value: 1
},
{
  name: '内蒙古',
  value: 0
},
{
  name: '陕西',
  value: 1
},
{
  name: '吉林',
  value: 0
},
{
  name: '福建',
  value: 0
},
{
  name: '贵州',
  value: 0
},
{
  name: '广东',
  value: 1,
  city: [{
    name: '深圳',
    value: 1
  }]
},
{
  name: '青海',
  value: 0
},
{
  name: '西藏',
  value: 0
},
{
  name: '四川',
  value: 0
},
{
  name: '宁夏',
  value: 0
},
{
  name: '海南',
  value: 0
},
{
  name: '台湾',
  value: 0
},
{
  name: '香港',
  value: 0
},
{
  name: '澳门',
  value: 0
}
];
function setLable(e) {
  let lable = e.name;
  if (!e.value) {
    return e.name + "<br />" + "世界那么大，应该去看看"
  } else if (e.data.city && e.data.city.length > 0) {
    lable = e.name + "去过" + e.value + "次";
    for (let i = 0; i < e.data.city.length; i++) {
      lable += "<br />" + e.data.city[i].name + "：" + e.data.city[i].value + "次";
    }
    return lable;
  } else {
    return e.seriesName + "<br />" + e.name + "：" + e.value
  }

}
const option = {
  tooltip: {
    triggerOn: "click",
    formatter: function (e) {
      // return e.value == 0 ? e.name + "暂未去过" : e.seriesName + "<br />" + e.name + "：" + e.value
      return setLable(e);
    }
  },
  visualMap: {
    min: 0,
    max: 1000,
    left: 26,
    bottom: 40,
    showLabel: false,
    text: ["高", "低"],
    pieces: [{
      gt: 3,
      label: "> 3 次",
      color: "#7f1100"
    }, {
      gte: 2,
      lte: 3,
      label: "2 - 3 次",
      color: "#ff5428"
    }, {
      gte: 1,
      lt: 2,
      label: "1 - 2 次",
      color: "#ff8c71"
    }, {
      gt: 0,
      lt: 1,
      label: "1次",
      color: "#ffd768"
    }, {
      value: 0,
      color: "#ffffff"
    }],
    show: !0
  },
  geo: {
    map: "china",
    roam: !1,
    scaleLimit: {
      min: 1,
      max: 2
    },
    zoom: 1.0,
    top: 120,
    label: {
      normal: {
        show: !0,
        fontSize: "14",
        color: "rgba(0,0,0,0.7)"
      }
    },
    itemStyle: {
      normal: {
        //shadowBlur: 50,
        //shadowColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: "rgba(0, 0, 0, 0.2)"
      },
      emphasis: {
        areaColor: "#f2d5ad",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0
      }
    }
  },
  series: [{
    name: "足迹",
    type: "map",
    geoIndex: 0,
    data: dataList
  }]
};
function Tracks() {
  const chartmap = useRef(null);

  const mapInit = () => {
    const mychartforce = Echarts.init(chartmap.current);
    mychartforce.setOption(option, true);

    window.onresize = () => {
      mychartforce.resize();
    };
  };

  useEffect(() => {
    mapInit();

    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <>
      <div ref={chartmap} className={style.chartbox}></div>
    </>
  );
}

export default Tracks