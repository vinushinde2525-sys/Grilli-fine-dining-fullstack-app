export var formatCurrency = function(amount) {
  if (amount === undefined || amount === null) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2
  }).format(amount);
};

export var formatDate = function(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  } catch(e) { return iso; }
};

export var truncate = function(str, n) {
  return str && str.length > n ? str.slice(0, n) + '...' : str;
};

export var sleep = function(ms) {
  return new Promise(function(r) { setTimeout(r, ms); });
};
