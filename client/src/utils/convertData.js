export const timeSince = (createdAt) => {
  const now = new Date();
  const createdTime = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdTime) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days > 1 ? "days" : "day"} ago`;
  } else {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} ${weeks > 1 ? "weeks" : "week"} ago`;
  }
};
