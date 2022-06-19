<template>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col">
      <div class="text-center lg:text-right mb-10 text-blue-500">
        <h1 class="text-5xl font-bold">تسجيل الدخول كشركه</h1>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">البريد الإلكترونى</span>
            </label>
            <input
              type="text"
              placeholder="email"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">كلمه المرور</span>
            </label>
            <input
              type="text"
              placeholder="password"
              class="input input-bordered"
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">تسجيل الدخول</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.hero {
  background-image: url("../assets/images/jason-leung-SAYzxuS1O3M-unsplash.jpg");
}
.hero-content {
  background: #ffffffd4;
  padding: 50px;
  border-radius: 5px;
}
</style>
