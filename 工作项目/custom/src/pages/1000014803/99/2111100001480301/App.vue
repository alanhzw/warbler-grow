<template>
  <div class="index">
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/162309/28/23809/2170675/6188b8f0E55a633f9/e4eed8379f887b43.png"
    />
    <div class="rule-button" @click="overlayRule = true">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/210189/15/8501/6831/6188b8eeE30ae2d04/3309b471ecbd29e1.png"
      />
    </div>
    <div class="myPrize-button" @click="overlayMyGift = true">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/143684/26/22500/6489/6188b8efE73e8d810/7f48ec1f1bd5a8ab.png"
      />
    </div>
    <div v-show="giftFinsh">
      <div class="gift-list" v-for="item,index in giftList" :key="index">
        <img :src="giftListImg[item.name]" />
        <div>
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/197859/35/7935/50977/613b115eEcdb21074/4ad39c7db189bf47.png"
            :class="{ filter: item.buttonStatus != 0 }"
            class="lottery-button"
            @click="getPrize(index, item.id)"
          />
        </div>
        <div class="relative">
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/209369/38/8619/7976/6188b8efE50aaa686/38e0f8eb41143aac.png"
            class="privacy-img"
          />
          <div @click="changeprivacy(index)" class="privacy-button">
            <img
              src="//img10.360buyimg.com/imgzone/jfs/t1/196883/18/7926/577/613b0ee0Ec26e5786/3f6ddce77703ab17.png"
              v-show="privacy[index]"
            />
          </div>
          <div @click="overlayPrivacy = true" class="privacy-rule"></div>
        </div>
      </div>
      <div class="winner-list">
        <div
          class="swiper-container"
          ref="swiperRef"
          style="width: 100%; height: 100%; overflow: hidden;"
        >
          <div class="swiper-wrapper" v-if="activityGiftRecords.length != 0">
            <div
              class="winner swiper-slide"
              v-for="(item, index) in activityGiftRecords"
              :key="index"
            >
              <img
                src="https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg"
                v-if="!item.userImg"
              />
              <img v-else :src="item.userImg" alt />
              <span style="width: 1.5rem">{{ item.nickName }}</span>
              <span style="width: 2.4rem">{{ item.giftName }}</span>
            </div>
          </div>
          <div v-else>
            <p class="winner-null">暂无数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="index-rule">
    <p class="index-rule-titel">活动规则</p>
    <div v-html="rule"></div>
  </div>
  <!-- 规则弹窗 -->
  <van-popup v-model:show="overlayRule">
    <div class="rule">
      <div class="close-rule" @click="overlayRule = false"></div>
      <div v-html="rule" class="rule-text"></div>
    </div>
  </van-popup>
  <!-- 隐私条款弹窗 -->
  <van-popup v-model:show="overlayPrivacy">
    <div class="privacy">
      <div class="close-rule" @click="overlayPrivacy = false"></div>
      <div class="rule-text">
        <p>请您务必仔细阅读并透彻理解隐私条款，该隐私条款解释了我们收集、使用、共享您提供给我们的信息的目的、方式和范围，以及我们如何保护您的信息。请在确认充分理解并同意本隐私条款后勾选“我已阅读并确认同意用户条款及隐私政策”。一旦您勾选同意，即表示您已充分理解并同意本隐私条款。</p>

        <p>
          - 您提供给我们的信息
          <br />为了领取奖品，您需要向我们提供您的姓名、手机号码、身份证号码和邮寄地址。所有上述个人信息均为您参与本次活动领取奖品所必需的个人信息，您明确同意并自愿向我们提供该等个人信息。如您不提供上述信息，我们将无法为您兑现奖品。
        </p>

        <p>
          - 儿童的个人信息
          <br />根据相关法律法规的规定，如果您是年龄不满14周岁的儿童，请确保您向我们提供有关您的姓名、手机号码、身份证号码和邮寄地址的行为已经征得您的监护人的明确同意，并在您的监护人的帮助下向我们提供上述信息，以便我们为您兑现相关奖品。
        </p>

        <p>如果您是不满14周岁儿童的监护人并向我们提供其相关信息，即表明您已代表该儿童同意我们按本隐私条款所述内容使用和处理该儿童的个人信息。</p>

        <p>如果我们发现收集的年龄不满14周岁的儿童的个人信息未获得其监护人同意，我们会设法尽快删除相关数据。</p>

        <p>我们会采取加密等技术措施存储儿童个人信息，确保信息安全。我们在中国境内存储儿童个人信息，不会超过实现其收集、使用目的所必需的期限。当我们的产品或服务发生停止运营的情形或您和儿童的个人信息存储期限届满时，我们将采取例如邮件、推送通知、公告等形式通知您和儿童，并在合理的期限内删除或匿名化处理儿童的个人信息。</p>

        <p>
          - 我们如何使用您提供的信息
          <br />该等信息将用于：
          <br />• 接收和审阅您领取奖品的申请；
          <br />• 处理您的申请，按照您提供的姓名、手机号码、身份证号码和邮寄地址为您兑现奖品；
          <br />• 保护我们合法的商业利益和法律权利，包括为相关法律争议（包括在有关法律流程或诉讼中披露该等信息）、合规、规定、审计、调查或合规报告的目的而使用；
          <br />• 在法律法规允许的范围内，将您提供的信息在全世界范围内，通过各类现有或将来可能出现的媒体渠道，无偿用于广告宣传、营销或抽奖活动，且无需额外向您发送通知或另行取得您的许可；
          <br />• 其他为了履行有关法律法规义务的目的。
        </p>

        <p>
          - 共享您的信息
          <br />我们有可能因下列情况共享您的信息：
          <br />• 为本次活动之目的，我们会与北京环球影城指定单日门票奖品提供方及其关联公司、业务功能服务提供方共享您的信息，包括入园人的姓名、手机号、身份证号；
          <br />• 为本次活动之目的，向代表我们执行相关业务功能的服务提供商共享；
          <br />• 脱敏信息：我们有权向第三方共享关于您的经汇总或去标识化处理过而无法重新识别的信息，以便他们更好地个性化您的体验并将更好的选择提供给您；
          <br />• 司法、执法机构等有权机关根据相关法律法规要求我们提供。
        </p>

        <p>
          - 保护您的信息
          <br />我们希望您能够放心地使用本活动页面服务。我们已使用符合业界标准的安全防护措施维护本活动页面服务的程序、技术和物理保障，以助于防止数据遭到未经授权的访问、丢失、滥用或泄露、更改或销毁。我们会采取一切合理可行的措施，保护您的个人信息，比如我们只允许有合理需要的员工可取得您的个人信息。这些保护措施的变化取决于我们收集和存储的信息的敏感性。请注意，并没有安全解决方案是绝对可靠的。
        </p>

        <p>请您务必仔细阅读并透彻理解本用户条款，特别是可能对您的权利作出一定限制的条款。请在确认充分理解并同意本隐私条款后勾选“我已阅读并确认同意用户条款及隐私政策”。一旦您勾选同意，即表示您已充分理解并同意本用户条款。</p>

        <p>• 您知悉您于2021年11月10日至2021年12月14日期间，参与了2021年【蒙牛的下单抽奖】活动，从而中奖取得了“北京环球度假区指定单日门票”兑换资格。</p>

        <p>• 您声明您是一名完全民事行为能力人；若您是一名限制民事行为能力人，您特此确认已经就兑现“北京环球度假区指定单日门票”兑换资格的行为取得您的法定监护人的同意。</p>

        <p>• 您同意“北京环球度假区指定单日入园体验资格”的使用受限于届时有效的北京环球度假区入园规则及票务政策，北京环球度假区将会在法律允许的范围内对北京环球度假区指定单日入园体验资格使用规则给予必要的说明和解释。</p>

        <p>
          • 您同意 (a) 在参加抽奖活动、接受、占有或使用“北京环球度假区指定单日入园体验资格”过程中（包括旅途中）发生的任何伤害和损失，北京国际度假区有限公司、其关联公司及其各自的管理人员、代理人和员工（共同称为“被免责方”）不承担任何责任；(b) 被免责方不对任何由登入或下载与本抽奖活动相关的页面或软件而对任何计算机及移动设备造成或与其相关的伤害和损失负责；(c) 认可被免责方未作出与“北京环球度假区指定单日入园体验资格”、在本次抽奖活动中由其他奖品提供方提供的奖品以及抽奖活动中的抽奖产品相关的任何承诺、保证或声明（包括任何与“北京环球度假区指定单日入园体验资格”一并提供的明示保证），无论是明示的亦或是默示的，无论是在事实上亦或是在法律上；进一步认可被免责方不对前述的任何承诺、保证或声明以任何形式负有任何法律责任；(d) 被免责方不对任何远程通讯故障、网络故障、技术故障或计算机系统故障负责；不对错误传输与本抽奖活动或参与消费者相关信息负责；不对任何与此抽奖活动相关的抽奖材料或活动规则中出现的错误信息负责；不对任何人为或电子错误负责；不对就本抽奖活动或参与消费者相关信息产生的任何盗取、误导、捕获、延迟、丢失、损害或归还负责。
          <br />
        </p>
        <br />
      </div>
    </div>
  </van-popup>
  <!-- 我的奖品弹窗 -->
  <van-popup v-model:show="overlayMyGift">
    <div class="my-gift">
      <div class="close-rule" @click="overlayMyGift = false"></div>
      <ul class="my-gift-list">
        <li v-for="(item, index) in myGifts" :key="index">
          <span>{{ item.exchangeTime }}</span>
          <span>{{ item.giftName }}</span>
          <span
            v-if="item.type == 7 && item.giftAddress == null"
            @click="
  formDataEmpty();
