import { FormItemRule } from 'naive-ui';

export const notNullRule = (
  value: any,
  params?: { name?: string; message?: string; trigger?: string }
): FormItemRule => {
  return {
    required: true,
    trigger: params?.trigger,
    validator: () => {
      return new Promise((resolve, reject) => {
        if (value === null || value === undefined) {
          reject(params?.message ?? (params?.name ? `${params?.name}不能为空` : '请填写'));
        }
        resolve();
      });
    }
  };
};

export const positiveNumberRule = (
  value: number,
  params?: { name?: string; message?: string; trigger?: string }
): FormItemRule => {
  return {
    required: true,
    trigger: params?.trigger,
    validator: () => {
      return new Promise((resolve, reject) => {
        if (value === null || value === undefined) {
          reject(params?.message ?? (params?.name ? `${params?.name}不能为空` : '请填写'));
        }

        if (isNaN(value)) {
          reject('请输入数字');
        }

        if (value < 0) {
          reject('不能小于0');
        }
        resolve();
      });
    }
  };
};

export const endWeightRule = (
  value: number,
  beginWeight: number,
  params?: { name?: string; message?: string; trigger?: string }
): FormItemRule => {
  return {
    required: true,
    trigger: params?.trigger,
    validator: () => {
      return new Promise((resolve, reject) => {
        if (value < beginWeight) {
          reject('不能小于起始重量');
        }

        resolve();
      });
    }
  };
};
