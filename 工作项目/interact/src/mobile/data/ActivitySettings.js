import ruleBtn from '../../assets/btn-rule.png';
import myPrizesBtn from '../../assets/btn-my-prizes.png';
import cdBg from '../../assets/bg-countdown.png';
import dettolCdBg from '../modules/dettol/assets/begin-enroll.png';
import winnersBg from '../../assets/bg-winners.png';
import myPrizesBg from '../../assets/bg-my-prizes.png';
import mainEnableBtn from '../../assets/btn-enable.png';
import mainDisableBtn from '../../assets/btn-disable.png';
import blankBox from '../../assets/blank-box.png';
import durex0 from './Durex0';

const SettingsMap = {
  501: {
    apis: {
      getInfo: 'getQuotaPrizeActivityInfo',
      addAddr: 'addQuotaPrizeActivityAddr',
      getWinners: 'getQuotaPrizeWinners',
      getMyPrizes: 'getQuotaPrizeMyPrizes',
      getMyOrders: 'getMyOrders',
    },
    tpls: {
      default: {
        bgColor: ['#d31c2e', '#a80011'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-gift.png'),
            },
          },
          {
            componentName: 'Rule',
            options: {
              btnStyle: {
                backgroundImage: `url(${ruleBtn}`,
                top: '0.9rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [1],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离报名结束',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'enrollEndTime',
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [1],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离奖品发放',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'awardStartTime',
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [0],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离报名开始',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'enrollStartTime',
            },
          },
          {
            componentName: 'Enroll',
            enableStatus: [1, 2, 4],
            options: {
              enableBtnStyle: {
                backgroundImage: `url(${mainEnableBtn}`,
                width: '7.08rem',
                height: '1.29rem',
                fontSize: '0.36rem',
                lineHeight: '1rem',
                color: '#e2231a',
              },
              disableBtnStyle: {
                backgroundImage: `url(${mainDisableBtn}`,
                width: '7.08rem',
                height: '1.29rem',
                fontSize: '0.36rem',
                lineHeight: '1rem',
                color: '#999999',
              },
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [2],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离奖品发放',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'awardStartTime',
            },
          },
          {
            componentName: 'MyPrizes',
            enableStatus: [3, 4],
            options: {
              blankBox,
              boxStyle: {
                backgroundImage: `url(${myPrizesBg})`,
                width: '7.5rem',
                height: '4rem',
              },
            },
          },
          {
            componentName: 'Winners',
            enableStatus: [3, 4],
            options: {
              boxStyle: {
                backgroundImage: `url(${winnersBg})`,
                width: '7rem',
                height: '7.4rem',
                padding: '1.1rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
      dettol0: {
        bgColor: ['#0e822f', '#0e822f'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-auto.png'),
            },
          },
          {
            componentName: 'DettolRuleQuotaPrize',
            options: {
              btnStyle: {
                backgroundImage: `url(${ruleBtn}`,
                top: '0.9rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'DettolSwiper',
            options: {
              style: {
                marginTop: '1.2rem',
              },
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [0],
            options: {
              style: {
                backgroundImage: '',
                top: '10.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离活动开始',
              format: 'HH : mm : ss',
              timeKey: 'enrollStartTime',
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [1],
            options: {
              style: {
                backgroundImage: '',
                top: '10.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离报名结束',
              format: 'HH : mm : ss',
              timeKey: 'enrollEndTime',
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [2],
            options: {
              style: {
                backgroundImage: '',
                top: '10.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离名单公布',
              format: 'HH : mm : ss',
              timeKey: 'awardStartTime',
            },
          },
          {
            componentName: 'DettolEnroll',
            enableStatus: [0, 1],
            options: {
              enableBtnStyle: {
                backgroundImage: `url(${dettolCdBg}`,
                backgroundSize: '100%',
                width: '6.8rem',
                height: '1.6rem',
                fontSize: '0.6rem',
                fontWeight: '700',
                lineHeight: '1.6rem',
                color: '#0e822f',
                marginTop: '1.3rem',
              },
              disableBtnStyle: {
                backgroundImage: `url(${dettolCdBg}`,
                backgroundSize: '100%',
                width: '6.8rem',
                height: '1.6rem',
                fontSize: '0.6rem',
                fontWeight: '700',
                lineHeight: '1.6rem',
                color: '#595959',
                marginTop: '1.3rem',
              },
            },
          },
          {
            componentName: 'DettolMyOrders',
            enableStatus: [],
            options: {
              blankBox,
              boxStyle: {
                backgroundImage: `url(${myPrizesBg})`,
                width: '7.5rem',
                height: '4rem',
              },
            },
          },
          {
            componentName: 'DettolMyQuoTaPrizes',
            enableStatus: [2],
            options: {
              blankBox,
              boxStyle: {
                backgroundImage: `url(${myPrizesBg})`,
                width: '7.5rem',
                height: '4rem',
              },
            },
          },
          {
            componentName: 'DettolWinnersQuotaPrize',
            enableStatus: [3, 4],
            options: {
              boxStyle: {
                width: '7rem',
                height: '7.4rem',
                // padding: '1.1rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
    },
  },
  502: {
    apis: {
      getInfo: 'getQuotaDrawActivityInfo',
      draw: 'drawQuotaDrawActivity',
      addAddr: 'addQuotaDrawActivityAddr',
      getMyPrizes: 'getQuotaDrawRecords',
      getWinners: 'getQuotaDrawWinners',
    },
    tpls: {
      default: {
        bgColor: ['#d31c2e', '#a80011'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-draw.png'),
              style: {
                height: '7.1rem',
              },
            },
          },
          {
            componentName: 'Rule',
            options: {
              btnStyle: {
                backgroundImage: `url(${ruleBtn}`,
                top: '0.9rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'MyDrawPrizes',
            enableStatus: [3, 4],
            options: {
              btnStyle: {
                backgroundImage: `url(${myPrizesBtn}`,
                top: '1.5rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [2],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离抽奖开始',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'awardStartTime',
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [3],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离抽奖结束',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'awardEndTime',
            },
          },
          {
            componentName: 'Draw',
            options: {
              isDettol: false,
              boxStyle: {
                top: '0rem',
              },
              itemStyle: {
                itemColor: ['#ffffff', '#ec1341'],
                width: '3.1rem',
                height: '3.1rem',
              },
              wheelContentStyle: {
                top: '0.4rem',
                width: '6.2rem',
                height: '6.2rem',
                backgroundColor: '#ffffff',
              },
              backgroundOutsideStyle: {
                backgroundColor: '#ffe4a1',
                top: '0rem',
                width: '7rem',
                height: '7rem',
              },
              backgroundInsideStyle: {
                backgroundColor: '#c41324',
                top: '0.2rem',
                width: '6.6rem',
                height: '6.6rem',
              },
              prizeNameStyle: {
                fontSize: '0.24rem',
              },
              prizePictureStyle: {
                width: '1rem',
              },
              pointerStyle: {
                position: 'absolute',
                top: '2.6rem',
                width: '1.4rem',
              },
              pointerPic: require('../../assets/wheel-pointer.png'),
              circleStyle: {},
            },
          },
          {
            componentName: 'Winners',
            enableStatus: [2, 3, 4],
            options: {
              boxStyle: {
                backgroundImage: `url(${winnersBg})`,
                width: '7rem',
                height: '7.4rem',
                padding: '1.1rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
      // ``````````````````````````滴露模板`````````````````````````````````````
      dettol0: {
        bgColor: ['#048e2f', '#0e822f'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-draw-dettol.png'),
            },
          },

          {
            componentName: 'DettolRule',
            options: {},
          },

          {
            componentName: 'DettolMyDrawPrizes',
            options: {},
          },

          {
            componentName: 'DettolDraw',
            options: {
              boxStyle: {
                top: '1rem',
              },
              itemStyle: {
                itemColor: ['#e4c783', '#f6fbf7'],
                width: '2.7rem',
                height: '2.7rem',
              },
              isDettol: true,
              wheelContentStyle: {
                top: '0.3rem',
                width: '5.4rem',
                height: '5.4rem',
                backgroundColor: '#f6fbf7',
                border: '2px solid #16993c',
              },
              backgroundOutsideStyle: {
                backgroundColor: '#119737',
                top: '0rem',
                width: '6rem',
                height: '6rem',
              },
              backgroundInsideStyle: {
                backgroundColor: '#1fcf51',
                top: '0.2rem',
                width: '5.6rem',
                height: '5.6rem',
              },
              prizeNameStyle: {
                fontSize: '0.24rem',
              },
              prizePictureStyle: {
                width: '0.8rem',
              },
              pointerStyle: {
                position: 'absolute',
                top: '2.2rem',
                width: '1.4rem',
              },
              pointerPic: require('../../assets/wheel-pointer-dilu.png'),
              circleStyle: {},
            },
          },
          {
            componentName: 'DettolSwiper',
            options: {},
          },
          {
            componentName: 'DettolWinners',
            enableStatus: [2, 3, 4],
            options: {
              boxStyle: {
                width: '5.9rem',
                padding: '0.2rem 0.3rem',
              },
            },
          },
        ],
      },
    },
  },
  503: {
    apis: {
      getInfo: 'getManualQuotaPrizeActivityInfo',
      addAddr: 'addManualQuotaPrizeActivityAddr',
      getMyPrizes: 'getManualQuotaPrizeMyPrizes',
      getWinners: 'getManualQuotaPrizeWinners',
      getPrize: 'getManualQuotaPrizePrize',
    },
    tpls: {
      default: {
        bgColor: ['#d31c2e', '#a80011'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-gift.png'),
            },
          },
          {
            componentName: 'Rule',
            options: {
              btnStyle: {
                backgroundImage: `url(${ruleBtn}`,
                top: '0.9rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'MyDrawPrizes',
            enableStatus: [3, 4],
            options: {
              btnStyle: {
                backgroundImage: `url(${myPrizesBtn}`,
                top: '1.5rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [1, 2],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离领奖时间',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'awardStartTime',
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [3],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离领奖结束',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'awardEndTime',
            },
          },
          {
            componentName: 'Enroll',
            enableStatus: [1, 2, 4],
            options: {
              enableBtnStyle: {
                backgroundImage: `url(${mainEnableBtn}`,
                width: '7.08rem',
                height: '1.29rem',
                fontSize: '0.36rem',
                lineHeight: '1rem',
                color: '#e2231a',
              },
              disableBtnStyle: {
                backgroundImage: `url(${mainDisableBtn}`,
                width: '7.08rem',
                height: '1.29rem',
                fontSize: '0.36rem',
                lineHeight: '1rem',
                color: '#999999',
              },
            },
          },
          {
            componentName: 'OrderTip',
            enableStatus: [3],
            options: {},
          },
          {
            componentName: 'MyPrizesManual',
            enableStatus: [3],
            options: {
              blankBox,
              boxStyle: {
                backgroundImage: `url(${myPrizesBg})`,
                width: '7.5rem',
                height: '6rem',
              },
            },
          },
          {
            componentName: 'Winners',
            enableStatus: [3],
            options: {
              boxStyle: {
                backgroundImage: `url(${winnersBg})`,
                width: '7rem',
                height: '7.4rem',
                padding: '1.1rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
      dettol0: {
        bgColor: ['#048e2f', '#0e822f'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-auto.png'),
            },
          },
          {
            componentName: 'DettolRuleAndPrize',
            options: {
              style: {
                marginTop: '0.3rem',
              },
            },
          },
          // {
          //   componentName: 'MyDrawPrizes',
          //   enableStatus: [3, 4],
          //   options: {
          //     btnStyle: {
          //       backgroundImage: `url(${myPrizesBtn}`,
          //       top: '1.5rem',
          //       right: '0.3rem',
          //       width: '1.28rem',
          //       height: '0.49rem',
          //     },
          //   },
          // },
          {
            componentName: 'DettolSwiper',
            options: {
              style: {
                marginTop: '2rem',
              },
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [1],
            options: {
              style: {
                backgroundImage: '',
                top: '11.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离活动开始',
              format: 'HH : mm : ss',
              timeKey: 'orderStartTime',
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [2],
            options: {
              style: {
                backgroundImage: '',
                top: '11.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离领奖时间',
              format: 'HH : mm : ss',
              timeKey: 'awardStartTime',
            },
          },
          {
            componentName: 'DettolWinners',
            enableStatus: [3, 4],
            options: {
              boxStyle: {
                width: '7rem',
                height: '7.4rem',
                padding: '0.5rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
    },
  },
  505: {
    apis: {
      getInfo: 'getAllQuotaDrawActivityInfo',
      draw: 'drawAllQuotaDrawActivity',
      addAddr: 'addAllQuotaDrawActivityAddr',
      getMyPrizes: 'getAllQuotaDrawRecords',
      getWinners: 'getAllQuotaDrawWinners',
      getMyOrders: 'getMyOrders',
    },
    tpls: {
      default: {
        bgColor: ['#d31c2e', '#a80011'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-draw.png'),
            },
          },
          {
            componentName: 'Rule',
            options: {
              btnStyle: {
                backgroundImage: `url(${ruleBtn}`,
                top: '0.9rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'MyDrawPrizes',
            enableStatus: [2, 3, 4],
            options: {
              btnStyle: {
                backgroundImage: `url(${myPrizesBtn}`,
                top: '1.5rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [2],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离抽奖开始',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'activityStartTime',
            },
          },
          {
            componentName: 'Countdown',
            enableStatus: [3],
            options: {
              style: {
                backgroundImage: `url(${cdBg}`,
                top: '6rem',
                left: '50%',
                width: '4.5rem',
                height: '0.6rem',
              },
              label: '距离抽奖结束',
              format: 'DD天 HH小时 mm分 ss秒',
              timeKey: 'activityEndTime',
            },
          },
          {
            componentName: 'Draw',
            options: {
              itemStyle: {
                itemColor: ['#ffffff', '#ec1341'],
                width: '3.1rem',
                height: '3.1rem',
              },
              isDettol: false,
              wheelContentStyle: {
                top: '0.4rem',
                width: '6.2rem',
                height: '6.2rem',
              },
              backgroundOutsideStyle: {
                backgroundColor: '#ffe4a1',
                top: '0rem',
                width: '7rem',
                height: '7rem',
              },
              backgroundInsideStyle: {
                backgroundColor: '#c41324',
                top: '0.2rem',
                width: '6.6rem',
                height: '6.6rem',
              },
              prizeNameStyle: {
                fontSize: '0.24rem',
              },
              prizePictureStyle: {
                width: '1rem',
              },
              pointerStyle: {
                position: 'absolute',
                top: '2.6rem',
                width: '1.4rem',
              },
              pointerPic: require('../../assets/wheel-pointer.png'),
              circleStyle: {},
            },
          },
          {
            componentName: 'Winners',
            enableStatus: [2, 3, 4],
            options: {
              boxStyle: {
                backgroundImage: `url(${winnersBg})`,
                width: '7rem',
                height: '7.4rem',
                padding: '1.1rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
      durex0,
      // ````````````````````````````模板分界线```````````````````````````````
      dettol0: {
        bgColor: ['#048e2f', '#0e822f'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-draw-dettol.png'),
            },
          },

          {
            componentName: 'DettolRule',
            options: {},
          },
          {
            componentName: 'DettolMyDrawPrizes',
            options: {},
          },

          {
            componentName: 'DettolDraw',
            options: {
              boxStyle: {
                top: '1rem',
              },
              itemStyle: {
                itemColor: ['#e4c783', '#f6fbf7'],
                width: '2.7rem',
                height: '2.7rem',
              },
              wheelContentStyle: {
                top: '0.3rem',
                width: '5.4rem',
                height: '5.4rem',
                backgroundColor: '#f6fbf7',
                border: '2px solid #16993c',
              },
              isDettol: true,
              backgroundOutsideStyle: {
                backgroundColor: '#119737',
                top: '0rem',
                width: '6rem',
                height: '6rem',
              },
              backgroundInsideStyle: {
                backgroundColor: '#1fcf51',
                top: '0.2rem',
                width: '5.6rem',
                height: '5.6rem',
              },
              prizeNameStyle: {
                fontSize: '0.24rem',
              },
              prizePictureStyle: {
                width: '0.8rem',
              },
              pointerStyle: {
                position: 'absolute',
                top: '2.2rem',
                width: '1.4rem',
              },
              pointerPic: require('../../assets/wheel-pointer-dilu.png'),
              circleStyle: {},
            },
          },
          {
            componentName: 'DettolSwiper',
            options: {},
          },
          {
            componentName: 'DettolWinners',
            enableStatus: [2, 3, 4],
            options: {
              boxStyle: {
                width: '5.9rem',
                padding: '0.2rem 0.3rem',
              },
            },
          },
        ],
      },
    },
  },
  506: {
    apis: {
      getInfo: 'getQuotaAmountRankActivityInfo',
      addAddr: 'addQuotaAmountRankAddr',
      getMyPrizes: 'getQuotaAmountRankMyPrize',
      getWinners: 'getQuotaAmountRankWinners',
      getPrize: 'getQuotaAmountRankPrize',
      getMyOrders: 'getMyOrders',

    },
    tpls: {
      default: {
        bgColor: ['#d31c2e', '#a80011'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-rank.png'),
            },
          },
          {
            componentName: 'Rule',
            options: {
              btnStyle: {
                backgroundImage: `url(${ruleBtn}`,
                top: '0.9rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'MyDrawPrizes',
            options: {
              btnStyle: {
                backgroundImage: `url(${myPrizesBtn}`,
                top: '1.5rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'TimeRange',
            options: {
              label: '领奖时间：',
              startKey: 'awardStartTime',
              endKey: 'awardEndTime',
            },
          },
          {
            componentName: 'AmountRankInfo',
            enableStatus: [2, 3],
          },
          {
            componentName: 'Enroll',
            enableStatus: [1, 2, 3, 4],
            options: {
              enableBtnStyle: {
                backgroundImage: `url(${mainEnableBtn}`,
                marginTop: '0.4rem',
                width: '7.08rem',
                height: '1.29rem',
                fontSize: '0.36rem',
                lineHeight: '1rem',
                color: '#e2231a',
              },
              disableBtnStyle: {
                backgroundImage: `url(${mainDisableBtn}`,
                marginTop: '0.4rem',
                width: '7.08rem',
                height: '1.29rem',
                fontSize: '0.36rem',
                lineHeight: '1rem',
                color: '#999999',
              },
            },
          },
          {
            componentName: 'MyPrizesManual',
            enableStatus: [3, 4, 5],
            options: {
              blankBox,
              boxStyle: {
                backgroundImage: `url(${myPrizesBg})`,
                width: '7.5rem',
                height: '6rem',
              },
            },
          },
          {
            componentName: 'Winners',
            enableStatus: [3],
            options: {
              boxStyle: {
                backgroundImage: `url(${winnersBg})`,
                width: '7rem',
                height: '7.4rem',
                padding: '1.1rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
      dettol0: {
        bgColor: ['#048e2f', '#0e822f'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-prize-rank-dettol.png'),
            },
          },
          {
            componentName: 'DettolRuleQuotaPrize',
            options: {
              style: {
                marginTop: '0.3rem',
              },
            },
          },
          {
            componentName: 'DettolSwiper',
            options: {
              style: {
                marginTop: '1.2rem',
              },
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [1],
            options: {
              style: {
                backgroundImage: '',
                top: '10.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离活动开始',
              format: 'HH : mm : ss',
              timeKey: 'orderStartTime',
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [2],
            options: {
              style: {
                backgroundImage: '',
                top: '10.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离领奖时间',
              format: 'HH : mm : ss',
              timeKey: 'awardStartTime',
            },
          },

          {
            componentName: 'DettolMyOrders',
            enableStatus: [],
            options: {
              blankBox,
              boxStyle: {
                backgroundImage: `url(${myPrizesBg})`,
                width: '7.5rem',
                height: '4rem',
              },
            },
          },
          {
            componentName: 'DettolWinnersQuotaPrize',
            enableStatus: [3, 4],
            options: {
              boxStyle: {
                width: '7rem',
                height: '7.4rem',
                // padding: '1.1rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
    },
  },
  507: {
    apis: {
      getInfo: 'getQuotaTimeRankActivityInfo',
      addAddr: 'addQuotaTimeRankAddr',
      getMyPrizes: 'getQuotaTimeRankMyPrize',
      getWinners: 'getQuotaTimeRankWinners',
      getPrize: 'getQuotaTimeRankPrize',
      getMyOrders: 'getMyOrders',

    },
    tpls: {
      default: {
        bgColor: ['#d31c2e', '#a80011'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-quota-rank.png'),
            },
          },
          {
            componentName: 'Rule',
            options: {
              btnStyle: {
                backgroundImage: `url(${ruleBtn}`,
                top: '0.9rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'MyDrawPrizes',
            options: {
              btnStyle: {
                backgroundImage: `url(${myPrizesBtn}`,
                top: '1.5rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'DoubleTimeRange',
            enableStatus: [1, 2, 3, 4],
            options: {
              label1: '报名时间：',
              startKey1: 'enrollStartTime',
              endKey1: 'enrollEndTime',
              label2: '领奖时间：',
              startKey2: 'awardStartTime',
              endKey2: 'awardEndTime',
            },
          },
          {
            componentName: 'TimeRange',
            enableStatus: [5, 6],
            options: {
              label: '领奖时间：',
              startKey: 'awardStartTime',
              endKey: 'awardEndTime',
            },
          },
          {
            componentName: 'TimeRankInfo',
            enableStatus: [3, 5],
          },
          {
            componentName: 'Enroll',
            enableStatus: [1, 2, 3, 4, 6],
            options: {
              enableBtnStyle: {
                backgroundImage: `url(${mainEnableBtn}`,
                marginTop: '0.4rem',
                width: '7.08rem',
                height: '1.29rem',
                fontSize: '0.36rem',
                lineHeight: '1rem',
                color: '#e2231a',
              },
              disableBtnStyle: {
                backgroundImage: `url(${mainDisableBtn}`,
                marginTop: '0.4rem',
                width: '7.08rem',
                height: '1.29rem',
                fontSize: '0.36rem',
                lineHeight: '1rem',
                color: '#999999',
              },
            },
          },
          {
            componentName: 'MyPrizesManual',
            enableStatus: [5],
            options: {
              blankBox,
              boxStyle: {
                backgroundImage: `url(${myPrizesBg})`,
                width: '7.5rem',
                height: '6rem',
              },
            },
          },
          {
            componentName: 'Winners',
            enableStatus: [5],
            options: {
              boxStyle: {
                backgroundImage: `url(${winnersBg})`,
                width: '7rem',
                height: '7.4rem',
                padding: '1.1rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
      dettol0: {
        bgColor: ['#0e822f', '#0e822f'],
        modules: [
          {
            componentName: 'MainPic',
            options: {
              pic: require('../../assets/main-time-rank-dettol.png'),
            },
          },
          {
            componentName: 'DettolRuleQuotaPrize',
            options: {
              btnStyle: {
                backgroundImage: `url(${ruleBtn}`,
                top: '0.9rem',
                right: '0.3rem',
                width: '1.28rem',
                height: '0.49rem',
              },
            },
          },
          {
            componentName: 'DettolSwiper',
            options: {
              style: {
                marginTop: '1.2rem',
              },
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [0, 1],
            options: {
              style: {
                backgroundImage: '',
                top: '10.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离活动开始',
              format: 'HH : mm : ss',
              timeKey: 'enrollStartTime',
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [2],
            options: {
              style: {
                backgroundImage: '',
                top: '10.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离报名结束',
              format: 'HH : mm : ss',
              timeKey: 'enrollEndTime',
            },
          },
          {
            componentName: 'DettolCountDown',
            enableStatus: [3, 4],
            options: {
              style: {
                backgroundImage: '',
                top: '10.6rem',
                left: '50%',
                width: '6.5rem',
                height: '0.6rem',
              },
              label: '距离名单公布',
              format: 'HH : mm : ss',
              timeKey: 'awardStartTime',
            },
          },
          {
            componentName: 'DettolEnroll',
            enableStatus: [0, 1, 2, 3, 4, 5, 6, 7],
            options: {
              enableBtnStyle: {
                backgroundImage: `url(${dettolCdBg}`,
                backgroundSize: '100%',
                width: '6.8rem',
                height: '1.6rem',
                fontSize: '0.6rem',
                fontWeight: '700',
                lineHeight: '1.6rem',
                color: '#0e822f',
                margin: '1rem auto',
              },
              disableBtnStyle: {
                backgroundImage: `url(${dettolCdBg}`,
                backgroundSize: '100%',
                width: '6.8rem',
                height: '1.6rem',
                fontSize: '0.6rem',
                fontWeight: '700',
                lineHeight: '1.6rem',
                color: '#595959',
                marginTop: '1rem',
              },
            },
          },
          {
            componentName: 'DettolMyQuoTaPrizes',
            enableStatus: [4],
            options: {
              blankBox,
              boxStyle: {
                backgroundImage: `url(${myPrizesBg})`,
                width: '7.5rem',
                height: '4rem',
              },
            },
          },
          {
            componentName: 'DettolWinnersQuotaPrize',
            enableStatus: [5, 6],
            options: {
              boxStyle: {
                width: '7rem',
                height: '7.4rem',
                // padding: '1.1rem 0.5rem 0.5rem',
              },
            },
          },
        ],
      },
    },
  },
};
export default {
  async getActivitySettings(type) {
    return type in SettingsMap ? SettingsMap[type] : {};
  },
};
