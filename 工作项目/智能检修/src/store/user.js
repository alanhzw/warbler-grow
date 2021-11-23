export default {
  namespaced: true,
  state: () => ({
    info: {},
    token: '',
    // 总公司
    // info: {
    //   userId: "10000L66",
    //   transferToUserId: "",
    //   userName: "74921",
    //   realName: "王淼",
    //   phoneNumer: "",
    //   orgName: "分公司",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "F0",
    //   avatar: "",
    //   orgCode: "1",
    //   roleCode: "znjx_104",
    //   roleName: "总公司_质量员"
    // },
    // token:
    //   "Sp8fLOCF1osix2NkkXt1tLeZ0JdFrunCB6aFvxLrHNS2AtoK_2PNjbzCLcx7_g2bz3uoxuOdsnKcmlmBQGRWCCz8L30oiptaEyn6v1JV2wUoJIj3zNgZATqe6teVDIYTEFYgp3vAvWSBRKRGNqtYbdzgH8SnCW4jxFW4IUmR_B9-F34o6E4HB_TYhBAQTlYXPrS_UHREAyuGHKzxg-jfjIM8jWrfI8PsmDvl_7jrtosDDPn0T80Nvr0UlF-Q9_Na-HVY4PumWSNKhJULUlHOHhTuvbTKcRjFl_z-F4c2Xv3IWozjK7p_TZMN5naEuqd3ses1n9Ro9ksZyOAE3zfO_YQUEZaHa9LpDV7d-fQJWlc",

    // 分公司
    // info: {
    //   userId: "10000L7K",
    //   transferToUserId: "",
    //   userName: "74945",
    //   realName: "张显辉",
    //   phoneNumer: "",
    //   orgName: "三分",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "F1",
    //   avatar: "",
    //   orgCode: "153",
    //   roleCode: "znjx_201",
    //   roleName: "分公司管理员"
    // },
    // token:
    //   "eB2qtQ6s3LM1KOIAOu4o5X3WzJ9ywVZTiPWs8qq0AF5FAS80xysFrJWB8EWqB-GGsNty68K4KqHD83FDhiFKGydarfHQ6cOquViJ6TlrP7tEzM7ttya4_GHcVKie2vwJilbJwP_0AbSAhuR2vVDUncrwnQW8f4NrJwZ4xsy0DzJLWRaXd8m6yvV0A4ZzYkeEATnzEGLF6240bz7GtUWD0VIksORjaC9Au4xsZNdgX2w7C3xW8p607dOXKNT0w4PPu15-v-2vLTVeKFK4nGATNvR_275jHug0_Mrefjvoz1lcY-0LkFmGSFP4t7FiN3mDEYVWgwduecID-P3ZUk4PI5lqREmSNAolk0ZNMYvuBRA",

    //车间厂队
    // info: {
    //   userId: "10000L6A",
    //   transferToUserId: "",
    //   userName: "34530",
    //   realName: "王江华",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧设备检修队",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "F2",
    //   avatar: "",
    //   orgCode: "15348",
    //   roleCode: "znjx_301",
    //   roleName: "车间厂队管理员"
    // },
    // token:
    //   "LxCuurTNRzbfy0WILdKIK-K6zickAVDHM9o8T02g1JYq2dekLac91t3sLXpZWYsx3B5dc5lKIklPUaUTFgf-xPU1Q7wNvt6sD56D4mBy4F8EpJMYCDReS2_QQbA5J5sxs7QgP29fBRwGDDj7IYaUb06-OU_qxriZIYE2Wwf01KXNTUVjFoTmdyoNDI0zxQ0W4ToBFY9hMriLMZJMDTvOaGGgKh0-tr7saKN1ZNDNMM18AwksteO-xq2C1kBZj_e_SWrRdzQSo1a2px4OeashYDgWulmDNOldY_WL9Wx75tW6rQecxCK3Acql-jPSX13ant6nnEhs1xmBg7GnSB-IXW8dNmGaBz7UvSNEn8WIfxNukVGpvzBscrEk83Ek4rgZ_NipzaZNfjAMItsYQO_d2w",


    // 移动端作业长001
    // info: {
    //   userId: "100062P0",
    //   transferToUserId: "",
    //   userName: "74594",
    //   realName: "陈鸣",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "1",
    //   avatar: "",
    //   orgCode: "1534801",
    //   roleCode: "znjx_402",
    //   roleName: "作业区_工单创建员"
    // },
    // token:
    //   "W1vHu73oFPqMKCc-c9cmRohspzGT8JaRxo6maO6O8GgEHqviB1k44gt8DLZQ77nim6Ed2AukW-KGuUQ6V_PZOZRemenjzWrf-ON3kNI7DCk9GV3Dqn1zymCN85jQUqVLv0XB8-ZgjzrSpH-swAtH4N7mujYhlxqhUR9eVp9Pj3tch2dlZkWS__NCbF21hY1IUk6beQjp2e10st9nw-bqqAQ1PlMxVFRzrEdo7KQlvoLTbfT1kJTjxPRJvWKBPmVTx1R1L10tU5SDusrEOvaWaZxx3kzzzsH_9_MM_6cZRJYGaJiiqH4TSbvyJrFmt8AwZzkNy5TuCA07Gv2KADUIH2KPdefyPLTcYuyNIz64p2-1Y96IbCNLYrLp4jO9SSI2tn3sxSrhZt8yJIQ7Dq-15g",

    // 移动端班组长(多角色)
    // info: {
    //   userId: "100062P0",
    //   transferToUserId: "",
    //   userName: "74594",
    //   realName: "陈鸣",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "2",
    //   avatar: "",
    //   orgCode: "1534801",
    //   roleCode: "znjx_501",
    //   roleName: "班组组长"
    // },
    // token:
    //   "v7edEbotb_6f_liVC8fr8eaa7mzSOl0ELiZ3CAReYdKdavkIXByAjbqJcWD-CGGLCZeYTBo1D7rand1SMU4PDs8dI8y6ewQDFWc1dsgcrc1kWOvy5PQ_5KtlbHzJ7rTxGLIln5RcgqM-4SyNczLqIkv-SR7Xgr-VaMrfadUq50u9C0sCha5FY30Ot2G8m0SK-RJutG6GYiIixCM4CRbcxvOJunXaLFrDutBZ7M97Eca7sKWa_2JdTfTtkyXPa2Wu-3IZLKUn2nslmg3x9NrLYEW5KTZRTgdaUEk5uhYW0wWvc_IIMStzRaCNcw0TppZYGmJbS_8sf_Wid-r-wMBNEOO_gYofdKjpkP4UyySRagGtTQvwGwMhARkToh8HBOd8",

    //移动端班组长001
    // info: {
    //   userId: "10000MO4",
    //   transferToUserId: "",
    //   userName: "71824",
    //   realName: "张军",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区_一班",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "2",
    //   avatar: "",
    //   orgCode: "153480101",
    //   roleCode: "znjx_501",
    //   roleName: "班组组长001"
    // },
    // token:
    //   "zLJb3q26JTuT0XaLop2eNSAJX-rf0Ti2gqEAGfrrFy3bUWRFPwqF9gh5obgI5ZYsjkvPrePqu-0t6OdIWbPBJ9sTwTlPPg3yGoJS1Cr5yjC8JN0zOO8Qk1b-OKknrzwd0XzxHycqMKwHmRwEKlj-AcYx_X25Bhw0ApzSyOD7e2AtLo0tLPjE7tPvgsOj_sBJ3iUQF2yQQEMzuQufzpdYl3Cv850CQXn1ucjJdzbVFoAlCrponkRdNBNDljp1_4Rhc5cbO3eoeql2gdu4MSJukw6PeQEI0LjjoXWSN9X5_pScto6GYG1fpwifFi97zBhbxUj82Wieosn__IxlamgHVbi4pAZ4PowU3uoeEMb_rrdj_AASEl2UrhBD_rUMd20kwYO5cjxibw0ZgmO48d19LQ",

    //移动端班组长002
    // info: {
    //   userId: "10000MU7",
    //   transferToUserId: "",
    //   userName: "72099",
    //   realName: "张淑蓉",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区_二班",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "2",
    //   avatar: "",
    //   orgCode: "153480102",
    //   roleCode: "znjx_501",
    //   roleName: "班组组长002"
    // },
    // token:
    //   "Fpj0-WnOlcb533f6071myKagyJIqPaMEvyB8H1D3weBh0B15ma2H-Fv-n4LoY1cOYvT4TLCZ-7Z_mpRrzcgNrIn5by8Fhn7frO1o1Giepehg56qYCL3iBbpWPZONQBkbS423yqYgmCF15h5OWwHC3THObTQjAR2jvYYDo3RO7rsDBd9ZdTpQvzGkBE280r7KtLdL653kJUrt1OgS6_TjmEimIcPlE-zFG3e5eLZk8r_lqnhWNPxvILdVSNtiDVuSYBW9Inn5nzR0XvZaSvVIBFoOgfo0RDLt4-xPfX2Fiyf2opH0njFfAONbVbPCcZ0UNua5zWbPS_LH2h7pv8YRx-e5_TV-uZecNr8R0qf3yqdhIRSjKVAsrMqAgw45X78yEXqQBCGwcNaGvim8cGPpOQ",

    //移动端班长003
    // info: {
    //   userId: "10000SSW",
    //   transferToUserId: "",
    //   userName: "924339",
    //   realName: "袁贤成",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区_一班",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "2",
    //   avatar: "",
    //   orgCode: "153480101",
    //   roleCode: "znjx_501",
    //   roleName: "班组组长"
    // },
    // token:
    //   "hJzKaXIk5h4WXYqxD5mwC_DCa5RhFVTgfNT6Aw4Hc-GA2gDeg96yZ_6RiRoU0A-1YC3l7fQuO6LwAECS3ctykQtC-MC9zCE7ZnladUAIKC7eT7FQu2fN_t4aqVc3ANeYYLqsGMnX4hP3tLiemht7hkvqR7ag9RlG-Xgx46kRvb3Tc5--ZKXNY8XQTMzqHsptHCmiVgc_mMnGnrw4zoCAvv-9K_-7FvYJMBxm7hNSwVTQKeMUBP868E4KvG_eBnlAeHnU0RZu4gTSzQm8tKkSA3YQFsfclcsCZPXzEV_EGI2cAeqZUzNEd2MuDFDz_eq0sGc8obcNFDJ0EuTvaIwrM5sWx_zgesjydbAtq2FYyUDHjTpHpRxOmygJs2R340wDq1ZKsWrb-xv-XStqZe0k8A",

    // //移动端组员001
    // info: {
    //   userId: "10000SSW",
    //   transferToUserId: "",
    //   userName: "924339",
    //   realName: "袁贤成",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区_一班",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "3",
    //   avatar: "",
    //   orgCode: "153480101",
    //   roleCode: "znjx_502",
    //   roleName: "班组组员001"
    // },
    // token:
    //   "gm-PKlRRvXWXQlu_BdqdXXCZzScKEY1ViAEza-P8aKFO60JaptR8dCGkV6sPO8WnpHzXYSd2hZ_v9pzUGVGajKTZUMFrrx8-aPq_fzP4VvJPHeECO1-XumWprUmi66Jxjyu1g8i0e_ZhEnef7CFmsKacKMGwtnsOwTXYMt3BPn_AR_WC9DJS9t8OrU28kcyZlNTON0-qd9wHhdfcJs0-ybSQJ2yQTtAWxrvHLmHWk4g8DterEta6TYu24ak8B20wNe1ee37Xy1MdZAfn2db496PbNPW5tojPJgwoq-Be_1ny95qTGLuzSmr1o-m7ggzxXiJiQiCcZYvAcAv3MRFOKcGc94N58zbKqGrZE4QQ6dgwENBkAlSktg5iXcP90bqO1RizC7i0V57SmL3EC5bdxw",

    //移动端组员001  (多部门)
    // info: {
    //   userId: "10000SSW",
    //   transferToUserId: "",
    //   userName: "924339",
    //   realName: "袁贤成",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区_二班",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "3",
    //   avatar: "",
    //   orgCode: "153480102",
    //   roleCode: "znjx_502",
    //   roleName: "班组组员001"
    // },
    // token:
    //   "SoM4cwzSaJjSQqoA2TND5Mvo0m1hDG__1Zz4BeURLAyEJ3ol3SeqIdeaC4eoG3-rv2E8HeuN9f2a45QY2f5Wakr7FDJu2ftYp_X4zN2ag4pGenhoRlcUjRk1DaGkL14ExFfhBICjwJ4e5BLhA-Cms9utfRdprohMubUtDESoTrIpTbIYqY7D0p0r3tSd0wbPExEBhTZBFFc76ie86CSlyTH42WpOCmzcSZd4hS83ywLeeFcDkz39lVah94_TI3mB4z1tqPKh9bIqjgqMRXxSQUpv6wIKoIYRfcZhsXINgRZd0_op_SUMBNGfp1rKWwgBBCxH2_DM2OY3-1tXsEVZw_wh0Le-3QDL09H1W2gzKUntQqgJZrDumDyveRLg9slB0TAy2yAzqwWgkunl9C9axQ",

    //移动端组员002
    // info: {
    //   userId: "10000LSV",
    //   transferToUserId: "",
    //   userName: "931462",
    //   realName: "朱琮",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区_一班",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "3",
    //   avatar: "",
    //   orgCode: "153480101",
    //   roleCode: "znjx_502",
    //   roleName: "班组组员002"
    // },
    // token:
    //   "BxwP-SdD2QsZNPmqd7MT8uBZGaaSPB3v5sQlDFeRH0tPjgsktpzaM887vhe30FwVtJg3daCCbaor4JiDjadve91XAcw3HXqvjugaOY2Lq6t_PPnjw2Lg_eVLxe7kdUGhbAd4uDmcDYTkxb0-WDknhmWXa_eZ2RjAR2YwsVEW-Buw6K6Hm0N9aeJAUgn4rdxNxDJLcYuO0pkmIetvlgEihWqZKFcEQ950VxJ4b5ktZPTzdu-fdY_-SILEeCMtGXjgGFib8RUqKZZ-NrIufK2L-R9fTlDJWvaeRvinI0_JlPVq4yWtCsJYOojiEe69XZ-xndYvN_pw62A9PDM62drHVkN-9KFfEuCDAfgOaJHOy5rooa2fXNZh2Thh49tzr0tUd6VzIa6gH7Te_TnuZD2P6Q",

    //移动端组员003
    // info: {
    //   userId: "10000R4U",
    //   transferToUserId: "",
    //   userName: "983369",
    //   realName: "陈华荣",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区_二班",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "3",
    //   avatar: "",
    //   orgCode: "153480102",
    //   roleCode: "znjx_502",
    //   roleName: "班组组员003"
    // },
    // token:
    //   "WN-KOj__jT1rV8E7HG8z9SipzzB6p4unU1ry3PfWPaKIOaOT5UByOfUvBeamBEIzPdDRgvcLhckNP-iTGbPSLrqLiRUbANPECGIlCRKnJDy1b937Wl5wGFAu9PXo9qm_YQQ2Nr_8K2uT9xCuWtFnHzcNqOpVp5e-hClC4MDW3sHTOw_ihGlV9C2LO04sQb8km5RClidRtv2rXdoyTx25VTZSL1HhiXZ8PDhA4CZ0_IiFa7G93GPrzu9sD2kbhFUyQ4K08uKJQPg4CLwhbA7hqzmhWMkmREufY6-mojRJeBc87sDkVueq8svlEt6mn5J1QLig79_jrnuuUn5L5Om1fvcaNJWkhoSo4syR9vWdYkwm6Fvy0j6jK2yVCkArz5SHKC45v5cxEFVHRhi4k0wsfA",

    //移动端组员004
    // info: {
    //   userId: "100011JA",
    //   transferToUserId: "",
    //   userName: "943873",
    //   realName: "刘飞",
    //   phoneNumer: "",
    //   orgName: "三分_冷轧_一区_二班",
    //   workTypeName: "",
    //   multiDepart: "1",
    //   userType: "3",
    //   avatar: "",
    //   orgCode: "153480102",
    //   roleCode: "znjx_502",
    //   roleName: "班组组员004"
    // },
    // token:
    //   "mSDplljoPwu6XvnNmwAH8Pdg1opyEketzKFNB1rgCKNgR1xHBb3d4pO52xC-JollqXn_LYwqbbyE28WM5bM91bj9L7McPwZHZKHF7Ehz58OVPL1mQO9hQux1k35QfsTWnjIs7aiVZ_mKJGcsJwHh-gwFxeWdzCnQgAjR3CkelBk-UBTcfcmu5kjOVXvFVbBnJ44Vlhvub5ZhtDHxMask2uEZRMKkmkvqbbtofsYjiqukBnhSjNpbOxZ-EIe0ncxc2718xIRyOqc3ptEXxfJflc2RATceFdunlx5xlhcgvifw8fHk_1GwWQIQjfjcWzwtfqqLvvzIGaojTM5bTxdJ4W7U4CHN6pQvldFvGJyBQRUSDnK9Sj32jUqMcCZflOQWFu0b8SASmCf043xLGHqvlA",

    auth: [
      {
        "action": "mobile:dispatch",
        "describe": "派单",
        "type": "1"
      }, {
        "action": "mobile:batchDispatch",
        "describe": "批量派单",
        "type": "1"
      }, {
        "action": "mobile:acceptanceSubmit",
        "describe": "验收提交",
        "type": "1"
      }
    ],
    // changed by sxw 20210619 todolist No.29
    departlist: [],
    roleList: [],
    beforeInfo: {
      loginFlg: 0
    }
  }),
  mutations: {
    setInfo(state, info) {
      Object.assign(state.info, info);
    },
    setToken(state, token) {
      state.token = token;
    },
    setAuth(state, auth) {
      state.auth = auth;
    },
    // changed by sxw 20210619 todolist No.29
    setDepartList(state, departList) {
      state.departList = departList
    },
    setRoleList(state, roleList) {
      state.roleList = roleList
    },
    setBeforeInfo(state, beforeInfo) {
      state.beforeInfo = beforeInfo
    }
  },
};
