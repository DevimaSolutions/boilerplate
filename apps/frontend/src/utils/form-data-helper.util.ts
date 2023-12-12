import type { RecursiveObject, ToFormDataConfig } from '../types';

export const dotObject = (path: string, obj: unknown) => {
  return path.split('.').reduce<RecursiveObject>((acc, i) => acc[i], obj);
};

export const serializeToFormData = <T = {}>(
  obj: T,
  config?: ToFormDataConfig,
  fd = new FormData(),
  pre = '',
) => {
  const cfg = {
    ...{
      indices: true,
      nullsAsUndefineds: false,
      booleansAsIntegers: false,
      allowEmptyArrays: false,
    },
    ...config,
  };

  if (obj === undefined) {
    return fd;
  } else if (obj === null) {
    if (!cfg.nullsAsUndefineds) {
      fd.append(pre, '');
    }
  } else if (typeof obj === 'boolean') {
    if (cfg.booleansAsIntegers) {
      fd.append(pre, String(obj ? 1 : 0));
    } else {
      fd.append(pre, String(obj));
    }
  } else if (Array.isArray(obj)) {
    if (obj.length) {
      obj.forEach((value, index) => {
        const key = `${pre}[${cfg.indices ? index : ''}]`;

        serializeToFormData(value, cfg, fd, key);
      });
    } else if (cfg.allowEmptyArrays) {
      fd.append(`${pre}[]`, '');
    }
  } else if (obj instanceof Date) {
    fd.append(pre, obj.toISOString());
  } else if (obj instanceof File || obj instanceof Blob) {
    fd.append(pre, obj);
  } else if (obj === Object(obj) && !(obj instanceof File || obj instanceof Blob)) {
    Object.entries(obj).forEach(([prop, value]) => {
      if (Array.isArray(value)) {
        while (prop.length > 2 && prop.endsWith('[]')) {
          prop = prop.substring(0, prop.length - 2);
        }
      }

      const key = pre ? `${pre}[${prop}]` : prop;

      serializeToFormData(value, cfg, fd, key);
    });
  } else {
    fd.append(pre, String(obj).trim());
  }

  return fd;
};
