<template>
  <div>
    <div id="firebaseui-auth-container" />
    <v-progress-circular v-show="!isSignInUILoaded" :size="50" color="primary" indeterminate />
  </div>
</template>

<script>
import { firebase } from '@/components/utils/firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
const ui = new firebaseui.auth.AuthUI(firebase.auth())

export default {
  data () {
    return {
      isSignInUILoaded: false
    }
  },
  props: {
    redirect: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setupSignInUi()
    })
  },
  methods: {
    setupSignInUi () {
      const vInstance = this
      const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        callbacks: {
          uiShown () {
            vInstance.isSignInUILoaded = true
          },
          // signInSuccess: (authResult) => {
          //   console.log('sign in success result')
          //   this.$router.replace(this.redirect)
          //   return false
          // },
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            // authResult.additionalUserInfo.isNewUser
            console.log('redirect:', this.redirect)
            this.$router.replace(this.redirect)
            return false
          }
        },
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
          }
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        privacyPolicyUrl: function () {
          window.location.assign('<your-privacy-policy-url>')
        }
      }

      // Initialize the FirebaseUI Widget using Firebase.

      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }
}
</script>

<style>
/* Collapse height of firebase ui loading spinner container */
.mdl-card .firebaseui-callback-indicator-container {
  height: 2px;
}

/* Collapse height of firebase ui loading spinner container */
.mdl-card.firebaseui-container {
  min-height: 2px;
}
</style>
