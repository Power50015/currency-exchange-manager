<template>
  <div class="bg-red-100 p-5 w-full sm:w-1/2 my-3">
    <div class="flex space-x-3">
      <div class="leading-tight flex flex-col space-y-2">
        <div class="flex-1 leading-snug text-sm text-red-600">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
