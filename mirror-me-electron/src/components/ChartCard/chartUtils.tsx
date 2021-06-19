import { CHART_COLORS } from '../../globals';

export const createChartDataset = (
  labels: any[],
  datasetLabel: string,
  data: any[]
) => {
  return {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        backgroundColor: CHART_COLORS,
        hoverOffset: 4,
      },
    ],
  };
};

export const createChartDatasetFromMap = (
  datasetLabel: string,
  map: Map<any, any>
) => {
  return createChartDataset(
    Array.from(map.keys()),
    datasetLabel,
    Array.from(map.values())
  );
};

export const getFieldPerMonth = (field: any[], datasetLabel: string) => {
  const sortedArray = [...field];

  sortedArray.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const monthsMap = new Map();

  sortedArray.forEach((object) => {
    const time = `${(
      new Date(object.date).getMonth() + 1
    ).toString()}-${new Date(object.date).getFullYear().toString()}`;

    if (object.date !== null && !time.toLowerCase().includes('nan')) {
      const hasTime = monthsMap.has(time);

      monthsMap.set(time, !hasTime ? 1 : monthsMap.get(time) + 1);
    }
  });

  return createChartDatasetFromMap(datasetLabel, monthsMap);
};

export const getFieldPerHour = (field: any[], datasetLabel: string) => {
  const sortedArray = [...field];

  sortedArray.sort(
    (a, b) => new Date(a.date).getHours() - new Date(b.date).getHours()
  );

  const hoursMap = new Map();

  for (let i = 0; i < 24; i += 1) {
    hoursMap.set(`${i}`, 0);
  }

  sortedArray.forEach((object) => {
    const time = `${new Date(object.date).getHours().toString()}`;

    if (object.date !== null && !time.toLowerCase().includes('nan')) {
      hoursMap.set(time, hoursMap.get(time) + 1);
    }
  });

  return createChartDatasetFromMap(datasetLabel, hoursMap);
};

export const getFieldsPerMonth = (fields: any[][], datasetLabels: string[]) => {
  const sortedArrays = [] as any[];
  const monthsMaps = [] as Map<string, number>[];

  fields.forEach((field) => {
    sortedArrays.push(
      [...field].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
    monthsMaps.push(new Map());
  });

  for (let i = 0; i < sortedArrays.length; i += 1) {
    for (let j = 0; j < (sortedArrays[i] as any[]).length; j += 1) {
      const time = `${(
        new Date(sortedArrays[i][j].date).getMonth() + 1
      ).toString()}-${new Date(sortedArrays[i][j].date)
        .getFullYear()
        .toString()}`;

      if (!time.toLowerCase().includes('nan')) {
        const hasTime = monthsMaps[i].has(time);

        monthsMaps[i].set(time, !hasTime ? 1 : monthsMaps[i].get(time)! + 1);
      }
    }
  }

  let labels = monthsMaps
    .flatMap((map: Map<string, number>) => {
      return Array.from(map.keys());
    })
    .sort((a, b) => {
      const split = [a.split('-'), b.split('-')];
      if (+split[0][1] < +split[1][1]) {
        return -1;
      }
      if (+split[0][1] === +split[1][1]) {
        return +split[0][0] <= +split[1][0] ? -1 : 1;
      }
      return 1;
    });

  labels = [...new Set(labels)];

  labels.forEach((label) => {
    monthsMaps.forEach((map) => {
      if (!map.has(label)) {
        map.set(label, 0);
      }
    });
  });

  const datasets = monthsMaps.map((map: Map<string, number>, index) => {
    return {
      label: datasetLabels[index],
      data: labels.map((label) => map.get(label)),
      backgroundColor: CHART_COLORS[index],
      borderColor: CHART_COLORS[index],
      hoverOffset: 4,
    };
  });

  return {
    labels,
    datasets,
  };
};

export default 'utils';
