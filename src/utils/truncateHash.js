function truncateValue(value, start = 6, end = 4) {
  if (!value) {
    return '';
  }

  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

export default truncateValue;
