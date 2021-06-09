<template>
  <div class="login">
    <v-form
      @submit.prevent="login"
      ref="loginForm"
      class="my-2"
    >
      <v-row>
        <v-col cols="3" class="mx-auto">
          <v-text-field
            label="Введите имя пользователя"
            v-model="loginForm.username"
          />
          <v-text-field
            label="Введите пароль"
            v-model="loginForm.password"
            type="password"
          />
          <v-btn type="submit" color="dark" dark>Войти</v-btn>

        </v-col>
        <v-card-text text-color="error">
        {{ result }}
        </v-card-text>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    loginForm: {
      username: '',
      password: '',
    },
      result: ''
  }),
  methods: {
    async login () {
      try {
        const response = await this.axios
          .post('http://127.0.0.1:8000/auth/token/login/', this.loginForm)
        console.log('SIGN IN RESPONSE', response)
        this.$cookies.set('token', response.data.auth_token)
        console.log(this.$cookies.get('token'))
        this.result = 'Авторизация успешно пройдена'
        this.$refs.loginForm.reset()
        this.$router.push('/practice')
        this.$router.go()
      } catch (e) {
        this.result = 'Проверьте введённые данные'
        console.error('AN API ERROR', e)
      }
    }
  }
}
</script>