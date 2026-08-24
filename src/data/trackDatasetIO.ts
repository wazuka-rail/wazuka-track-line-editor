import { TrackDataset, trackDataset } from "./trackDatasetSchema";

export function loadTrackDatasetFromUrl(url: string): Promise<TrackDataset> {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return parseTrackDatasetFromJson(data);
    });
}

export function parseTrackDatasetFromJson(json: any): TrackDataset {
  return trackDataset.parse(json);
}

export function toMetres(kilometrage: string): number {
  const m = kilometrage.match(/^[ ]*(-?)(\d+)k(\d{3})m(\d{0,3})$/);
  if (!m) {
    throw new Error(`Invalid kilometrage format: ${kilometrage}`);
  }
  return parseFloat(m[1] + m[2] + m[3] + "." + m[4]);
}

export function toKilometrage(metres: number): string {
  const sign = metres < 0 ? "-" : "";
  const absMetres = Math.abs(metres);
  const mm = Math.floor(absMetres * 1000);
  const mms = mm.toString().padStart(7, "0");
  const kms = `${sign}${mms}`.padStart(9, " ");
  return `${kms.slice(-9, -6)}k${kms.slice(-6, -3)}m${kms.slice(-3)}`;
}

export function toMetersWithCompletion(kilometrage: string): number {
  // with "k" and "m"
  const mKm = kilometrage.match(/^[ ]*(-?)(\d+)[kK](\d{1,3})[mM](\d{0,3})$/);
  if (mKm) {
    const sign = mKm[1] === "-" ? -1 : 1;
    const km = parseInt(mKm[2], 10);
    const m = parseFloat(mKm[3] + "." + mKm[4]);
    return sign * (km * 1000 + m);
  }
  // with "k" only
  const mK = kilometrage.match(/^[ ]*(-?)(\d+)[kK](\d{0,3})$/);
  if (mK) {
    const sign = mK[1] === "-" ? -1 : 1;
    const km = parseFloat(mK[2] + "." + mK[3]);
    return sign * (km * 1000);
  }
  // with "m" only
  const mM = kilometrage.match(/^[ ]*(-?)(\d+)[mM](\d{0,3})$/);
  if (mM) {
    const sign = mM[1] === "-" ? -1 : 1;
    const m = parseFloat(mM[2] + "." + mM[3]);
    return sign * m;
  }
  return 0.0;
}
