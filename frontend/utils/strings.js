export function capitalLetters(cadena) {
  const palabras = cadena.split(' ');

  const palabrasFormateadas = palabras.map(palabra => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
  });

  return palabrasFormateadas.join(' ');
}

export function getCanchaNumber(cadena) {
  if (typeof cadena !== 'string') {
    return null;
  }

  const match = cadena.match(/\d+$/);
  return match ? parseInt(match[0], 10) : null;
}
