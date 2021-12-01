<template>
  <div>
    <h1>ホーム</h1>
     <label
      >メールアドレス： <input v-model="email" type="email" required
    /></label>
    <br />
     <label
      >名前： <input v-model="name" type="text" required
    /></label>
    <br />
    <label
      >パスワード： <input v-model="password" type="password" required
    /></label>
    <br />
    <button @click="register">新規登録</button>
    <br />
    <router-link to='/login'>ログイン</router-link>
    <router-link to="/dashborad">ダッシュボード</router-link>
  </div>
</template>

<script>
import firebase from '../main'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    }
  },
  methods: {
    register() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          return data.user.updateProfile({
            displayName: this.name,
          }).then(() => {
            const db = firebase.firestore();
            db.collection("users").add({
              name: data.user.displayName,
              uid: data.user.uid,
              myWallet: 0,
              email: data.user.email,
            });
            this.$router.replace('/dashborad');
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>
