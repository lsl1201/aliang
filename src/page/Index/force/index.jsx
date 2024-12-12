import * as Echarts from "echarts";
import { useEffect, useRef } from "react";
import style from "./index.module.less";
const forceOption = {
  // title: {
  //   // text: 'My Skills',
  //   subtext: 'Skill force directed graph',
  //   top: 'top',
  //   padding: [40, 80],
  // },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 50,
      // color: 'rgba(101, 163, 13,0.9)',
      color: 'skyblue',
      focusNodeAdjacency: true,
      roam: true,
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 12
          },
        }
      },
      force: {
        repulsion: 50
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [2, 6],
      edgeLabel: {
        normal: {
          // show: true,
          textStyle: {
            fontSize: 10
          },
          formatter: "{c}"
        }
      },
      data: [
        {
          name: "git",
          x: 60,
          y: 275
        },
        {
          name: 'Web',
          x: 20,
          y: 250
        },
        {
          name: 'JavaScript',
          x: 100,
          y: 250
        },
        {
          name: 'TypeScript',
          x: 150,
          y: 250
        },
        {
          name: 'Vite',
          x: 200,
          y: 250
        },
        {
          name: 'Vue.js',
          x: 200,
          y: 300
        },
        {
          name: 'uniapp',
          x: 150,
          y: 300
        },
        {
          name: '微信小程序',
          x: 170,
          y: 330
        },
        {
          name: 'React',
          x: 150,
          y: 200
        }
        ,
        {
          name: 'Node.js',
          x: 100,
          y: 300
        },
        {
          name: 'NPM',
          x: 0,
          y: 200
        }, {
          name: 'PNPM',
          x: -50,
          y: 200
        },
        {
          name: 'Yarn',
          x: -50,
          y: 250
        },

        {
          name: 'HTML',
          x: 50,
          y: 200
        },
        {
          name: 'CSS',
          x: 100,
          y: 200
        },
        {
          name: 'LESS',
          x: 100,
          y: 150
        }, {
          name: 'SCSS',
          x: 50,
          y: 150
        },
        {
          name: '服务器',
          x: 20,
          y: 300
        },
        {
          name: 'Nginx',
          x: -30,
          y: 350
        }, {
          name: 'PM2',
          x: 20,
          y: 350
        },
        {
          name: 'PostgreSQL',
          x: 70,
          y: 350
        },
        {
          name: 'UI',
          x: -30,
          y: 280
        },
        {
          name: 'PS',
          x: -70,
          y: 280
        }, {
          name: 'AI',
          x: -55,
          y: 310
        }, {
          name: 'PR',
          x: -25,
          y: 320
        },
      ],
      links: [
        {
          source: 'Web',
          target: 'NPM',
        }, {
          source: 'NPM',
          target: 'PNPM',
        }, {
          source: 'NPM',
          target: 'Yarn',
        },
        {
          source: 'Web',
          target: 'JavaScript',
        },
        {
          source: 'Web',
          target: 'HTML',
        },
        {
          source: 'Node.js',
          target: 'JavaScript',
        },
        {
          source: 'JavaScript',
          target: 'Vue.js',
        },
        {
          source: 'JavaScript',
          target: 'React'
        }, {
          source: 'JavaScript',
          target: 'TypeScript'
        },
        {
          source: 'TypeScript',
          target: 'Vue.js'
        }, {
          source: 'Vue.js',
          target: 'uniapp'
        }, {
          source: 'uniapp',
          target: '微信小程序'
        }, {
          source: 'Vue.js',
          target: '微信小程序'
        }, {
          source: 'Vue.js',
          target: 'Vite'
        }, {
          source: 'TypeScript',
          target: 'React'
        },
        {
          source: 'React',
          target: 'Vite'
        },
        {
          source: 'CSS',
          target: 'HTML'
        },
        {
          source: 'CSS',
          target: 'LESS'
        },
        {
          source: 'CSS',
          target: 'SCSS'
        },
        {
          source: 'HTML',
          target: 'JavaScript'
        },
        {
          source: 'Web',
          target: '服务器'
        }, {
          source: '服务器',
          target: 'Nginx'
        }, {
          source: '服务器',
          target: 'PM2'
        },
        {
          source: '服务器',
          target: 'Node.js'
        },
        {
          source: '服务器',
          target: 'PostgreSQL'
        }, {
          source: 'Node.js',
          target: 'PostgreSQL'
        },
        {
          source: 'UI',
          target: 'Web'
        }, {
          source: 'Web',
          target: 'UI'
        }, {
          source: 'UI',
          target: 'PS'
        },
        {
          source: 'UI',
          target: 'AI'
        },
        {
          source: 'UI',
          target: 'PR'
        },

      ],
      lineStyle: {
        opacity: 0.9,
        width: 1,
        curveness: 0
      }
    }
  ]
};

function Force() {
  const chartforce = useRef(null);

  const chartInit = () => {
    const mychartforce = Echarts.init(chartforce.current);
    mychartforce.setOption(forceOption, true);

    window.onresize = () => {
      mychartforce.resize();
    };
  };

  useEffect(() => {
    chartInit();

    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <>
      <div ref={chartforce} className={style.chartbox}></div>
    </>
  );
}

export default Force