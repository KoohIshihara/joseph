<template lang="pug">

div.wrap-module.f.fh
  div.wrap-module-content
    img(:src="currentStep.src")
    h2.mb12 {{currentStep.title}}
    div.wrap-p.mb12
      p(v-for="item in currentStep.explain") {{item}}
    div.wrap-pager.f.fc.mb24
      div.circles.f.flex-around
        div(v-for="item in steps" ref="circle").circle
    div.wrap-button.f.fc
      CustomButton(:label="currentStep.buttonLabel" @onbutton="toNext")

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
        width: 44px;
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
  }
}
</style>

<script>

import CustomButton from '@/components/items/CustomButton'

export default {
  components: {
    CustomButton
  },
  data () {
    return {
      steps: [],
      currentStep: {},
      stepIndex: 0
    }
  },
  created () {
    this.steps = [
      {
        src: '/img/tutorials/tutorial1.png',
        title: 'Welcome to Alike.',
        explain: [
          // 'ALIKEは誰かのフリを通して、新しいコミュニケーションを模索する活動です。'
          "Let's become us."
        ],
        buttonLabel: 'NEXT'
      },
      {
        src: '/img/tutorials/tutorial2.png',
        title: 'You are us.',
        explain: [
          'You can talk anything as us.'
        ],
        buttonLabel: 'NEXT'
      },
      {
        src: '/img/tutorials/tutorial3.png',
        title: 'Evaluate pretendings',
        explain: [
          'If you think the messeage looks like ours,',
          'push the button Alike'
        ],
        buttonLabel: 'OK'
      }
    ]

    this.currentStep = this.steps[this.stepIndex]
  },
  mounted () {
    this.activateCircle()
  },
  methods: {
    toNext () {
      this.stepIndex++
      if (this.stepIndex < this.steps.length) {
        this.currentStep = this.steps[this.stepIndex]
        this.activateCircle()
      } else {
        this.$emit('closetutorial')
      }
    },
    activateCircle () {
      this.$refs.circle.map(e => {
        e.classList.remove('active')
      })
      this.$refs.circle[this.stepIndex].classList.add('active')
    }
  }
}
</script>