changeAddress(index);
            "
          >填写信息</span>
          <span
            v-else-if="item.type == 7 && item.giftAddress != null"
            @click="
  formDataEmpty();
changeAddress(index);
            "
          >修改信息</span>
          <span v-else>已领取</span>
        </li>
      </ul>
    </div>
  </van-popup>
  <!-- 未中奖弹窗 -->
  <van-popup v-model:show="overlayGiftFail">
    <div class="gift-fail">
      <div class="close-gift-fail" @click="overlayGiftFail = false"></div>
      <div class="close-rule" @click="overlayGiftFail = false"></div>
    </div>
  </van-popup>
  <!-- 中奖弹窗 -->
  <van-popup v-model:show="overlayGetGift">
    <div class="get-gift">
      <div class="get-gift-name">{{ giftName }}</div>
      <div class="close-get-gift" @click="overlayGetGift = false"></div>
      <div class="close-rule" @click="overlayGetGift = false"></div>
    </div>
  </van-popup>
  <!-- 中奖门票 -->
  <van-popup v-model:show="overlayGetTickets">
    <div class="get-Tickets">
      <div
        class="get-Tickets-address"
        @click="
  overlayGetTickets = false;
overlayAddress = true;
        "
      ></div>
      <div class="close-rule" @click="overlayGetTickets = false"></div>
    </div>
  </van-popup>
  <!-- 填写地址 -->
  <van-popup v-model:show="overlayAddress">
    <div class="address">
      <div class="addess-formData">
        <input type="text" v-model="formData.receiver" placeholder="入园用户姓名" maxlength="10" />
        <input
          type="text"
          v-model="formData.phone"
          placeholder="入园用户手机号"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="11"
        />
        <input
          type="text"
          v-model="addressCode"
          readonly="readonly"
          placeholder="选择省/市/区"
          @click="addressSelects = true"
        />
        <input type="text" v-model="formData.address" placeholder="街道门牌号" style="width: 82%" />
        <input
          type="text"
          v-model="formData.postalCode"
          placeholder="邮政编码"
          style="width: 82%"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="6"
        />
        <input
          type="text"
          v-model="formData.personalEmail"
          placeholder="入园用户完整身份证号"
          style="width: 82%;"
          onkeyup="value=value.replace(/[^0-9xX]/g,'');"
          maxlength="18"
        />
      </div>
      <div class="submit-address" @click="submitCheckOut"></div>
      <div class="close-rule" @click="overlayAddress = false"></div>
    </div>
  </van-popup>
  <!-- 提交成功弹窗 -->
  <van-popup v-model:show="overlaySucess">
    <div class="sucess">
      <div class="close-sucess" @click="overlaySucess = false"></div>
      <div class="close-rule" @click="overlaySucess = false"></div>
    </div>
  </van-popup>
  <!-- 开卡弹窗 -->
  <van-popup v-model:show="overlayOpenCard">
    <div class="opencard">
      <div class="opencard-button" @click="gotoOpenCard"></div>
      <div class="close-rule" @click="overlayOpenCard = false"></div>
    </div>
  </van-popup>
  <!--地址选择-->
  <van-popup v-model:show="addressSelects" position="bottom">
    <van-area title="请输入详细地址" :area-list="areaList" @confirm="confirmAddress" @cancel="onCancel" />
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, Ref, nextTick,
} from 'vue';
import {
  Toast,
  Area as vanArea,
  Overlay as vanOverlay,
  Popup as vanPopup,
} from 'vant';
import { areaList } from '@vant/area-data';
import Swiper, { Autoplay } from 'swiper';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import './css/index.css';

