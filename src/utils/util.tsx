export function timeDiff(time: string) {
  const timeNow = new Date().getTime();
  const publishTime = new Date(time).getTime();
  const timeDif = timeNow - publishTime;
  if (timeDif < 3600000) {
    return `${Math.floor(timeDif / 60000)}m`;
  } else if (timeDif < 86400000) {
    return `${Math.floor(timeDif / 3600000)}h`;
  } else if (timeDif < 2629746000) {
    return `${Math.floor(timeDif / 86400000)}d`;
  } else if (timeDif < 31556952000) {
    return `${Math.floor(timeDif / 2629746000)}mo`;
  } else {
    return `${Math.floor(timeDif / 31556952000)}y`;
  }
}
