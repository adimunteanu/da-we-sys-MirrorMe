export const getValuesFromObject = (object: unknown, keys: string[]): any[] => {
  const values: any[] = [];
  Object.entries(object as any).forEach(([key, value]) => {
    if (keys.includes(key)) {
      values.push(value);
    }
  });
  return values;
};

export const getValueFromObjectArray = (
  object: unknown,
  rootKey: string,
  keys: string[]
): any[] => {
  const values: any[] = [];
  const array = getValuesFromObject(object, [rootKey])[0];

  array.forEach((element: any) => {
    Object.entries(element as any).forEach(([key, value]) => {
      if (keys.includes(key)) {
        values.push(value);
      }
    });
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
