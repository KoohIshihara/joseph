<template lang="pug">

div.wrap-module.f.fh
  div.wrap-module-content
    img(src="/img/logo.png")
    h2.mb12 ALIKEをはじめてみましょう！
    div.wrap-p.mb30
      p サインアップするとユーザーをフォローしたり、様々なグループや人を作成できます
    div.wrap-button.f.fc.mb20
      CustomButton(label="ALIKEをはじめる" @onbutton="toSignUp")
    div.wrap-close.f.fc
      span(@click="close") 閉じる

</template>

<style lang="scss" scoped>
.wrap-module {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.9);
  z-index: 100;
  .wrap-module-content {
    width: 90%;
    max-width: 480px;
    h2 {
      font-size: 18px;
      text-align: center;
    }
    .wrap-p {
      p {
        /*text-align: center;*/
      }
    }
    .wrap-pager {
      .circles {
        width: 50px;
        .circle {
          display: block;
          width: 4px;
          height: 4px;
          background: #999;
          border-radius: 50%;
        }
        .active {
          transform: scale(2);
          color: #2a2a2a;
        }
      }
    }
    .wrap-close {
      span {
        font-size: 12px;
        color: #2a2a2a;
      }
    }
  }
}
</style>

<script>

import CustomButton from '@/components/items/CustomButton'

export default {
  components: {
    CustomButton
  },
  computed: {

  },
  created () {

  },
  methods: {
    toSignUp () {
      this.$router.push(`/sign-up${this.$route.path}`)
      mixpanel.track('RecomendSignUp: toSignUp')
    },
    close () {
      this.$emit('closerecomend')
      mixpanel.track('RecomendSignUp: close')
    }
  }
}
</script>
