<template lang="pug">

div.wrap-module
  div.wrap-person-icon.f.fh
    div.person-icon-content.pt12
      div.person-icon.f.fc
        input(type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked")
        canvas#canvas(width="280" height="280" style="display: none")
        div(@click="pickFile").icon-uploader.f.fh
          img(:src="imageUrl" alt="")
        div(@click="pickFile").wrap-upload-icon.f.fh
          v-icon sync
      div.wrap-name
        v-flex.xs12.sm6.md3
          v-text-field(label="" placeholder="Input Name" v-model="name" dark).name-input
  div.wrap-profile.py4
    div.profile
      v-flex.xs12.sm6.md3
        v-text-field(label="" placeholder="Input Profile" v-model="profile")
      //v-flex.xs6
        v-textarea(
          label="Profile"
          height="60"
          value="")
    div.gender
      v-radio-group(v-model="radioGroup")
        v-radio(
          v-for="n in 3"
          :key="n"
          :label="radioSelection[n-1]"
          :value="n")
  div.wrap-button.f.fc
    CustomButton(@onbutton="createPerson" label="Create Person")

</template>

<style lang="scss" scoped>
.wrap-module {
  width: 100%;
  background: #f8f8f8;
  padding: 48px 0;

  overflow: scroll;
  display: block;
  min-height: 100vh;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  .wrap-person-icon {
    width: 100%;
    height: 240px;
    background: #2a2a2a;
    .person-icon {
      position: relative;
      .icon-uploader {
        position: relative;
        display: block;
        width: 100px;
        height: 100px;
        border: solid #fff 0.4px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          min-width: 100px;
          min-height: 100px;
          object-fit: cover;
        }
      }
      .wrap-upload-icon {
        position: absolute;
        width: 28px;
        height: 28px;
        right: 34px;
        bottom: 4px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
          0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      }
    }
    .wrap-neme {
      .name-input {
        input {
          text-align: center;
        }
      }
    }
  }
  .wrap-profile {
    width: 90%;
    max-width: 480px;
    margin: 0 auto;
    .gender {
      .v-input--selection-controls {
        margin-top: 0 !important;
      }
    }
  }
}
</style>

<script>
import CustomButton from '@/components/items/CustomButton'

import { firestore } from '@/components/utils/firestore'
import { strage } from '@/components/utils/strage'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    CustomButton
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      label: 'Next',
      name: '',
      profile: '',
      radioGroup: 1,
      radioSelection: ['Male', 'Female', 'Others'],
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/joseph-alike.appspot.com/o/person%2Fdefault_img.jpg?alt=media&token=f1e3dedc-b9ca-4d7b-b80f-0f819c0a5434',
      imageFile: ''
    }
  },
  methods: {
    async createPerson () {
      if (this.name === '') {
        alert('Please input name')
        return true
      }
      if (this.profile === '') {
        alert('Please input profile')
        return true
      }

      var personObj = {
        name: this.name,
        profile: this.profile,
        gender: this.radioSelection[this.radioGroup - 1],
        icon: this.imageUrl,
        groups: [this.$route.params.group_id],
        randomIndex: Math.floor(Math.random() * 10000) / 10000,
        createdBy: this.uid,
        createdAt: new Date()
      }

      await firestore.collection('PERSON').add(personObj)

      // var personDoc = await firestore.collection('PERSON').add(personObj)
      // await firestore.collection('GROUP')
      //   .doc(this.$route.params.group_id)
      //   .collection('MEMBER')
      //   .doc(personDoc.id)
      //   .set({
      //     id: personDoc.id,
      //     addedAt: new Date()
      //   })

      this.$router.push(`/group_member/${this.$route.params.group_id}`)
    },
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
          console.log('picked img', this.imageFile)
          // this.upload()
          this.resizeImg(this.imageFile)
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    resizeImg (file) {
      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      var cw = canvas.width
      var ch = canvas.height
      var maxW = 200
      var maxH = 200

      var img = new Image()
      img.onload = function () {
        var iw = img.width
        var ih = img.height
        var scale = Math.min((maxW / iw), (maxH / ih))
        var iwScaled = iw * scale
        var ihScaled = ih * scale
        canvas.width = iwScaled
        canvas.height = ihScaled
        ctx.drawImage(img, 0, 0, iwScaled, ihScaled)
        // output.value = canvas.toDataURL("image/jpeg",0.5)
      }
      img.src = URL.createObjectURL(file)

      setTimeout(this.upload, 400)
    },
    upload: function () {
      var canvas = document.getElementById('canvas')
      var base64 = canvas.toDataURL()
      this.imageUrl = base64

      // ストレージオブジェクト作成
      var storageRef = strage.ref()
      // ファイルのパスを設定
      var mountainsRef = storageRef.child(`person/${this.imageName}`)
      // ファイルを適用してファイルアップロード開始
      // mountainsRef.put(this.imageFile).then(snapshot => {
      mountainsRef.putString(base64.split(',')[1], 'base64').then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imageUrl = downloadURL
          console.log('imageUrl', downloadURL)
        })
      })
    }
  }
}
</script>
