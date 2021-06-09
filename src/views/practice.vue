<template>
  <section>
    <v-row>
      <v-col cols="10" class="mx-auto">
        <div
          v-for="task in tasks"
          :key="task.id"
          :task="task"
        >
          <v-card
          elevation="8"
          class="px-2 py-5">
            <v-row>
              <v-col cols="8">
                <v-card-title> Упражнение {{task.number}} на тему {{task.theme}} </v-card-title>
                <v-card-text>
                  {{task.name}}
                  {{task.description}}
                    <p 
                    v-for="ans in user_answers"
                      :key = ans.id>
                  <strong v-show="ans.task==task.id&&ans.solved==1"
                    v-for="(value, key) in ans.answer"
                    :key="key"> 
                      {{key}}) {{value}};
                    </strong>
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="4" rows="5">
                <v-form
                  ref="form_answers"
                  @submit.prevent
                >
                  <v-card-text
                          v-for="(value, key) in task.answer"
                          :key = key
                          @input="form_answers[task.number][key] = $event.target.value">
                  {{key}})<v-text-field/>
                  </v-card-text>
                  <v-btn v-on:click.capture="buttons(task.number)" type="submit" dark>Ответить</v-btn>
                </v-form>
              </v-col>
            </v-row>
              <v-col>
                <v-card-text v-for="ans in user_answers"
                :key='ans.task'>
                  <v-btn v-show="ans.task==task.id&&ans.solved==1" color = "blue" >Решено</v-btn>
                </v-card-text>
              </v-col>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'practice',

  data: () => ({
    tasks: [],
    user_answers: {},
    form_answers: {},
    u_id: '',
  }),

  methods: 
  {
    async getTasks () 
    {
      try 
      {
        const response = await this.axios
        .get('http://127.0.0.1:8000/api/task/all')
          if (response.status !== 200) {
            throw new Error(response.error)
        }
        const tasks = response.data
        this.tasks = tasks
        this.form_fill() 
      } 
      catch (e) {
        console.error('AN API ERROR', e)
      }

    },
    async getUserAnswers()
    {
      try{
        await this.axios.get('http://localhost:8000/auth/users/me/', { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } }) 
        .then(res => {this.u_id = res.data.id})
        let url = "http://127.0.0.1:8000/api/usertask/all?logik=" + this.u_id
        await this.axios.get(url)
        .then(res => {this.user_answers = res.data})
      }
      catch(e) {
        // this.$router.push('/log')
      }
    },
    async solved(i){
      try{
        await this.axios.patch('http://127.0.0.1:8000/api/usertask/update/' + this.user_answers[i].id, 
        {
            "solved": "1",
        }) 
        // console.log('решено')
      }
      catch(e) {
        console.error('AN API ERROR', e)
      }

    },
    async not_solved(i){
      try{
        await this.axios.patch('http://127.0.0.1:8000/api/usertask/update/' + this.user_answers[i].id, 
        {
          "solved": "0",
        }) 
        // console.log('решено')
      }
      catch(e) {
        console.error('AN API ERROR', e)
      }

    },
    async updUserAnswers(i, j){
      for (let value in this.form_answers[this.tasks[j].number]){
          if (this.form_answers[this.tasks[j].number][value] == ""){
            return false
          }
        }
      try{
        await this.axios.patch('http://127.0.0.1:8000/api/usertask/update/' + this.user_answers[i].id, 
        {
          "answer": this.form_answers[this.tasks[j].number],
        }) 
        // console.log('решено')
      }
      catch(e) {
        console.error('AN API ERROR', e)
      }
    },
    async addUserAnswers(i){
      try{
        await this.axios.post('http://127.0.0.1:8000/api/usertask/new', 
        {
        "answer": this.form_answers[this.tasks[i].number],
        "solved": "0",
        "accept_date" : "2021-06-05T23:18:00Z",
        "logik": this.u_id,
        "task": this.tasks[i].id
        }) 
      }
      catch(e) {
        console.error('AN API ERROR', e)
      }
    },
    checkUserAnswers1(){
      for (let i = 0; i < this.user_answers.length; i++){
        for (let j = 0; j < this.tasks.length; j++){
          if (this.user_answers[i].task == this.tasks[j].id){
            this.updUserAnswers(i, j)
          }
        }
      }
    },
    checkUserAnswers(){
      for (let i = 0; i < this.user_answers.length; i++){
        for (let j = 0; j < this.tasks.length; j++){
          if (this.user_answers[i].task == this.tasks[j].id){
            if (JSON.stringify(this.user_answers[i].answer) == JSON.stringify(this.tasks[j].answer)){
              this.solved(i)
            }
            else {
              this.not_solved(i)
            }
          }
        }
      }
    },
    buttons(b_id){
      let flag = true
      for (let j = 0; j < this.tasks.length; j++){
          if (b_id == this.tasks[j].number) {
            for (let i = 0; i < this.user_answers.length; i++){
              if (this.user_answers[i].task == this.tasks[j].id) {
                flag = false
              }
            }
          if (flag == true) {this.addUserAnswers(j)}
          flag = true
          }
        }
      this.getUserAnswers()
      this.checkUserAnswers1()
      this.getUserAnswers()
      this.checkUserAnswers()
    },
    async form_fill(){
      for (let i = 0; i < this.tasks.length; i++){
        let f_a = {}
        for (let key in this.tasks[i].answer){
          f_a[key] = ""
        }
          this.form_answers[this.tasks[i].number] = f_a
      }
    },
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
    this.$router.push('/log')}
    this.getTasks()
    this.getUserAnswers()
    this.checkUserAnswers()
  }
}
    </script>