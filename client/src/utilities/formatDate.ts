export function formatDate(dateData: Date) {
  const date = new Date(
    Date.UTC(dateData.getUTCFullYear(), dateData.getUTCMonth(), dateData.getUTCDate()),
  );

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
