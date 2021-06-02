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

// TODO: Delete in future refactoring if not used
export const createChartDatasets = (
  labels: string[],
  datasetLabels: string[],
  datas: any[]
) => {
  const datasets = [];
  for (let i = 0; i < datas.length; i += 1) {
    datasets.push({
      label: datasetLabels[i],
      data: datas[i],
      backgroundColor: CHART_COLORS,
      hoverOffset: 4,
    });
  }

  return {
    labels,
    datasets,
  };
};

export const getFieldPerMonth = (field: any[], datasetLabel: string) => {
  const sortedArray = [...field];

  sortedArray.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const monthsMap = new Map();

  sortedArray.forEach((object) => {
    const time = `${new Date(object.date).getMonth().toString()}-${new Date(
      object.date
    )
      .getFullYear()
      .toString()}`;

    if (!time.toLowerCase().includes('nan')) {
      const hasTime = monthsMap.has(time);

      monthsMap.set(time, !hasTime ? 1 : monthsMap.get(time) + 1);
    }
  });

  return createChartDatasetFromMap(datasetLabel, monthsMap);
};

export default 'utils';
