import { ACTIVITY_CHART_COLORS, CHART_COLORS } from '../../globals';

export const createChartDataset = (
  labels: any[],
  datasetLabel: string,
  data: any[],
  isDarkmode: boolean,
  colors: string[] = CHART_COLORS
) => {
  return {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        backgroundColor: colors,
        borderColor: isDarkmode ? 'rgb(255,255,255)' : 'rgba(0,0,0,0.1)',
        hoverOffset: 4,
      },
    ],
  };
};

export const createChartDatasetFromMap = (
  datasetLabel: string,
  map: Map<any, any>,
  isDarkmode: boolean,
  colors?: string[]
) => {
  return createChartDataset(
    Array.from(map.keys()),
    datasetLabel,
    Array.from(map.values()),
    isDarkmode,
    colors
  );
};

export const getFieldPerMonth = (
  field: any[],
  datasetLabel: string,
  isDarkmode: boolean
) => {
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

  return createChartDatasetFromMap(datasetLabel, monthsMap, isDarkmode, [
    CHART_COLORS[Math.round(Math.random() * (CHART_COLORS.length - 1))],
  ]);
};

export const getFieldPerHour = (
  field: any[],
  datasetLabel: string,
  isDarkmode: boolean
) => {
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

  const hoursColors = [];
  for (let i = 0; i < 24; i += 1) {
    if (i >= 6 && i <= 12) {
      hoursColors.push(ACTIVITY_CHART_COLORS[0]);
    } else if (i > 12 && i <= 18) {
      hoursColors.push(ACTIVITY_CHART_COLORS[1]);
    } else if (i > 18 && i <= 22) {
      hoursColors.push(ACTIVITY_CHART_COLORS[2]);
    } else {
      hoursColors.push(ACTIVITY_CHART_COLORS[3]);
    }
  }
  const overviewMap = new Map();
  overviewMap.set('morning', 0);
  overviewMap.set('noon', 0);
  overviewMap.set('evening', 0);
  overviewMap.set('night', 0);
  Array.from(hoursMap).forEach(([key, value]) => {
    const hour = +key;
    if (hour >= 6 && hour <= 12) {
      overviewMap.set('morning', overviewMap.get('morning') + value);
    } else if (hour > 12 && hour <= 18) {
      overviewMap.set('noon', overviewMap.get('noon') + value);
    } else if (hour > 18 && hour <= 22) {
      overviewMap.set('evening', overviewMap.get('evening') + value);
    } else {
      overviewMap.set('night', overviewMap.get('night') + value);
    }
  });

  // Array.from(overviewMap).forEach(([key, value]) => {
  //   overviewMap.set(key, (value / field.length) * 100);
  // });

  return [
    createChartDatasetFromMap(datasetLabel, hoursMap, isDarkmode, hoursColors),
    createChartDatasetFromMap(
      datasetLabel,
      overviewMap,
      isDarkmode,
      ACTIVITY_CHART_COLORS
    ),
  ];
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
