<template>
  <div class="container">
    <h1>ホーム</h1>
    <p>{{ message }}</p>
    <p>{{ user }}</p>
    <p>{{ wallet }}</p>
  </div>
</template>

<script>
import firebase from '../main'
export default {
  data() {
    return {
      message: 'ログインができておりません',
      user: null,
      wallet: 0
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = user.displayName;
        this.message = 'ログイン済みです'
      }
    })
  },
}
</script>