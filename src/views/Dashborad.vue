<template>
  <div class="container">
    <h1>ホーム</h1>
    <p>{{ message }}</p>
    <p>{{ user }}</p>
    <p>{{ wallet }}</p>
    <button @click="logout()">ログアウト</button>
    <input type="number" v-model.number="editWallet">
    <button @click="editUserWalletButton(id, editWallet)">変更</button>
    <div v-for="(user, index) in userList" :key="index">
      <p>{{user.name}}</p>
      <input type="number" v-model.number="sendingMoney">
      <button @click="sendMoney(id, user, sendingMoney)">送る</button>
      <button @click="showBalance(index)">残高</button>
      <p :class="{'is-active': activeItem === index}" class="balance">{{user.wallet}}</p>
    </div>
  </div>
</template>

<script>
import firebase from '../main'
export default {
  data() {
    return {
      message: 'ログインができておりません',
      user: null,
      wallet: 0,
      userList: [],
      db: firebase.firestore(),
      editWallet: 0,
      id: null,
      activeItem: null,
      sendingMoney: 0
    }
  },
  methods: {
    editUserWalletButton(id, wallet) {
      const money = this.wallet + wallet
      this.db.collection("users").doc(id).update({
        myWallet: money
      }).then(() => {
        this.getUserData();
      })
    },
    getUserData(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.db.collection("users").where("uid", "==", user.uid).get().then((querySnapshot) => {
            querySnapshot.forEach( (doc) => {
              this.user = doc.data().name;
              this.wallet = doc.data().myWallet;
              console.log(doc.id)
              this.id = doc.id;
            });
          })
          this.message = 'ログイン済みです'
        } else {
          this.$router.replace("/login")
        }
      })
    },
    getUserList() {
        this.userList = [];
        this.db.collection("users").get().then((query) => {
          query.forEach((data) => {
            const resData = data.data();
            if (this.id !== data.id) {
              this.userList.push({
                id: data.id,
                name: resData.name,
                uid: resData.uid,
                wallet: resData.myWallet,
                email: resData.email,
              });
            }
          })
        })
      },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.$router.replace('/login')
      })
    },
    async getUser() {
      await this.getUserData();
      await this.getUserList();
    },
    showBalance(index) {
      if(this.activeItem === index) {
        this.activeItem = null;
      } else {
        this.activeItem = index;
      }
    },
    sendMoney(user_id, user, wallet) {
      const money = this.wallet - wallet
      const otherWallet = user.wallet + wallet
      this.db.collection("users").doc(user_id).update({
        myWallet: money
      }).then(() => {
        this.db.collection("users").doc(user.id).update({
          myWallet: otherWallet
        }).then(() => {
          this.getUserData();
          this.getUserList();
        })
      })
    },
  },
  created() {
    this.getUser();
  },
}
</script>

<style>
.balance {
  display: none;
}
.balance.is-active {
  display: block;
  color: red;
}
</style>