Swiper.use([Autoplay]);

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

const rule = ref('');
const prizeButton = ref(false);
const privacy = ref([false, false, false, false]);
const overlayRule = ref(false);
const overlayPrivacy = ref(false);
const overlayMyGift = ref(false);
const overlayGiftFail = ref(false);
const overlayGetGift = ref(false);
const overlayGetTickets = ref(false);
const overlayAddress = ref(false);
const addressSelects = ref(false);
const overlaySucess = ref(false);
const overlayOpenCard = ref(false);
const giftFinsh = ref(false);

const swiperRef: Ref<HTMLElement | null> = ref(null);

const giftList = ref([
  {
    buttonStatus: 2,
  },
  {
    buttonStatus: 2,
  },
  {
    buttonStatus: 2,
  },
  {
    buttonStatus: 2,
  },
  {
    buttonStatus: 2,
  },
]);
const giftListImg = ref({
  蒙牛牛奶专区: '//img10.360buyimg.com/imgzone/jfs/t1/199031/9/16232/99636/6188f115E4eaa2788/00af7939e65c57a0.png',
  纯甄专区: '//img10.360buyimg.com/imgzone/jfs/t1/170957/16/22806/106847/6188f115E02c32409/30404310e9f70ec7.png',
  新养道专区: '//img10.360buyimg.com/imgzone/jfs/t1/204736/31/10032/98249/6188f115E05d7961f/9f9343693116cf19.png',
  未来星专区: '//img10.360buyimg.com/imgzone/jfs/t1/208633/15/8534/79448/6188f115E5c266357/fa9688a0bcb8f52c.png',
  真果粒专区: '//img10.360buyimg.com/imgzone/jfs/t1/130872/20/20800/91015/6188f115E71f269ef/5de264ade6e39a20.png',
});
const myGifts = ref([]);
const activityGiftRecords = ref([]);
const formData = ref({
  activityId,
  pin,
  giftRecordId: '',
  receiver: '',
  phone: '',
  address: '',
  postalCode: '',
  personalEmail: '',
  province: '',
  city: '',
  district: '',
});
const addressCode = ref('');
let uuid = '';
const giftName = ref('');

