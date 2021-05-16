export enum StandardActionTypes {
  INC_COUNT1 = 'INC_COUNT1',
  DEC_COUNT1 = 'DEC_COUNT1',
  INC_COUNT2 = 'INC_COUNT2',
  DEC_COUNT2 = 'DEC_COUNT2',
}

export type StandardAction = { type: StandardActionTypes };

export type ChangeTitleAction = { type: 'title/change'; payload: string };

export type ActionPayload = StandardAction | ChangeTitleAction;
