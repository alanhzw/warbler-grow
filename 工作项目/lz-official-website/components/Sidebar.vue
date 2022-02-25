<template>
  <div class="sidebar">
    <div class="item phone">
      <div class="number">+86-411-84174867</div>
    </div>
    <div class="item wechat">
      <div class="barcode">
        <img src="/images/barcode3.jpg">
      </div>
    </div>
    <div class="item service">
      <div class="barcode">
        <img src="/images/barcode.jpg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  z-index: 1000;
  right: 0;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .item {
    margin: 5px 10px;
    width: 64px;
    height: 64px;
    background-color: #ffffff;
    border: solid 2px #2dd5ff;
    border-radius: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: default;
    transition: background-color 100ms linear;
    background-repeat: no-repeat;
    position: relative;
    font-size: 24px;
    color: #ffffff;

    .number {
      display: none;
    }

    .barcode {
      width: 200px;
      height: 200px;
      position: absolute;
      right: 70px;
      border: solid 2px #2dd5ff;
      border-radius: 10px;
      display: none;

      &:after {
        position: absolute;
        content: '';
        width: 10px;
        height: 10px;
        background-color: white;
        transform: rotate(45deg);
        border: solid 2px #2dd5ff;
        border-left: none;
        border-bottom: 0;
      }

      img {
        width: 100%;
        border-radius: 8px;
      }
    }

    &.phone {
      background-position: 0 0;
      background-image: url('/images/icon-phone.png');
      transition: background-color 100ms linear, width 100ms linear;
    }

    &.wechat {
      background-position: 0 0;
      background-image: url('/images/icon-wechat.png');

      .barcode {
        top: 0;

        &:after {
          right: -7px;
          top: 24px;
        }
      }
    }

    &.service {
      background-position: 0 0;
      background-image: url('/images/icon-service.png');

      .barcode {
        bottom: 0;

        &:after {
          right: -7px;
          bottom: 24px;
        }
      }
    }

    &:hover {
      background-color: #2dd5ff;
      border: solid 2px #2dd5ff;

      .barcode,
      .number {
        display: block;
      }

      &.phone {
        background-position: 0 -64px;
        width: 290px;

        .number {
          margin-left: 32px;
        }
      }

      &.wechat {
        background-position: 0 -64px;
      }

      &.service {
        background-position: 0 -64px;
      }
    }
  }
}
</style>