const formDataEmpty = () => {
  formData.value = {
    activityId,
    pin,
    giftRecordId: '',
    receiver: '',
    phone: '',
    address: '',
    postalCode: '',
    personalEmail: '',
    province: '',
    city: '',
    district: '',
  };
  addressCode.value = '';
};

// 主接口 获取活动信息;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
      }
    });
};

const getActivityContent = () => {
  cjwxRequest
    .post('/mengniu/drawOrder/activityContent', {
      activityId,
      pin,
    })
    .then((data) => {
      if (data.result) {
        uuid = data.data.userRecord.uuid;
        if (data.data.userRecord.openCardStatus === 0) {
          overlayOpenCard.value = true;
        }
        giftList.value = data.data.giftList;
        myGifts.value = data.data.myGifts;
        activityGiftRecords.value = data.data.activityGiftRecords;
        giftFinsh.value = true;
        if (activityGiftRecords.value.length > 4) {
          nextTick(() => {
            const mySwiper = new Swiper('.swiper-container', {
              autoplay: {
                delay: 1000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
              },
              direction: 'vertical',
              loop: true,
              slidesPerView: 5,
              loopedSlides: 8,
              centeredSlides: true,
            });
          });
        }
      } else {
        Toast(data.errorMessage);
      }
    });
};

