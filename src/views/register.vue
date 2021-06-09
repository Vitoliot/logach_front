<template>
  <div class="register">
    <v-form
      @submit.prevent="register"
      ref="registerForm"
      class="my-2"
    >
      <v-row>
        <v-col cols="3" class="mx-auto">
          <v-text-field
            label="Введите имя"
            v-model="registerForm.first_name"
          />
          <v-text-field
            label="Введите фамилию"
            v-model="registerForm.last_name"
          />
          <v-text-field
            label="Введите имя пользователя"
            v-model="registerForm.username"
          />
          <v-text-field
            label="Введите email пользователя"
            v-model="registerForm.email"
          />
          <v-text-field
            label="Введите пароль"
            v-model="registerForm.password"
            type="password"
          />
          <v-btn type="submit" color="dark" dark >Зарегистрироваться</v-btn>

        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data: () => ({
    registerForm: {
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      password: ''
    }
  }),
  methods: {
    async register () {
      try {
        const response = await this.axios
          .post('http://127.0.0.1:8000/auth/users/', this.registerForm)
        if (response.status !== 201) {
          throw new Error(response.status)
        }
        this.$refs.registerForm.reset()
        this.$router.push('/log')
        this.$router.go()
      } catch (e) {
        console.error('AN API ERROR', e)
      }
    }
  }
}
</script>