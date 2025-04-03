
export interface ForestData {
  year: number;
  veryDenseForest: number;
  moderatelyDenseForest: number;
  openForest: number;
  totalForestCover: number;
  scrub: number;
  nonForest: number;
  airQualityIndex: number;
}

export interface StateData {
  id: string;
  name: string;
  forestData: ForestData[];
  projectedData: ForestData[];
  deforestationRate: number;
  conservationStatus: 'Critical' | 'Poor' | 'Fair' | 'Good' | 'Excellent';
  ranking: number;
}
