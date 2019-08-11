<template>
  <div class="home">
    <div class="home__logo" :class="[current === 'login' ? 'mt-5' : 'mt-3']">
      <strong>Notely</strong> xyz
    </div>
    <div class="home__content">
      <h1>
        The simplest way to keep notes.
      </h1>

      <div
        class="home__content-boxes"
        :class="[current === 'login' ? 'mt-5' : 'mt-3']"
      >
        <div class="home__content--box" v-if="current === 'login'">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="login.username" />
          <label for="password">Password</label>
          <input type="password" id="password" v-model="login.password" />
          <span class="error" v-if="error">{{ error }}</span>
          <button @click="onLogin">login</button>
          <a @click.prevent="current = 'register'" class="login-link">
            go to register
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div class="home__content--box" v-else>
          <label for="username">Username</label>
          <input v-model="register.username" type="text" id="username" />
          <label for="password">Password</label>
          <input v-model="register.password" type="password" id="password" />
          <label for="name">Name</label>
          <input v-model="register.name" type="text" id="name" />
          <label for="email">E-mail</label>
          <input v-model="register.email" type="email" id="email" />
          <span class="error" v-if="error">{{ error }}</span>
          <button @click="onRegister">register</button>
          <a @click.prevent="current = 'login'" class="login-link">
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
            back to login
          </a>
        </div>
      </div>
    </div>
    <div class="fork">
      <a
        href="http://github.com/msrkc/notely"
        target="_blank"
        rel="noopener noreferrer"
        >source</a
      >
    </div>
  </div>
</template>

<script>
import * as auth from "../auth";
export default {
  name: "AppHome",
  data: () => ({
    current: "login",
    error: null,
    login: {
      username: "",
      password: ""
    },
    register: {
      username: "",
      password: "",
      name: "",
      email: ""
    }
  }),

  methods: {
    onLogin() {
      const user = {
        username: this.login.username,
        password: this.login.password
      };

      auth
        .login(user)
        .then(() => this.$router.push({ name: "notes" }))
        .catch(_ => {
          this.clearError();
          this.error = "Please check your email and password.";
        });
    },
    onRegister() {
      const user = {
        username: this.register.username,
        password: this.register.password,
        name: this.register.name,
        email: this.register.email
      };
      if (!this.validEmail(user.email)) {
        this.error = "Your email address is not valid!";
        this.clearError();
        return;
      }
      auth
        .registerUser(user)
        .then(() => this.$router.push({ name: "notes" }))
        .catch(error => {
          this.clearFields(this.register);
          if (error.response.status) {
            this.error = "Username is taken";
            this.clearError();
          } else {
            this.error = "Please check fields.";
            this.clearError();
          }
        });
    },
    clearFields(obj) {
      Object.keys(obj).map(key => {
        obj[key] = "";
      });
    },
    clearError() {
      setTimeout(() => {
        this.error = "";
      }, 2000);
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style lang="stylus" scoped>
.mt-5 {
  margin-top: 5rem;
}

.mt-3 {
  margin-top: 3rem;
}

.home {
  background: bg-color;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__logo {
    font-size: 5rem;
    color: orange-bold-color;

    strong {
      color: default-color;
    }
  }

  &__content {
    text-align: center;

    &-boxes {
      display: flex;
      flex-direction: row;
      margin-bottom: 3rem;
    }

    &--box {
      border: 1px solid orange-bold-color;
      padding: 2rem;
      margin: 0 5rem;
      width: 30rem;
      border-radius: 10px;
      text-align: left;
      display: flex;
      flex-direction: column;

      .error {
        color: red;
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }

      label {
        text-transform: uppercase;
        padding-left: 0.5rem;
        font-size: 1.2rem;
        color: gray-dark-color;
      }

      button {
        border-radius: 10px;
        height: 4.5rem;
        outline: none;
        border: none;
        background: orange-bold-color;
        color: white-color;
        font-family: inherit;
        font-size: 1.6rem;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
      }

      input {
        border-radius: 10px;
        height: 4.5rem;
        outline: none;
        border: none;
        background: orange-light-color;
        font-family: inherit;
        padding: 1rem 2rem;
        margin-bottom: 2rem;
        font-size: 1.6rem;
      }
    }

    h1 {
      font-weight: 200;
      color: gray-light-color;
      margin: 0;
      padding: 0;
    }
  }

  .login-link {
    text-align: center;
    margin-top: 1rem;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .fork {
    position: fixed;
    bottom: 0;
    right: 0;
    font-size: 1.3rem;
    background: orange-bold-color;
    padding: 0.5rem 1rem;
    border-top-left-radius: 10px;

    a {
      text-decoration: none;
      color: white-color;
    }
  }
}
</style>
