var galaxie = (function() {
  "use strict";
  function o(t) {
    return (o =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(t) {
            return typeof t;
          }
        : function(t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function i(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function r(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r);
    }
  }
  function e(t, e, n) {
    return e && r(t.prototype, e), n && r(t, n), t;
  }
  function n(e, t) {
    var n,
      r = Object.keys(e);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(e)),
        t &&
          (n = n.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
        r.push.apply(r, n)),
      r
    );
  }
  function a(o) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? n(Object(i), !0).forEach(function(t) {
            var e, n, r;
            (e = o),
              (r = i[(n = t)]),
              n in e
                ? Object.defineProperty(e, n, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[n] = r);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i))
        : n(Object(i)).forEach(function(t) {
            Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(i, t));
          });
    }
    return o;
  }
  function t(t, e) {
    if ("function" != typeof e && null !== e)
      throw new TypeError("Super expression must either be null or a function");
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      e && u(t, e);
  }
  function c(t) {
    return (c = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function(t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function u(t, e) {
    return (u =
      Object.setPrototypeOf ||
      function(t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function s(t, e) {
    if (null == t) return {};
    var n,
      r = (function(t, e) {
        if (null == t) return {};
        for (var n, r = {}, o = Object.keys(t), i = 0; i < o.length; i++)
          (n = o[i]), 0 <= e.indexOf(n) || (r[n] = t[n]);
        return r;
      })(t, e);
    if (Object.getOwnPropertySymbols)
      for (var o = Object.getOwnPropertySymbols(t), i = 0; i < o.length; i++)
        (n = o[i]),
          0 <= e.indexOf(n) ||
            (Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n]));
    return r;
  }
  function p(t, e) {
    return !e || ("object" != typeof e && "function" != typeof e)
      ? (function(t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        })(t)
      : e;
  }
  function l(n) {
    var r = (function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function() {})
          ),
          !0
        );
      } catch (t) {
        return !1;
      }
    })();
    return function() {
      var t,
        e = c(n);
      return p(
        this,
        r
          ? ((t = c(this).constructor), Reflect.construct(e, arguments, t))
          : e.apply(this, arguments)
      );
    };
  }
  function f(t) {
    return (
      (function(t) {
        if (Array.isArray(t)) return h(t);
      })(t) ||
      (function(t) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
          return Array.from(t);
      })(t) ||
      (function(t, e) {
        if (!t) return;
        if ("string" == typeof t) return h(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === n && t.constructor && (n = t.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(t);
        if (
          "Arguments" === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return h(t, e);
      })(t) ||
      (function() {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function h(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
    return r;
  }
  var d = (function() {
      function t() {
        i(this, t), (this.preSteps = []), (this.steps = []);
      }
      return (
        e(t, [
          {
            key: "addPreStep",
            value: function(t) {
              return this.preSteps.push(t), this;
            },
          },
          {
            key: "replaceStep",
            value: function(t) {
              return (this.steps = [t]), this;
            },
          },
          {
            key: "appendStep",
            value: function(t) {
              return this.steps.push(t), this;
            },
          },
          {
            key: "clear",
            value: function() {
              return (this.preSteps = []), (this.steps = []), this;
            },
          },
          {
            key: "reset",
            value: function() {
              return (this.steps = []), this;
            },
          },
          { key: "run", value: function() {} },
        ]),
        t
      );
    })(),
    v = (function() {
      t(r, d);
      var n = l(r);
      function r(t) {
        var e;
        return i(this, r), (e = n.call(this)), t && e.addPreStep(t), e;
      }
      return (
        e(r, [
          {
            key: "run",
            value: function() {
              var e;
              return (
                [].concat(f(this.preSteps), f(this.steps)).forEach(function(t) {
                  e = t(e);
                }),
                e
              );
            },
          },
        ]),
        r
      );
    })(),
    g = (function() {
      t(r, d);
      var n = l(r);
      function r(t) {
        var e;
        return (
          i(this, r),
          (e = n.call(this)),
          t && e.addPreStep(t),
          (e.catchFn = null),
          e
        );
      }
      return (
        e(r, [
          {
            key: "run",
            value: function() {
              var e,
                n = [].concat(f(this.preSteps), f(this.steps)),
                r = n.length,
                o = r,
                i = this;
              function c(t) {
                (e = t), 0 < o && u();
              }
              function a(t) {
                for (
                  var e = i.catchFn,
                    n = arguments.length,
                    r = new Array(1 < n ? n - 1 : 0),
                    o = 1;
                  o < n;
                  o++
                )
                  r[o - 1] = arguments[o];
                e &&
                  e.apply(
                    void 0,
                    [t || new Error("flow interrupted!")].concat(r)
                  );
              }
              function u() {
                var t = n[r - o];
                --o === r - 1 ? t(c, a) : t(e, c, a);
              }
              return (
                setTimeout(function() {
                  u();
                }, 0),
                this
              );
            },
          },
          {
            key: "catch",
            value: function(t) {
              return (this.catchFn = t), this;
            },
          },
        ]),
        r
      );
    })();
  function y(e) {
    return (function(t, e) {
      for (var n = 0, r = t.length; n < r; n += 1) if (e(t[n])) return 1;
      return;
    })(document.getElementsByTagName("script"), function(t) {
      return -1 !== t.src.indexOf(e);
    });
  }
  function m(t, e) {
    for (var n in e) {
      var r = e[n];
      if (r.required && !t.hasOwnProperty(n))
        return Error("缺少属性: ".concat(n));
      if (t.hasOwnProperty(n) && o(t[n]) !== r.type)
        return Error("属性".concat(n, "类型不符, 期望").concat(r.type, "类型"));
    }
    return null;
  }
  var b = new ((function() {
      function t() {
        i(this, t),
          (this.env = "prd"),
          (this.oscasUrl = "https://oscas.suning.com"),
          (this.saScriptUrl =
            "https://res.suning.cn/javascript/sn_da/sa_simple.js"),
          (this.authUrl = "https://passport.suning.com"),
          (this.authServiceUrl = "https://loginst.suning.com"),
          (this.bridgeUrl =
            "https://res.suning.cn/project/mvs/RES/common/script/android/sneapp.js");
      }
      return (
        e(t, [
          {
            key: "getEnv",
            value: function() {
              return this.env;
            },
          },
          {
            key: "getOscasUrl",
            value: function() {
              return this.oscasUrl;
            },
          },
          {
            key: "getAuthUrl",
            value: function() {
              return this.authUrl;
            },
          },
          {
            key: "getAuthServiceUrl",
            value: function() {
              return this.authServiceUrl;
            },
          },
          {
            key: "getSaScript",
            value: function() {
              return this.saScriptUrl;
            },
          },
          {
            key: "getBridgeUrl",
            value: function() {
              return this.bridgeUrl;
            },
          },
        ]),
        t
      );
    })())(),
    w = new v(function() {
      return navigator.userAgent.toLowerCase();
    });
  function S() {
    return w
      .replaceStep(function(t) {
        return !!t.match(/miniprogram/);
      })
      .run();
  }
  function O() {
    return w
      .replaceStep(function(t) {
        return !!t.match(/android/);
      })
      .run();
  }
  function j() {
    return w
      .replaceStep(function(t) {
        return !!t.match(/(iPhone|iPod|iPad);?/i);
      })
      .run();
  }
  function P() {
    return w
      .replaceStep(function(e) {
        return ![
          /ipad/,
          /iphone os/,
          /midp/,
          /rv:1.2.3.4/,
          /ucweb/,
          /android/,
          /windows ce/,
          /windows mobile/,
        ].some(function(t) {
          return !!e.match(t);
        });
      })
      .run();
  }
  function U() {
    return w
      .replaceStep(function(t) {
        return !!t.match(/SNEBUY-APP/i);
      })
      .run();
  }
  function _() {}
  function E(t) {
    return function() {
      if (!U()) throw Error("此方法只能在易购客户端中调用");
      return t.apply(void 0, arguments);
    };
  }
  var k = Object.freeze({
      __proto__: null,
      isMiniApp: S,
      isAndroid: O,
      isIOS: j,
      isBrowser: P,
      isSnApp: U,
      getAppVersion: function(t) {
        function e(n) {
          var t = j() ? window.SNNativeClient : window.baseApi;
          t.getClientInfo(function(t) {
            var e = t;
            if ("string" == typeof t)
              try {
                e = JSON.parse(t);
              } catch (t) {
                n(t);
              }
            n(null, O() ? e.version : e.bundleVersion);
          });
        }
        if ("function" != typeof t) throw new Error("缺少回调函数");
        var n;
        U()
          ? window.SNNativeClient || window.baseApi
            ? e(t)
            : y("android/sneapp.js") &&
              ((n = t),
              document.addEventListener("deviceready", function() {
                e(n);
              }))
          : t(new Error("无法获取易购客户端版本"));
      },
    }),
    C = [, "1", "2", "3", "4", "6", "7", "8", "15"],
    A = E(function(t, e) {
      var n = 1 < arguments.length && void 0 !== e ? e : _;
      function r(t) {
        x(t);
      }
      var o = t.title,
        i = t.targetUrl,
        c = t.iconUrl,
        a = t.content,
        u = void 0 === a ? "" : a,
        s = t.shareWays,
        p = void 0 === s ? "1,2" : s,
        l = t.miniProgramPath,
        f = void 0 === l ? "" : l,
        h = t.miniProgramId,
        d = void 0 === h ? "" : h,
        v = t.channelType,
        g = void 0 === v ? "" : v,
        y = t.picData,
        m = void 0 === y ? "" : y,
        p = p
          .split(",")
          .map(function(t) {
            return C[t.replace(/\s*/g, "")];
          })
          .join(",");
      O()
        ? shareApi.callNativeShare(
            o,
            u,
            i,
            c,
            p,
            f,
            d,
            g,
            m,
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            function() {
              -1 !== p.indexOf("15") && n(r);
            }
          )
        : j() &&
          ((m = JSON.stringify(m)),
          window.SNNativeClient.callNativeShare(o, u, i, c, p, f, d, g, m),
          window.callShareMsgTokenResult ||
            (window.callShareMsgTokenResult = function() {
              n(r);
            }));
    }),
    I = E(function(t, e) {
      var n = 1 < arguments.length && void 0 !== e && e;
      if (n && !t.posterUrl) throw Error("缺少海报图地址");
      var r,
        o = a({}, t),
        i = o.msgTokenCallback,
        c = s(o, ["msgTokenCallback"]);
      (c.miniProgramId = n ? "" : "gh_1d1e15e90afc"),
        (c.miniProgramPath = n
          ? ""
          : "/pages/webView/index?webViewSrc=".concat(
              encodeURIComponent(c.targetUrl),
              "&notNeedLogin=1"
            )),
        (c.shareWays = "function" == typeof i ? "1,2,8" : "1,2"),
        c.posterUrl &&
          (((r = {}).sharePicWays = c.shareWays),
          (r.picUrl = c.posterUrl),
          (c.picData = r),
          delete c.posterUrl),
        A(c, i);
    }),
    T = E(function(t, e) {
      I(t, 1 < arguments.length && void 0 !== e && e);
    }),
    x = E(function(t) {
      var e = 0 < arguments.length && void 0 !== t ? t : "",
        n = O()
          ? baseApi.copyToClipBoard
          : window.SNNativeClient.copyToClipboard;
      n(e);
    }),
    N = Object.freeze({
      __proto__: null,
      share: I,
      shareToWeChat: T,
      copyToClipBoard: x,
    }),
    R = {
      title: { required: !0, type: "string" },
      cardImg: { required: !0, type: "string" },
      path: { required: !0, type: "string" },
      bgImg: { required: !0, type: "string" },
      codeImg: { type: "string" },
      showPoster: { type: "boolean" },
    };
  function D(t) {
    wx.miniProgram.navigateTo({ url: t });
  }
  var q = Object.freeze({
      __proto__: null,
      navigateTo: D,
      share: function() {
        var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          e = m(t, R);
        if (e) throw e;
        if (t.showPoster && !t.codeImg) throw Error("缺少海报图地址");
        var n = t.bgImg,
          r = void 0 === n ? "" : n,
          o = t.codeImg,
          i = void 0 === o ? "" : o,
          c = t.title,
          a = void 0 === c ? "" : c,
          u = t.cardImg,
          s = void 0 === u ? "" : u,
          p = t.path,
          l = void 0 === p ? "" : p,
          f = t.showPoster,
          h = void 0 === f || f;
        D(
          "/packageC/pages/commonShare/share?".concat(
            (function(t) {
              var e,
                n = [];
              for (var r in t)
                (e = t[r] || ""),
                  n.push("".concat(r, "=").concat(encodeURIComponent(e)));
              return n.join("&");
            })({
              bgImg: r,
              codeImg: i,
              title: a,
              cardImg: s,
              path: "/pages/webView/index?webViewSrc=".concat(
                encodeURIComponent(l),
                "&notNeedLogin=1"
              ),
              showFc: h,
            })
          )
        );
      },
    }),
    B = {};
  ["target", "ticket", "width", "height"].forEach(function(t) {
    B[t] = { required: !0, type: "string" };
  });
  function V(t) {
    var e = "";
    P() || (e = "&loginTheme=wap_new"),
      void 0 === t && (t = "".concat(location.href)),
      (location.href = ""
        .concat(b.getAuthUrl(), "/ids/login?service=")
        .concat(
          encodeURIComponent(
            ""
              .concat(b.getAuthServiceUrl(), "/auth?targetUrl=")
              .concat(encodeURIComponent(t))
          )
        )
        .concat(e));
  }
  var z = Object.freeze({
      __proto__: null,
      getDfpToken: function(e) {
        if (!y("fp.js")) throw Error("未引入设备指纹采集脚本");
        if (!window._dfp) throw Error("设备指纹脚本初始化异常");
        try {
          e(null, _dfp.getToken());
        } catch (t) {
          e(t);
        }
      },
      getDetect: function(e) {
        if (!y("mmds.js")) throw Error("未引入人机参数采集脚本");
        if (!bd) throw Error("人机参数脚本初始化异常");
        try {
          e(null, bd.rst({ scene: "9" }));
        } catch (t) {
          e(t);
        }
      },
      getCaptcha: function(t, e) {
        if (!y("SnCaptcha.js")) throw Error("未引入滑动验证码SDK脚本");
        if (!SnCaptcha) throw Error("滑动验证码脚本初始化异常");
        var n = m(t, B);
        if (n) throw n;
        var r = t.id,
          o = t.type,
          i = void 0 === o ? "popup" : o,
          c = t.target;
        void 0 === r && (r = c);
        var a = {
          id: r,
          type: i,
          target: c,
          ticket: t.ticket,
          width: t.width,
          height: t.height,
          callback: function(t) {
            e(null, t);
          },
        };
        return (a.env = b.getEnv()), SnCaptcha.init(a);
      },
    }),
    F = new g(function(e, n) {
      $.ajax({
        url: "".concat(b.getAuthServiceUrl(), "/authStatus"),
        crossDomain: !0,
        cache: !1,
        dataType: "jsonp",
        success: function(t) {
          t.hasLogin ? e(t.principal) : n(new Error("用户未登录"), V);
        },
      });
    });
  var L,
    W,
    M,
    J = Object.freeze({
      __proto__: null,
      getUnionId: function(n) {
        var r =
          !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
        F.replaceStep(function(t) {
          $.ajax({
            url: "".concat(
              b.getOscasUrl(),
              "/oscas/jssdk/getUnionId.do?loginTheme=wap_new"
            ),
            type: "POST",
            xhrFields: { withCredentials: !0 },
            success: function(t) {
              n(null, t);
            },
            error: function(t) {
              n(t);
            },
          });
        })
          .run()
          .catch(function(t, e) {
            n(t), r && e();
          });
      },
    });
  return (
    O() &&
      ((L = []),
      void 0 !== k && L.push({ id: "com.snapp.base", clobbers: ["baseApi"] }),
      void 0 !== N && L.push({ id: "com.snapp.share", clobbers: ["shareApi"] }),
      L.length &&
        (((W = document.createElement("script")).src =
          "https://res.suning.cn/project/mvs/RES/common/script/android/sneapp.js"),
        (W.onload = function() {
          snapp.define("snapp/plugin_list", function(t, e, n) {
            n.exports = [
              { file: "plugins/baseApi.js", module: L, version: "1.0.13" },
            ];
          });
        }),
        document.head.appendChild(W))),
    S() &&
      (((M = document.createElement("script")).src =
        "https://res.wx.qq.com/open/js/jweixin-1.3.2.js"),
      document.head.appendChild(M)),
    {
      env: k,
      interactive: N,
      miniapp: q,
      security: z,
      user: J,
      version: "0.6.0",
    }
  );
})();
