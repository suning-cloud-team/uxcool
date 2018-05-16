import {
  SIT_UXCOOL_HOSTNAME,
  PRE_UXCOOL_HOSTNAME,
  PRD_UXCOOL_HOSTNAME,
  ENV_DEV,
  ENV_SIT,
  ENV_PRE,
  ENV_PRD,
} from './constants';

// 获取当前部署环境
export default function getEnv() {
  const {
    hostname
  } = window.location;

  if (SIT_UXCOOL_HOSTNAME === hostname) {
    return ENV_SIT;
  } else if (PRE_UXCOOL_HOSTNAME === hostname) {
    return ENV_PRE;
  } else if (PRD_UXCOOL_HOSTNAME === hostname) {
    return ENV_PRD;
  }

  return ENV_DEV;
}
