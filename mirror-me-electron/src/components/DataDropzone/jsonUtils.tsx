export const getValuesFromObject = (object: unknown, keys: string[]): any[] => {
  const values: any[] = [];
  let foundKeys: boolean[] = new Array(keys.length);
  foundKeys = foundKeys.map(() => false);
  Object.entries(object as any).forEach(([key, value]) => {
    const index = keys.findIndex((arrKey) => arrKey === key);
    if (index !== -1) {
      values.push(value);
      foundKeys[index] = true;
    }
  });
  foundKeys.forEach((key, index) => {
    if (!key) {
      values.splice(index, 0, undefined);
    }
  });

  return values;
};

export const getValuesFromNestedObject = (
  object: unknown,
  keys: string[]
): any[] => {
  const values: any[] = [];

  keys.forEach((key) => {
    if (!key.includes('.')) {
      values.push(getValuesFromObject(object, [key])[0]);
    } else {
      const dotIndex = key.indexOf('.');
      Object.entries(object as any).forEach(([objKey, value]) => {
        if (key.substr(0, dotIndex) === objKey) {
          const restKey = key.substr(dotIndex + 1);
          values.push(
            Array.isArray(value)
              ? value.flatMap(
                  (element) => getValuesFromNestedObject(element, [restKey])[0]
                )
              : getValuesFromNestedObject(value, [restKey])[0]
          );
        }
      });
    }
  });

  return values;
};

export const populateJsonArray = (
  array: any,
  data: unknown[],
  fields: string[]
) => {
  data.forEach((object) => {
    const values = getValuesFromObject(object, fields);
    const element: Record<string, any> = {};

    for (let i = 0; i < fields.length; i += 1) {
      element[fields[i]] = values[i];
    }
    array.push(element);
  });
};

export const decodeString = (string: string): string => {
  return decodeURIComponent(escape(string));
};

export default 'jsonUtils';
