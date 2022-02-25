/* eslint-disable */
/**version:1.0.7;author:plat-h5**/
!function (e, t, n) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? n(e, t) : function (e) {
      return n(e, t)
    }
    : "function" == typeof define && (define.cmd || define.amd) ? define(function () {
      return n(e, t)
    }) : n(e, t)
}(void 0 !== this ? this : window, window, function (e, t) {
  var n = function () {
    var e = {
      alert: !1,
      debug: !1
    };
    return e.printMsg = function (t, n) {
      e.debug && console.log("***" + t + "*** " + n),
      e.alert && alert("***" + t + "*** " + n)
    }
      ,
      e
  }();
  return e = e || this,
    e.JSSDK = n,
    function (e) {
      "use strict";
      e.Common = {
        client: function () {
          var e = {}
            , n = navigator && navigator.userAgent || "";
          if (/jdapp/.test(n)) {
            e.jdapp = !0;
            var r = n.split(";");
            e.appVersion = r[2],
              e.OSVersion = r[3],
              e.udid = r[4],
              e.network = r[5].replace("network/", "")
          }
          if (e.WKwebview = n.indexOf("supportJDSHWK/1") > -1 || 1 == t._is_jdsh_wkwebview,
            e.ios = !!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            e.android = n.indexOf("Android") > -1 || n.indexOf("android") > -1,
            e.iPhone = n.indexOf("iPhone") > -1 || n.indexOf("iphone") > -1,
            e.iPad = n.indexOf("iPad") > -1 || n.indexOf("ipad") > -1,
            e.weixin = n.indexOf("MicroMessenger") > -1 || n.indexOf("micromessenger") > -1,
            e.qq = "QQ" == (n.match(/\sQQ/i) || "").toString().toLocaleUpperCase().trim(),
            e.trident = n.indexOf("Trident") > -1,
            e.presto = n.indexOf("Presto") > -1,
            e.webKit = n.indexOf("AppleWebKit") > -1,
            e.gecko = n.indexOf("Gecko") > -1 && -1 == n.indexOf("KHTML"),
            e.chrome = null !== n.match(/Chrome/i) && null === n.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i),
            e.safari = (e.iPhone || e.iPad) && n.match(/Safari/),
            e.safariVersion = 0,
            e.safari) {
            var i = n.match(/Version\/([\d\.]+)/);
            e.safariVersion = i;
            try {
              e.safariVersion = parseFloat(i[1], 10)
            } catch (e) {
            }
          }
          return e.ios10Chrome = !!n.match(/(Mac\sOS)\sX\s([\d_]+)/),
            e.isSAMSUNGN7508V = -1 != n.toUpperCase().indexOf("SAMSUNG-SM-N7508V"),
            e
        }(),
        printMsg: function (t, n) {
          e.printMsg(t, n)
        },
        mergeJson: function (e, t) {
          var n = {};
          for (var r in e)
            n[r] = e[r];
          for (r in t)
            n[r] = t[r];
          return n
        },
        extend: function (e, t) {
          t = t || {};
          for (var n in t)
            e.hasOwnProperty(n) && (e[n] = t[n]);
          return e
        },
        stringify: function (e) {
          return e = e || "",
            JSON.stringify(e)
        },
        formatParams: function (e) {
          var t = [];
          for (var n in e)
            t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
          return t.join("&")
        },
        isNull: function (e) {
          var t = !1;
          return void 0 === e ? t = !0 : "object" != typeof e || e instanceof Array ? 0 === e.replace(/(^s*)|(s*$)/g, "").length && (t = !0) : t = this.isObjEmpty(e),
            t
        },
        isObjEmpty: function (e) {
          var t = !0;
          if ("object" == typeof e && !(e instanceof Array))
            for (var n in e) {
              t = !1;
              break
            }
          return t
        },
        isObj: function (e) {
          return "object" == typeof e && !!e
        },
        isJSONString: function (e) {
          try {
            return !!(this.isString(e) && e.indexOf("{") > -1) && (JSON.parse(e),
              !0)
          } catch (e) {
            return !1
          }
        },
        isString: function (e) {
          return "[object String]" == Object.prototype.toString.call(e)
        },
        getCookie: function (e) {
          var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
          return (t = document.cookie.match(n)) ? t[2] : null
        },
        hasIntersectByKey: function (e, t) {
          e = e || {},
            t = t || {};
          var n = {
            isExist: !1,
            paramExist: []
          };
          for (var r in e)
            if (t.hasOwnProperty(r)) {
              n.isExist = !0,
                n.paramExist.push(r);
              break
            }
          return n
        },
        isSubSetByKeys: function (e, t) {
          e = e || {},
            t = t || {};
          var n = {
            isSub: !0,
            lackParam: []
          };
          for (var r in e)
            t.hasOwnProperty(r) || (n.isSub = !1,
              n.lackParam.push(r));
          return n
        },
        firstUpperCase: function (e) {
          return e.toLowerCase().replace(/\b[a-z]/g, function (e) {
            return e.toUpperCase()
          })
        },
        compareVersion: function (e) {
          var t = -1;
          if (this.client.jdapp) {
            var n = this.client.appVersion.split(".")
              , r = e.split(".");
            if (n.length >= 3 && r.length >= 3) {
              (parseInt(n[0]) >= 10 || parseInt(r[0]) >= 10) && (n[0] = "0" + n[0],
                r[0] = "0" + r[0],
                n[0] = n[0].substr(-1, 2),
                r[0] = r[0].substr(-1, 2)),
              (parseInt(n[1]) >= 10 || parseInt(r[1]) >= 10) && (n[1] = "0" + n[1],
                r[1] = "0" + r[1],
                n[1] = n[1].substr(-1, 2),
                r[1] = r[1].substr(-1, 2)),
              (parseInt(n[2]) >= 10 || parseInt(r[2]) >= 10) && (n[2] = "0" + n[2],
                r[2] = "0" + r[2],
                n[2] = n[2].substr(-1, 2),
                r[2] = r[2].substr(-1, 2));
              t = parseInt(n[0].toString() + n[1].toString() + n[2].toString()) - parseInt(r[0].toString() + r[1].toString() + r[2].toString())
            }
          }
          return t
        }
      },
        e.Common
    }(n),
    function (e) {
      "use strict";
      var t = 0
        , n = []
        , r = []
        , i = {
        id: "63",
        key: "gzsl-isv.isvjcloud.com_1513152084",
        domain: "gzsl-isv.isvjcloud.com",
        url: "//badjs.m.jd.com/report",
        combo: 1,
        level: 2,
        delay: 1e3
      }
        , a = function (t) {
        var n = {};
        return (n = e.Common.isObj(t) ? t : {
          msg: t
        }).from || (n.from = location.href),
          n
      }
        , o = function (t, n) {
        var r = []
          , a = []
          , o = [];
        if (e.Common.isObj(t)) {
          t.key = t.key || i.key,
            t.domain = t.domain || i.domain,
            t.level = t.level || i.level;
          for (var s in t) {
            var l = t[s];
            if (l = l.toString(),
              !e.Common.isNull(l)) {
              if (e.Common.isObj(l))
                try {
                  l = e.Common.stringify(l)
                } catch (e) {
                  l = "[JSSDK_REPORT detect value stringify error] " + e.toString()
                }
              o.push(s + ":" + l),
                r.push(s + "=" + encodeURIComponent(l)),
                a.push(s + "[" + n + "]=" + encodeURIComponent(l))
            }
          }
        }
        return [a.join("&"), o.join(","), r.join("&")]
      }
        , s = function () {
        for (function () {
          var e = parseInt(i.id, 10);
          if (!e)
            return !1;
          /jd\.com$/gi.test(location.hostname) && (i.url || (i.url = "//badjs.m.jd.com/report")),
            i.report = (i.url || "/report") + "?id=" + e + "&"
        }(); n.length;) {
          var e = n.shift()
            , a = o(e, r.length);
          r.push(a[0])
        }
        if (r.length) {
          t || (t = setTimeout(function () {
            clearTimeout(t),
              function (e) {
                (new Image).src = e
              }(i.report + r.join("&") + "&count=" + r.length + "&_t=" + new Date),
              t = 0,
              r = []
          }, i.delay))
        }
      }
        , l = {
        push: function (e) {
          var t = a(e);
          return n.push(t),
            s(),
            l
        },
        report: function (e) {
          var t = a(e);
          return n.push(t),
            s(),
            l
        }
      };
      e.Report = l
    }(n),
    function (e) {
      "use strict";
      n.Common.Validator = {
        patterns: {
          email: function (e, t) {
            return /^(?:[a-z0-9]+[_\-+.]?)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(e)
          },
          mobile: function (e, t) {
            return /^1[3-9]\d{9}$/.test(e)
          },
          tel: function (e, t) {
            return /^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/.test(e)
          },
          url: function (e, t) {
            return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
          },
          digit: function (e, t) {
            return /^\d+$/.test(e)
          },
          minLength: function (e, t) {
            return e.length >= t
          },
          maxLength: function (e, t) {
            return e.length <= t
          },
          min: function (e, t) {
            return e >= t
          },
          max: function (e, t) {
            return e <= t
          },
          range: function (e, t) {
            return e >= t[0] && e <= t[1]
          },
          date: function (e, t) {
            return !/Invalid|NaN/.test(new Date(e).toString())
          },
          dateISO: function (e, t) {
            return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
          },
          number: function (e, t) {
            return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
          },
          require: function (e, t) {
            return /\S+/.test(e)
          }
        },
        isValid: function (e, t) {
          e = e || {};
          var n = {
            isMatch: !0,
            paramType: ""
          };
          for (var r in e) {
            if (!n.isMatch)
              break;
            this.patterns.hasOwnProperty(r) && (n.isMatch = this.patterns[r](t, e[r]),
              n.paramType = r)
          }
          return n
        }
      }
    }(),
    function (e) {
      "use strict";
      e.Native = {},
        e.Native
    }(n),
    function (e, n) {
      "use strict";
      e.Service = {
        corsRequest: function (e, t, r) {
          n.printMsg("corsRequest", "url=" + e + ";params=" + n.stringify(t)),
            t = t || {},
            this.Ajax({
              url: e,
              data: t,
              xhrFields: {
                withCredentials: !0
              },
              dataType: "json",
              success: function (e, t) {
                r(JSON.parse(e))
              },
              fail: function (e) {
                r(e)
              }
            })
        },
        successResponse: function (e, t, n) {
          return e = e || {},
            n = n || {},
            t({
              REQ_FLAG: !0,
              REQ_CODE: "1",
              REQ_DATA: e,
              REQ_MSG: n
            })
        },
        errorResponse: function (e) {
          return e({
            REQ_FLAG: !1,
            REQ_CODE: "3",
            REQ_DATA: {},
            REQ_MSG: "connect error"
          })
        },
        failedResponse: function (e, t) {
          return t = t || {},
            e({
              REQ_FLAG: !1,
              REQ_CODE: "2",
              REQ_DATA: {},
              REQ_MSG: t
            })
        },
        Ajax: function (e) {
          (e = e || {}).type = (e.type || "GET").toUpperCase(),
            e.dataType = e.dataType || "json";
          var r = n.formatParams(e.data)
            , i = null;
          if (i = t.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
            i.onreadystatechange = function () {
              if (4 == i.readyState) {
                var t = i.status;
                t >= 200 && t < 300 ? e.success && e.success(i.responseText, i.responseXML) : e.fail && e.fail(t)
              }
            }
            ,
            e.xhrFields)
            for (var a in e.xhrFields)
              i[a] = e.xhrFields[a];
          e.mimeType && i.overrideMimeType && i.overrideMimeType(e.mimeType),
            "GET" == e.type ? (i.open("GET", e.url + "?" + r, !0),
              i.send(null)) : "POST" == e.type && (i.open("POST", e.url, !0),
              i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
              i.send(r))
        }
      }
    }(n, n.Common),
    function (e) {
      "use strict";
      e.Schema = {
        options: {
          openAppVirtualHeader: "openapp.jdmobile://virtual?params=",
          openAppComHeader: "openapp.jdmobile://communication?params=",
          routerHeader: "router://"
        },
        getOpenAppVirtualHeader: function () {
          return this.options.openAppVirtualHeader
        },
        getOpenAppComHeader: function () {
          return this.options.openAppComHeader
        },
        getRouterHeader: function (e) {
          return this.options.routerHeader + e + "?"
        }
      },
        e.Schema
    }(n),
    function (e, n) {
      "use strict";
      e.CallApp = {
        options: {
          isAppInstalled: !1,
          downAppUrl: "//h5.m.jd.com/active/download/download.html?channel=jd-m",
          downAppUrlByWX: "http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850",
          downAppUrlByIos: "https://itunes.apple.com/us/app/jing-dong-wang-gou-shou-dan/id414245413",
          downAppUrlByIPad: "https://itunes.apple.com/cn/app/jing-dong-hd/id434374726?mt=8"
        },
        callApp: function (e) {
          n.client.jdapp ? (this.setAppInstalled(),
            t.location.href = e) : n.client.weixin ? this.isWeixinJSBridgeReady(e) : this.callAppFromBrowser(e)
        },
        isWeixinJSBridgeReady: function (e) {
          var n = this
            , r = setInterval(function () {
            t.WeixinJSBridge && (n.callAppFromWX(e),
              clearInterval(r))
          }, 100)
        },
        callAppFromWX: function (e) {
          if (this.options.isAppInstalled)
            t.location.href = e;
          else if (t.WeixinJSBridge && WeixinJSBridge.invoke) {
            var n = this;
            WeixinJSBridge.invoke("getInstallState", {
              packageName: "com.jingdong.app.mall",
              packageUrl: "openApp.jdMobile://"
            }, function (r) {
              r.err_msg.indexOf("get_install_state:yes") > -1 ? (n.options.isAppInstalled = !0,
                t.location.href = e) : t.location.href = n.getAppDownUrl()
            })
          }
        },
        callAppFromBrowser: function (e) {
          n.client.chrome ? this.callAppFromChrome(e) : this.isSafariOver9() || n.client.isIos10Chrome || n.client.isSAMSUNGN7508V ? this.callAppFromFewBrowser(e) : this.callAppFromCommonBrowser(e)
        },
        callAppFromChrome: function (e) {
          var n = Date.now()
            , r = this.getAppUrlByChrome(e);
          t.location.href = r,
            this.jumpToDownUrl(n)
        },
        callAppFromFewBrowser: function (e) {
          var t = Date.now();
          setTimeout(function () {
            var t = document.createElement("a");
            t.setAttribute("href", e),
              t.style.display = "none",
              document.body.appendChild(t);
            var n = document.createEvent("HTMLEvents");
            n.initEvent("click", !1, !1),
              t.dispatchEvent(n)
          }, 0),
            this.jumpToDownUrl(t)
        },
        callAppFromCommonBrowser: function (e) {
          var t = Date.now()
            , n = document.createElement("frame");
          n.src = e,
            n.style.display = "none",
            document.body.appendChild(n),
            setTimeout(function () {
              document.body.removeChild(n)
            }, 3e3),
            this.jumpToDownUrl(t)
        },
        jumpToDownUrl: function (e) {
          var n = this;
          n.options.isAppInstalled || setTimeout(function () {
            Date.now() - e < 2e3 && (t.location.href = n.getAppDownUrl())
          }, 1500)
        },
        isSafariOver9: function () {
          return !!(n.client.safari && n.client.safariVersion > 9)
        },
        getAppUrlByChrome: function (e) {
          return "intent://m.jd.com/#Intent;scheme=" + e + ";package=com.jingdong.app.mall;end"
        },
        getAppDownUrl: function () {
          return n.client.weixin ? this.options.downAppUrlByWX : n.client.iPad ? this.options.downAppUrlByIPad : n.client.iPhone ? this.options.downAppUrlByIos : this.options.downAppUrl
        },
        setAppInstalled: function () {
          this.options.isAppInstalled = !0
        }
      },
        e.CallApp
    }(n, n.Common),
    function (e) {
      "use strict";
      e.Module = {
        checkInputParams: function (t, n) {
          var r = t.requiredParams
            , i = t.typeParams
            , a = t.ruleParams || {}
            , o = !0;
          return e.Common.isNull(r) || (e.Common.isNull(n) ? o = !1 : this.isMatchedRequiredParams(r, n) || (o = !1)),
          e.Common.isNull(i) || e.Common.isNull(n) || this.isDiffStaticParams(i, n) || (o = !1),
          e.Common.isNull(a) || e.Common.isNull(n) || this.isMatchedByRuleParams(a, n) || (o = !1),
            o
        },
        isMatchedByRuleParams: function (t, n) {
          t = t || {},
            n = n || {};
          var r = !0
            , i = {};
          for (var a in t)
            if (n.hasOwnProperty(a) && !(i = e.Common.Validator.isValid(t[a], n[a])).isMatch) {
              e.Common.printMsg("invalid parameters", "params:" + e.Common.stringify(n) + "\nthe type of param " + a + " must be " + i.paramType),
                r = !1;
              break
            }
          return r
        },
        isMatchedRequiredParams: function (t, n) {
          var r = e.Common.isSubSetByKeys(t, n);
          return r.isSub || e.Common.printMsg("invalid parameters", "params:" + e.Common.stringify(n) + "\nlack param " + r.lackParam),
            r.isSub
        },
        isDiffStaticParams: function (t, n) {
          var r = e.Common.hasIntersectByKey(t, n);
          return r.isExist && e.Common.printMsg("invalid parameters", "params:" + e.Common.stringify(n) + "\nthe param " + r.paramExist + " can't be change"),
            !r.isExist
        },
        getConfigString: function (t, n) {
          return e.Common.stringify(this.getWholeCurrentParams(t, n))
        },
        getStandardConfigStr: function (t, n) {
          return e.Common.formatParams(this.getWholeCurrentParams(t, n))
        },
        getWholeCurrentParams: function (t, n) {
          return n = this.filterInputParams(t, n),
            e.Common.extend(this.getWholeDefaultParams(t), n)
        },
        getWholeDefaultParams: function (t) {
          var n = e.Common.mergeJson(t.typeParams, t.edgeParams);
          return e.Common.mergeJson(n, t.requiredParams)
        },
        getOpenAppVirtualHeader: function () {
          return e.Schema ? e.Schema.getOpenAppVirtualHeader() : ""
        },
        getOpenAppComHeader: function () {
          return e.Schema ? e.Schema.getOpenAppComHeader() : ""
        },
        getRouterHeader: function (t) {
          return e.Schema ? e.Schema.getRouterHeader(t) : ""
        },
        getOpenAppVirtualUrl: function (e, t) {
          return this.getOpenAppVirtualHeader() + this.getConfigString(e, t)
        },
        getOpenAppComUrl: function (e, t) {
          return this.getOpenAppComHeader() + this.getConfigString(e, t)
        },
        getRouterUrl: function (e, t, n) {
          return this.getRouterHeader(e) + this.getStandardConfigStr(t, n)
        },
        getDefaultOpenAppUrl: function (e, t) {
          return this.getOpenAppVirtualUrl(e, t)
        },
        toAppUrl: function (n) {
          e.CallApp ? e.CallApp.callApp(n) : t.location.href = n
        },
        isIOS: function () {
          return e.Common.client.ios || e.Common.client.iPhone || e.Common.client.iPad
        },
        isAndroid: function () {
          return e.Common.client.android
        },
        isJDApp: function () {
          return e.Common.client.jdapp || !1
        },
        isWKwebview: function () {
          return !(!e.Common.client.WKwebview && 1 != t._is_jdsh_wkwebview)
        },
        filterInputParams: function (e, t) {
          return t = this.parseInputParams(e, t)
        },
        parseInputParams: function (e, t) {
          if (e) {
            var n = e.ruleParams;
            if (n)
              for (var r in n)
                n[r].hasOwnProperty("url") && n[r].url && this.isIOS() && (t[r] = encodeURIComponent(t[r])),
                n[r].hasOwnProperty("digit") && n[r].digit && (t[r] = t[r].toString())
          }
          return t
        },
        callServiceFun: function (t, n, r) {
          if (this.report("callServiceFun"),
            this.checkInputParams(t, n)) {
            var i = this.getWholeCurrentParams(t, n);
            if ((i = i || {}).hasOwnProperty("requestUrl")) {
              var a = i.requestUrl;
              delete i.requestUrl,
                e.Service.corsRequest(a, i, r)
            } else
              e.Service.failedResponse(r, "lack of parameter 'requestUrl'")
          } else
            e.Service.failedResponse(r, "invalid params")
        },
        report: function (t) {
          e.Report && setTimeout(function () {
            e.Common.printMsg("module", "funName=report"),
              e.Report.push(t)
          }, 0)
        },
        doFunForPlatForm: function (e, t, n, r, i) {
          var a = t
            , o = null;
          if (e && e.versionParams && e.versionParams[t] && (o = e.versionParams[t]),
          o && (a = this.getApiNameByVersion(t, o)),
          a === t) {
            this.report(a);
            var s = null;
            e && e.optionParams && e.optionParams[t] && (s = e.optionParams[t]),
              s && !this.checkInputParams(s, n) ? this.errorCallback("param not valid", r) : i()
          } else
            e && e[a] ? e[a](n, r) : this.errorCallback("fun not found,funName:" + a, r)
        },
        doBridgeFun: function (t, n) {
          var r = n.apiName = n.apiName || "";
          if (!n.apiName)
            return e.Common.printMsg("apiName not found"),
              !1;
          n.inputParams = n.inputParams || {},
            n.inputCallback = n.inputCallback || function (e) {
              console.log(e)
            }
          ;
          var i = "android";
          this.isIOS() && (i = "ios");
          var a = null;
          if (t && t.optionParams && t.optionParams[n.apiName] && (a = t.optionParams[n.apiName]),
          a && !this.checkInputParams(a, n.inputParams))
            return this.errorCallback("param not valid", n.inputCallback),
              !1;
          if (t && t.versionParams && t.versionParams[n.apiName]) {
            var o = null;
            (o = t.versionParams[n.apiName][i] ? t.versionParams[n.apiName][i] : t.versionParams[n.apiName]) && (r = this.getApiNameByVersion(n.apiName, o))
          }
          r === n.apiName ? (this.report(r),
            n.logic ? n.logic() : this.errorCallback("params.logic not found", n.inputCallback)) : t && t[r] ? t[r](n.inputParams, n.inputCallback) : this.errorCallback("fun not found,funName:" + r, n.inputCallback)
        },
        getApiNameByVersion: function (t, n) {
          if (n && e.Common.client.jdapp)
            for (var r in n) {
              var i = r.begin || ""
                , a = r.end || ""
                , o = 1
                , s = -1;
              "" !== i && (o = common.compareVersion(i)),
              "" !== a && (s = common.compareVersion(a)),
              o >= 0 && s < 0 && (t = r)
            }
          return t
        },
        callIOSStandardBridge: function (t, n) {
          if (e.Native.IOS) {
            var r = this;
            e.Native.IOS.callBridgeFun(t, function (e) {
              r.standardCallback(e, n)
            })
          } else
            this.standardCallback({
              state: "0",
              data: "",
              msg: "JSSDK.IOS module not found!"
            }, n)
        },
        standardCallback: function (t, n) {
          if (e.Common.isObj(t))
            this._standardCallbackByJson(t, n);
          else if (e.Common.isString(t) && "" !== t)
            if (e.Common.isJSONString(t)) {
              var r = JSON.parse(t);
              this._standardCallbackByJson(r, n)
            } else
              n({
                state: "1",
                data: t,
                msg: ""
              });
          else
            n({
              state: "0",
              data: "",
              msg: "data type not support"
            })
        },
        _standardCallbackByJson: function (t, n) {
          n(t.result && e.Common.isObj(t.result) ? {
            state: t.result.state || "0",
            data: t.result.data || "",
            msg: t.result.msg || ""
          } : {
            state: t.state || "0",
            data: t.data || t,
            msg: t.msg || ""
          })
        },
        errorCallback: function (t, n) {
          e.Common.isObj(t) ? (t.state = "0",
            this._standardCallbackByJson(t, n)) : this._standardCallbackByJson({
            state: "0",
            data: "",
            msg: t
          }, n)
        },
        successCallback: function (t, n) {
          if (e.Common.isObj(t))
            t.result ? t.result.state = "1" : t.state = "1",
              this._standardCallbackByJson(t, n);
          else if (e.Common.isString(t) && "" !== t)
            if (e.Common.isJSONString(t)) {
              var r = JSON.parse(t);
              r.result ? r.result.state = "1" : r.state = "1",
                this._standardCallbackByJson(r, n)
            } else
              n({
                state: "1",
                data: t,
                msg: ""
              });
          else
            this._standardCallbackByJson({
              state: "1",
              data: t,
              msg: ""
            }, n)
        }
      }
    }(n),
    function (e, t, n) {
      "use strict";
      e.Jump = {
        optionParams: {
          category: "jump"
        },
        readOptParamsByClassName: function (e, t) {
          return e.optionParams[t + "Params"]
        },
        getWholeDefaultParams: function (e, n) {
          var r = this.readOptParamsByClassName(e, n)
            , i = this.optionParams || {};
          return r.typeParams = t.mergeJson(r.typeParams, i),
            r
        },
        getJumpToUrl: function (e, r, i) {
          return e = t.firstUpperCase(e),
            n.getDefaultOpenAppUrl(this.getWholeDefaultParams(this[e], r), i)
        },
        checkInputParams: function (e, r, i) {
          e = t.firstUpperCase(e);
          var a = this.readOptParamsByClassName(this[e], r);
          return n.checkInputParams(a, i)
        },
        jumpToPage: function (e, r, i) {
          if (this.checkInputParams(e, r, i)) {
            n.report(e + "." + r);
            var a = this.getJumpToUrl(e, r, i);
            t.printMsg("JSSDK.Native.Jump." + e + "." + r, "url:" + a),
              n.toAppUrl(a)
          }
        }
      },
        e.Jump
    }(n.Native, n.Common, n.Module),
    function (e) {
      "use strict";
      e.Login = {
        optionParams: {
          toPageFromOtherAppParams: {
            typeParams: {
              des: "ThirdPartyLogin",
              action: "to"
            },
            edgeParams: {
              sourceValue: "",
              sourceType: "",
              needlogin: "1"
            },
            requiredParams: {
              url: "",
              authlogin_returnurl: ""
            },
            ruleParams: {
              url: {
                url: !0,
                require: !0
              },
              authlogin_returnurl: {
                require: !0
              }
            }
          },
          toPageFromMParams: {
            typeParams: {
              des: "ThirdPartyLogin",
              action: "to",
              needlogin: "1"
            },
            edgeParams: {
              sourceValue: "",
              sourceType: ""
            },
            requiredParams: {
              url: "",
              authlogin_returnurl: "",
              browserlogin_fromurl: ""
            },
            ruleParams: {
              url: {
                url: !0,
                require: !0
              },
              authlogin_returnurl: {
                require: !0
              },
              browserlogin_fromurl: {
                require: !0
              }
            }
          },
          toScanPageParams: {
            typeParams: {
              des: "ScanLogin",
              action: "to",
              needlogin: "1"
            },
            edgeParams: {
              sourceValue: "",
              sourceType: ""
            },
            requiredParams: {
              key: ""
            },
            ruleParams: {
              key: {
                require: !0
              }
            }
          }
        },
        toPageFromOtherApp: function (t) {
          e.jumpToPage("Login", "toPageFromOtherApp", t)
        },
        toPageFromM: function (t) {
          e.jumpToPage("Login", "toPageFromM", t)
        },
        toScanPage: function (t) {
          e.jumpToPage("Login", "toScanPage", t)
        },
        doLogin: function (e) {
          var t = "M";
          e.From && (t = e.From),
            "M" == t ? this.toPageFromM(e) : this.toPageFromOtherApp(e)
        }
      }
    }(n.Native.Jump),
    function (e) {
      "use strict";
      e.Isv = {
        optionParams: {
          requestIsvToken: {
            typeParams: {},
            edgeParams: {
              id: ""
            },
            requiredParams: {
              url: ""
            },
            ruleParams: {
              url: {
                url: !0,
                require: !0
              }
            }
          }
        },
        versionParams: {
          requestIsvToken: {}
        },
        requestIsvToken: function (n, r) {
          var i = this;
          e.Module.doFunForPlatForm(i, "requestIsvToken", n, r, function () {
            if (t.requestIsvTokenRet = function (t) {
              (t = JSON.parse(t)).data && (document.cookie = "IsvToken=" + t.data),
                e.Module.standardCallback(t, r)
            }
              ,
              n.url = n.url || "",
              n.id = n.id || "",
              n = JSON.stringify(n),
            t.JDAppUnite && t.JDAppUnite.requestIsvToken)
              JDAppUnite.requestIsvToken(n, "requestIsvTokenRet");
            else if (e.Common.client.WKwebview) {
              var a = {
                method: "requestIsvToken",
                params: n,
                callBackName: "requestIsvTokenRet",
                callBackId: null
              };
              i.doFunForWKWebview(a)
            } else
              e.Module.standardCallback({
                state: "0",
                data: "",
                msg: "environment not support"
              }, r)
          })
        },
        isAppLogin: function (n) {
          var r = this;
          e.Module.doFunForPlatForm(r, "isAppLogin", {}, n, function () {
            if (t.isAppLoginRet = function (t) {
              e.Module.standardCallback(t, n)
            }
              ,
            t.JDAppUnite && t.JDAppUnite.isAppLogin)
              JDAppUnite.isAppLogin("isAppLoginRet");
            else if (e.Common.client.WKwebview) {
              r.doFunForWKWebview({
                method: "isAppLogin",
                params: "isAppLoginRet",
                callBackName: null,
                callBackId: null
              })
            } else
              e.Module.standardCallback({
                state: "0",
                data: "",
                msg: "environment not support"
              }, n)
          })
        },
        requestLogin: function (n) {
          var r = this;
          e.Module.doFunForPlatForm(r, "requestLogin", {}, n, function () {
            if (t.requestLoginRet = function (t) {
              e.Module.standardCallback(t, n)
            }
              ,
            t.JDAppUnite && t.JDAppUnite.requestLogin)
              JDAppUnite.requestLogin("requestLoginRet");
            else if (e.Common.client.WKwebview) {
              r.doFunForWKWebview({
                method: "requestLogin",
                params: "requestLoginRet",
                callBackName: null,
                callBackId: null
              })
            } else
              e.Module.standardCallback({
                state: "0",
                data: "",
                msg: "environment not support"
              }, n)
          })
        },
        doFunForWKWebview: function (e) {
          t.webkit && t.webkit.messageHandlers.JDAppUnite.postMessage && t.webkit.messageHandlers.JDAppUnite.postMessage(e)
        }
      }
    }(n),
    function (e) {
      "use strict";
      var t = {
        optionParams: {
          isLoginParams: {
            typeParams: {
              requestUrl: "//avatarsoa.m.jd.com/login/verifyLogin"
            },
            edgeParams: {},
            requiredParams: {}
          }
        }
      };
      t.isLogin = function (r, i) {
        var a = t.optionParams.isLoginParams.typeParams.requestUrl;
        return e.corsRequest(a, r, function (t) {
          t.hasOwnProperty("isLogin") ? t.isLogin ? e.successResponse(t, i, "hasLogin") : e.failedResponse(i, n.Common.stringify(t)) : e.errorResponse(i)
        })
      }
        ,
        e.Login = t
    }(n.Service),
    function (e) {
      "use strict";
      e.Client = {
        getOSVersion: function () {
          return this.getCommonClientValue("OSVersion")
        },
        getAppVersion: function () {
          return this.getCommonClientValue("appVersion")
        },
        getUdid: function () {
          return this.getCommonClientValue("udid")
        },
        getNetWork: function (e) {
          t.JDAppUnite && JDAppUnite.getNetWorkType ? (t.getNetWorkCallback = function (t) {
            e(t)
          }
            ,
            JDAppUnite.getNetWorkType("getNetWorkCallback")) : this.isWKwebview() ? (t.getNetWorkCallback = function (t) {
            e(t)
          }
            ,
            t.webkit.messageHandlers.JDAppUnite.postMessage({
              method: "getNetWorkType",
              params: "getNetWorkCallback",
              callBackName: null,
              callBackId: null
            })) : e(this.getCommonClientValue("network"))
        },
        isWKWebview: function () {
          return this.getCommonClientValue("WKwebview")
        },
        isIOS: function () {
          return this.getCommonClientValue("ios")
        },
        isAndroid: function () {
          return this.getCommonClientValue("android")
        },
        isWeixin: function () {
          return this.getCommonClientValue("weixin")
        },
        isQQ: function () {
          return this.getCommonClientValue("qq")
        },
        isIPhone: function () {
          return this.getCommonClientValue("iPhone")
        },
        isIPad: function () {
          return this.getCommonClientValue("iPad")
        },
        isTrident: function () {
          return this.getCommonClientValue("trident")
        },
        isPresto: function () {
          return this.getCommonClientValue("presto")
        },
        isWebKit: function () {
          return this.getCommonClientValue("webKit")
        },
        isGecko: function () {
          return this.getCommonClientValue("gecko")
        },
        isJDApp: function () {
          return this.getCommonClientValue("jdapp")
        },
        isWKwebview: function () {
          return !(!this.getCommonClientValue("WKwebview") && 1 != t._is_jdsh_wkwebview)
        },
        getCommonClientValue: function (t) {
          return e.Common.client[t]
        }
      }
    }(n),
    function (e, n) {
      "use strict";
      e.WebView = {
        params: {
          resetConfigBtnParams: {
            typeParams: {
              clear_js: {
                type: "clear_js",
                display: "show",
                position: "inside",
                title: "",
                icon: "",
                jump: ""
              }
            },
            edgeParams: {},
            requiredParams: {}
          },
          configAllBtnParams: {
            typeParams: {},
            edgeParams: {
              homepage: {
                type: "homepage",
                display: "hide",
                position: "inside",
                title: "",
                icon: "",
                jump: ""
              },
              calendar: {
                type: "calendar",
                display: "hide",
                position: "inside",
                title: "",
                icon: "",
                jump: ""
              },
              search: {
                type: "search",
                display: "hide",
                position: "inside",
                title: "",
                icon: "",
                jump: ""
              },
              message: {
                type: "message",
                display: "hide",
                position: "inside",
                title: "",
                icon: "",
                jump: ""
              },
              cart: {
                type: "cart",
                display: "hide",
                position: "inside",
                title: "",
                icon: "",
                jump: ""
              }
            },
            requiredParams: {}
          },
          configCartBtnParams: {
            typeParams: {
              type: "cart",
              icon: "",
              title: "",
              jump: ""
            },
            edgeParams: {
              display: "show",
              position: "inside"
            },
            requiredParams: {}
          },
          configSearchBtnParams: {
            typeParams: {
              type: "search",
              icon: "",
              title: "",
              jump: ""
            },
            edgeParams: {
              display: "show",
              position: "inside"
            },
            requiredParams: {}
          },
          configCustomBtnParams: {
            typeParams: {
              type: "custom"
            },
            edgeParams: {
              display: "show",
              position: "inside",
              icon: "",
              title: "",
              jump: ""
            },
            requiredParams: {}
          },
          callIosSharePanelParams: {
            typeParams: {
              category: "jump",
              des: "share",
              type: "111",
              shareActionType: "P"
            },
            edgeParams: {
              imageUrl: "",
              iconUrl: "",
              channel: "",
              isCallBack: "N",
              callfunc: null,
              timeline_title: "",
              incentiveBizType: "",
              incentiveBizId: ""
            },
            requiredParams: {
              title: "",
              content: "",
              shareUrl: ""
            },
            ruleParams: {
              title: {
                require: !0
              },
              content: {
                require: !0
              },
              shareUrl: {
                url: !0,
                require: !0
              }
            }
          },
          callAndroidSharePanelParams: {
            typeParams: {
              shareActionType: "P"
            },
            edgeParams: {
              imageUrl: "",
              iconUrl: "",
              channel: "",
              callback: "N",
              callfunc: null,
              eventId: "",
              timeline_title: "",
              incentiveBizType: "",
              incentiveBizId: ""
            },
            requiredParams: {
              title: "",
              content: "",
              shareUrl: ""
            },
            ruleParams: {
              title: {
                require: !0
              },
              content: {
                require: !0
              },
              shareUrl: {
                url: !0,
                require: !0
              }
            }
          },
          callIosHeaderSharePanelParams: {
            typeParams: {
              category: "jump",
              des: "share",
              type: "111",
              shareActionType: "S"
            },
            edgeParams: {
              imageUrl: "",
              iconUrl: "",
              channel: "",
              isCallBack: "N",
              callfunc: null
            },
            requiredParams: {
              title: "",
              content: "",
              shareUrl: ""
            },
            ruleParams: {
              title: {
                require: !0
              },
              content: {
                require: !0
              },
              shareUrl: {
                url: !0,
                require: !0
              }
            }
          },
          callAndroidHeaderSharePanelParams: {
            typeParams: {
              shareActionType: "S"
            },
            edgeParams: {
              imageUrl: "",
              iconUrl: "",
              channel: "",
              callback: "N",
              eventId: "",
              callfunc: null
            },
            requiredParams: {
              title: "",
              content: "",
              shareUrl: ""
            },
            ruleParams: {
              title: {
                require: !0
              },
              content: {
                require: !0
              },
              shareUrl: {
                url: !0,
                require: !0
              }
            }
          },
          callIosDirectlyShareParams: {
            typeParams: {
              category: "jump",
              des: "share",
              type: "111",
              shareActionType: "O"
            },
            edgeParams: {
              imageUrl: "",
              iconUrl: "",
              channel: "",
              isCallBack: "N",
              callfunc: null
            },
            requiredParams: {
              title: "",
              content: "",
              shareUrl: ""
            },
            ruleParams: {
              title: {
                require: !0
              },
              content: {
                require: !0
              },
              shareUrl: {
                url: !0,
                require: !0
              }
            }
          },
          callAndroidDirectlyShareParams: {
            typeParams: {
              shareActionType: "O"
            },
            edgeParams: {
              imageUrl: "",
              iconUrl: "",
              channel: "",
              callback: "N",
              eventId: "",
              callfunc: null
            },
            requiredParams: {
              title: "",
              content: "",
              shareUrl: ""
            },
            ruleParams: {
              title: {
                require: !0
              },
              content: {
                require: !0
              },
              shareUrl: {
                url: !0,
                require: !0
              }
            }
          },
          setMsgRedDotByIosParams: {
            typeParams: {
              action: "sh_showMsgRedDot"
            },
            edgeParams: {},
            requiredParams: {}
          },
          setMsgRedDotByAndroidParams: {
            typeParams: {},
            edgeParams: {
              isShow: "Y"
            },
            requiredParams: {}
          },
          setIosCartParams: {
            typeParams: {},
            edgeParams: {
              action: "sh_showCart"
            },
            requiredParams: {}
          },
          setAndroidCartParams: {
            typeParams: {},
            edgeParams: {
              isShow: "Y"
            },
            requiredParams: {}
          }
        },
        webViewEnable: function () {
          return !!t.MobileNavi
        },
        configBtn: function (r, i) {
          if (n.checkInputParams(r, i)) {
            var a = n.getConfigString(r, i);
            e.Common.printMsg("webview", "_configStr:" + a),
            t.MobileNavi && MobileNavi.configBtn && MobileNavi.configBtn(a)
          }
        },
        configBtn610: function (r, i) {
          if (n.checkInputParams(r, i)) {
            var a = n.getConfigString(r, i);
            if (e.Common.printMsg("webview", "_configStr:" + a),
            t.MobileNavi && MobileNavi.configBtnSince610)
              MobileNavi.configBtnSince610(a);
            else if (e.Common.client.WKwebview) {
              var o = {
                method: "configBtnSince610",
                params: a
              };
              t.webkit && t.webkit.messageHandlers.MobileNavi.postMessage && t.webkit.messageHandlers.MobileNavi.postMessage(o)
            }
          }
        },
        hideAllBtn: function (e) {
          this.configBtn610(this.params.resetConfigBtnParams, e),
            this.configBtn610(this.params.configAllBtnParams, e),
            n.report("hideAllbtn")
        },
        resetConfigBtn: function (e) {
          this.configBtn610(this.params.resetConfigBtnParams, e),
            n.report("resetConfigBtn")
        },
        configCustomBtn: function (e) {
          this.configBtn(this.params.configCustomBtnParams, e)
        },
        configCartBtn: function (e) {
          this.configBtn(this.params.configCartBtnParams, e)
        },
        configSearchBtn: function (e) {
          this.configBtn(this.params.configSearchBtnParams, e)
        },
        setSearchBtnShowOutside: function () {
          this.configSearchBtn({
            display: "show",
            position: "outside"
          }),
            n.report("setSearchBtnShowOutside")
        },
        setSearchBtnShowInside: function () {
          this.configSearchBtn({
            display: "show",
            position: "inside"
          }),
            n.report("setSearchBtnShowInside")
        },
        setCartBtnShowOutside: function () {
          this.configCartBtn({
            display: "show",
            position: "outside"
          }),
            n.report("setCartBtnShowOutside")
        },
        setCartBtnShowInside: function () {
          this.configCartBtn({
            display: "show",
            position: "inside"
          }),
            n.report("setCartBtnShowInside")
        },
        setCustomBtnShowOutside: function (e) {
          e.display = "show",
            e.position = "outside",
            this.configCustomBtn(e),
            n.report("setCustomBtnShowOutside")
        },
        setCustomBtnShowInside: function (e) {
          e.display = "show",
            e.position = "inside",
            this.configCustomBtn(e),
            n.report("setCustomBtnShowInside")
        },
        refreshCart: function () {
          e.Common.client.iPhone ? this.setIosCart({
            action: "sh_refreshCart"
          }) : e.Common.client.android && this.refreshAndroidCart(),
            n.report("refreshCart")
        },
        setCart: function (t) {
          e.Common.client.iPhone ? "show" == t ? this.setIosCart({
            action: "sh_showCart"
          }) : "hide" == t ? this.setIosCart({
            action: "sh_hideCart"
          }) : "refresh" == t && this.setIosCart({
            action: "sh_refreshCart"
          }) : e.Common.client.android && ("show" == t ? this.setAndroidCart({
            isShow: "Y"
          }) : "hide" == t ? this.setAndroidCart({
            isShow: "N"
          }) : "refresh" == t && this.refreshAndroidCart())
        },
        setPicTitleShow: function (e) {
          this.setPicTitle("show", e)
        },
        setPicTitleHide: function () {
          this.setPicTitle("hide", "")
        },
        checkInputParams: function (t, n) {
          var r = t.requiredParams
            , i = t.typeParams
            , a = !0;
          return e.Common.isNull(r) || (e.Common.isNull(n) ? a = !1 : this.isMatchedRequiredParams(r, n) || (a = !1)),
          e.Common.isNull(i) || e.Common.isNull(n) || this.isDiffStaticParams(i, n) || (a = !1),
            a
        },
        isMatchedRequiredParams: function (t, n) {
          return e.Common.isSubSetByKeys(t, n)
        },
        isDiffStaticParams: function (t, n) {
          return !e.Common.hasIntersectByKey(t, n)
        },
        getConfigString: function (t, n) {
          return e.Common.stringify(this.getWholeCurrentParams(t, n))
        },
        getWholeCurrentParams: function (t, n) {
          return e.Common.extend(this.getWholeDefaultParams(t), n)
        },
        getWholeDefaultParams: function (t) {
          var n = e.Common.mergeJson(t.typeParams, t.edgeParams);
          return e.Common.mergeJson(n, t.requiredParams)
        },
        setIosCart: function (t) {
          if (n.checkInputParams(this.params.setIosCartParams, t)) {
            var r = n.getConfigString(this.params.setIosCartParams, t);
            e.Common.printMsg("webview", "setIosCart:" + r),
              location.href = n.getOpenAppComHeader() + r
          }
        },
        setAndroidCart: function (r) {
          if (n.checkInputParams(this.params.setAndroidCartParams, r)) {
            var i = n.getConfigString(this.params.setAndroidCartParams, r);
            e.Common.printMsg("webview", "setAndroidCart:" + i),
            t.AndroidNavi && AndroidNavi.setCart && AndroidNavi.setCart(i)
          }
        },
        refreshAndroidCart: function () {
          AndroidNavi && AndroidNavi.refreshCart && AndroidNavi.refreshCart()
        },
        setPicTitle: function (t, r) {
          e.Common.client.iPhone ? this.setIOSPicTitle(t, r) : e.Common.client.android && this.setAndroidPicTitle(t, r),
            n.report("setPicTitle" + t)
        },
        setAndroidPicTitle: function (t, n) {
          var r = "N";
          if ("show" == t ? r = "Y" : "hide" == t && (r = "N"),
          AndroidNavi && AndroidNavi.setTitle) {
            var i = e.Common.stringify({
              isShow: r,
              imageUrl: n
            });
            e.Common.printMsg("webview", "AndroidNavi: configStr:" + i),
              AndroidNavi.setTitle(i)
          }
        },
        setIOSPicTitle: function (t, r) {
          var i = "show" == t ? "sh_showImgTitle" : "sh_hideImgTitle"
            , a = e.Common.stringify({
            action: i,
            imageUrl: encodeURI(r)
          });
          location.href = n.getOpenAppComHeader() + a
        },
        shareCallBack: function (n, r) {
          "function" == typeof r.callfunc && (e.Common.client.iPhone ? n.edgeParams.isCallBack = "Y" : e.Common.client.android && (n.edgeParams.callback = "Y"),
              t.jdappShareRes = function (e) {
                r.callfunc(e)
              }
          )
        },
        callSharePanel: function (t) {
          e.Common.client.iPhone ? this.callIosSharePanel(t) : e.Common.client.android && this.callAndroidSharePanel(t),
            n.report("callSharePanel")
        },
        callIosSharePanel: function (t) {
          if (n.checkInputParams(this.params.callIosSharePanelParams, t)) {
            this.shareCallBack(this.params.callIosSharePanelParams, t);
            var r = n.getConfigString(this.params.callIosSharePanelParams, t);
            e.Common.printMsg("webview", "callIosSharePanel:" + r),
              location.href = n.getOpenAppVirtualHeader() + r
          }
        },
        callAndroidSharePanel: function (r) {
          if (n.checkInputParams(this.params.callAndroidSharePanelParams, r)) {
            this.shareCallBack(this.params.callAndroidSharePanelParams, r);
            var i = n.getConfigString(this.params.callAndroidSharePanelParams, r);
            e.Common.printMsg("webview", "callAndroidSharePanel:" + i),
              t.shareHelper && shareHelper.initShare ? shareHelper.initShare(i) : shareHelper && shareHelper.sendShare && shareHelper.sendShare(r.title, r.content, r.shareUrl, r.iconUrl, "Wxfriends", "Y")
          }
        },
        callHeaderSharePanel: function (t) {
          e.Common.client.iPhone ? this.callIosHeaderSharePanel(t) : e.Common.client.android && this.callAndroidHeaderSharePanel(t),
            n.report("callHeaderSharePanel")
        },
        callIosHeaderSharePanel: function (t) {
          if (n.checkInputParams(this.params.callIosHeaderSharePanelParams, t)) {
            this.shareCallBack(this.params.callIosHeaderSharePanelParams, t);
            var r = n.getConfigString(this.params.callIosHeaderSharePanelParams, t);
            e.Common.printMsg("webview", "callIosHeaderSharePanel:" + r),
              location.href = n.getOpenAppVirtualHeader() + r
          }
        },
        callAndroidHeaderSharePanel: function (r) {
          if (n.checkInputParams(this.params.callAndroidHeaderSharePanelParams, r)) {
            this.shareCallBack(this.params.callAndroidHeaderSharePanelParams, r);
            var i = n.getConfigString(this.params.callAndroidHeaderSharePanelParams, r);
            e.Common.printMsg("webview", "callAndroidSharePanel:" + i),
            t.shareHelper && shareHelper.initShare && shareHelper.initShare(i)
          }
        },
        callDirectlyShare: function (t) {
          e.Common.client.iPhone ? this.callIosDirectlyShare(t) : e.Common.client.android && this.callAndroidDirectlyShare(t),
            n.report("callDirectlyShare")
        },
        callIosDirectlyShare: function (t) {
          if (n.checkInputParams(this.params.callIosDirectlyShareParams, t)) {
            this.shareCallBack(this.params.callIosDirectlyShareParams, t);
            var r = n.getConfigString(this.params.callIosDirectlyShareParams, t);
            e.Common.printMsg("webview", "callIosDirectlyShare:" + r),
              location.href = n.getOpenAppVirtualHeader() + r
          }
        },
        callAndroidDirectlyShare: function (r) {
          if (n.checkInputParams(this.params.callAndroidDirectlyShareParams, r)) {
            this.shareCallBack(this.params.callAndroidDirectlyShareParams, r);
            var i = n.getConfigString(this.params.callAndroidDirectlyShareParams, r);
            e.Common.printMsg("webview", "callAndroidDirectlyShare:" + i),
            t.shareHelper && shareHelper.initShare && shareHelper.initShare(i)
          }
        },
        setMsgRedDot: function (t) {
          e.Common.client.iPhone ? this.setMsgRedDotByIos(t) : e.Common.client.android && this.setMsgRedDotByAndroid(t)
        },
        setMsgRedDotByIos: function (t) {
          if (n.checkInputParams(this.params.setMsgRedDotByIosParams, t)) {
            var r = n.getConfigString(this.params.setMsgRedDotByIosParams, t);
            e.Common.printMsg("webview", "setMsgRedDotByIos:" + r),
              location.href = n.getOpenAppComHeader() + r
          }
        },
        setMsgRedDotByAndroid: function (r) {
          if (n.checkInputParams(this.params.setMsgRedDotByAndroidParams, r)) {
            var i = n.getConfigString(this.params.setMsgRedDotByAndroidParams, r);
            e.Common.printMsg("webview", "setMsgRedDotByAndroid:" + i),
            t.AndroidNavi && AndroidNavi.setMsgRedDot && AndroidNavi.setMsgRedDot(i)
          }
        },
        setTitleText: function (r) {
          n.isJDApp() && ("[object String]" === Object.prototype.toString.call(r) ? (e.Common.client.WKwebview ? t.webkit.messageHandlers.MobileNavi.postMessage({
            method: "setTitle",
            params: r,
            callBackName: null,
            callBackId: null
          }) : t.MobileNavi && MobileNavi.setTitle && MobileNavi.setTitle(r),
            n.report("setTitleText")) : e.Common.printMsg("webview", "setTitleText environment not support"))
        },
        showCloseBtn: function () {
          n.isJDApp() && (e.Common.client.WKwebview ? t.webkit.messageHandlers.MobileNavi.postMessage({
            method: "showCloseBtn"
          }) : t.MobileNavi && MobileNavi.showCloseBtn && MobileNavi.showCloseBtn(),
            n.report("showCloseBtn"))
        },
        closeActiveWebview: function () {
          n.isJDApp() && (e.Common.client.android ? t.JdAndroid && JdAndroid.finishWebActivity ? JdAndroid.finishWebActivity() : e.Common.printMsg("not support!") : e.Common.client.iPhone && (t.location.href = "closeJDApp://webview"),
            n.report("closeActiveWebview"))
        }
      }
    }(n, n.Module),
    function (e) {
      "use strict";
      e.Login = {
        toPageFromOtherApp: function (t) {
          e.Native.Jump.Login.toPageFromOtherApp(t)
        },
        toPageFromM: function (t) {
          e.Native.Jump.Login.toPageFromM(t)
        },
        isLogin: function (t, n) {
          t = t || {},
            e.Service.Login.isLogin(t, n)
        },
        doLogin: function (t) {
          e.Native.Jump.Login.doLogin(t)
        }
      }
    }(n),
    n
});