const getPrize = (index: number, giftId: string) => {
  if (giftList.value[index].buttonStatus === 0) {
    if (privacy.value[index]) {
      Toast.loading({ message: '正在抽奖', forbidClick: true });
      cjwxRequest
        .post('/mengniu/drawOrder/convertPrize', {
          activityId,
          pin,
          uuid,
          giftId,
        })
        .then((res) => {
          Toast.clear();
          if (res.result) {
            const type = Number(res.data.type);
            if (type === 0) {
              overlayGiftFail.value = true;
            } else if (type === 7 && res.data.giftName.match(RegExp(/门票/))) {
              formDataEmpty();
              formData.value.giftRecordId = res.data.id;
              overlayGetTickets.value = true;
            } else {
              overlayGetGift.value = true;
              giftName.value = res.data.giftName;
            }
          } else {
            Toast(res.errorMessage);
          }
          getActivityContent();
        });
    } else {
      Toast('请先勾选隐私声明');
    }
  } else {
    Toast('暂无资格');
  }
};

const changeprivacy = (index: number) => {
  privacy.value[index] = !privacy.value[index];
};

const changeAddress = (index: number) => {
  const { giftAddress } = (myGifts as any).value[index];
  formData.value.giftRecordId = (myGifts as any).value[index].id;
  if (giftAddress !== null) {
    formData.value.receiver = giftAddress.receiver;
    formData.value.phone = giftAddress.phone;
    formData.value.province = giftAddress.province;
    formData.value.city = giftAddress.city;
    formData.value.district = giftAddress.district;
    formData.value.address = giftAddress.address;
    formData.value.postalCode = giftAddress.postalCode;
    formData.value.personalEmail = giftAddress.personalEmail;
    addressCode.value = `${giftAddress.province}/${giftAddress.city}/${giftAddress.district}`;
  }
  overlayMyGift.value = false;
  overlayAddress.value = true;
};

interface AddressItem {
  name: string;
}

// 地址确认三级联动地址
const confirmAddress = (addressItemList: AddressItem[]) => {
  formData.value.province = addressItemList[0].name;
  formData.value.city = addressItemList[1].name;
  formData.value.district = addressItemList[2].name;
  addressCode.value = addressItemList.map((item) => item.name).join('/');
  addressSelects.value = false;
};

const onCancel = () => {
  addressSelects.value = false;
};

const submitAddress = () => {
  Toast.loading({ message: '提交中', forbidClick: true });
  formData.value.personalEmail = formData.value.personalEmail.toUpperCase();
  setTimeout(() => {
    cjwxRequest
      .post('/mengniu/drawOrder/recordReciverInfo', formData.value)
      .then((res) => {
        Toast.clear();
        if (res.result) {
          overlayAddress.value = false;
          overlaySucess.value = true;
        } else {
          Toast(res.errorMessage);
        }
        getActivityContent();
      });
  }, 1000);
};

const submitCheckOut = () => {
  const regu = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  const reg = /^\d{11}$/;
  const re = new RegExp(regu);
  if (!formData.value.receiver) {
    Toast('请输入姓名');
  } else if (re.test(formData.value.receiver)) {
    Toast('姓名不可以存在特殊字符');
  } else if (!/^1[3456789]\d{9}$/.test(formData.value.phone)) {
    Toast('请填写正确的手机号码');
  } else if (addressCode.value === '') {
    Toast('请选择地区');
  } else if (!formData.value.address) {
    Toast('请填写详细地址');
  } else if (!/^\d{6}$/.test(formData.value.postalCode)) {
    Toast('请填写正确的邮编');
  } else if (!/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(formData.value.personalEmail)) {
    Toast('请填写正确的身份证号');
  } else {
    submitAddress();
  }
};

// 开卡链接
const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000014803&shopId=1000014803&venderType=5&channel=7088&returnUrl=${returnUrl}`;
};

getActivityInfo();
getActivityContent();
</script>

<style lang='scss'>
</style>
