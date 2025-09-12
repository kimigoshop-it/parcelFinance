<template>
  <div>

  </div>
</template>

<script setup lang="tsx">
import { ref } from "vue";

type ComponentType = 'Input' | 'Select' | 'DatePicker' | 'Checkbox' | 'Radio' | 'Switch' | 'Textarea';

type FormItem = {
  label: string;
  name: string;
  component: any;
};

const formItems: FormItem[] = [];

const onFinish = (values: any) => {
  console.log(values);
};
</script>

<style scoped lang="scss"></style>