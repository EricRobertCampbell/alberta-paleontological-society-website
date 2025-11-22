import { A as APS_HOST_NAME } from './constants_gZothmyh.mjs';

const filterAPSEvents = ({ host }) => {
  return !host || host === APS_HOST_NAME;
};
const filterExternalEvents = ({ host }) => {
  return !filterAPSEvents({ host });
};

export { filterAPSEvents as a, filterExternalEvents as f };
