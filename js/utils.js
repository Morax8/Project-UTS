// Format minutes to HH:MM format
function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours > 0 ? hours + ' jam ' : ''}${mins > 0 ? mins + ' menit' : ''}`;
}

// Format money with Rupiah
function formatMoney(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}
