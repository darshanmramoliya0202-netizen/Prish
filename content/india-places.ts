/**
 * Approximate coordinates [lng, lat] for growing belts named in product origin lists.
 * Matched by substring against `originRegions` strings (first match wins).
 */
export const INDIA_PLACES: { match: RegExp; name: string; coords: [number, number] }[] = [
  { match: /lakadong|meghalaya/i, name: "Lakadong, Meghalaya", coords: [92.2, 25.5] },
  { match: /erode/i, name: "Erode, Tamil Nadu", coords: [77.72, 11.34] },
  { match: /sangli/i, name: "Sangli, Maharashtra", coords: [74.57, 16.85] },
  { match: /nizamabad/i, name: "Nizamabad, Telangana", coords: [78.1, 18.67] },
  { match: /guntur/i, name: "Guntur, Andhra Pradesh", coords: [80.44, 16.3] },
  { match: /warangal/i, name: "Warangal, Telangana", coords: [79.59, 17.98] },
  { match: /byadgi/i, name: "Byadgi, Karnataka", coords: [75.49, 14.68] },
  { match: /kashmir/i, name: "Kashmir", coords: [74.8, 34.1] },
  { match: /ladakh/i, name: "Ladakh", coords: [77.58, 34.15] },
  { match: /lahaul|spiti/i, name: "Lahaul–Spiti, Himachal", coords: [77.4, 32.5] },
  { match: /himachal/i, name: "Himachal Pradesh", coords: [77.2, 31.6] },
  { match: /uttarakhand/i, name: "Uttarakhand", coords: [79.3, 30.1] },
  { match: /jodhpur/i, name: "Jodhpur, Rajasthan", coords: [73.02, 26.29] },
  { match: /barmer/i, name: "Barmer, Rajasthan", coords: [71.4, 25.75] },
  { match: /jhalawar/i, name: "Jhalawar, Rajasthan", coords: [76.16, 24.6] },
  { match: /rajasthan/i, name: "Rajasthan", coords: [73.8, 26.4] },
  { match: /mahuva|bhavnagar/i, name: "Mahuva, Bhavnagar", coords: [71.77, 21.09] },
  { match: /saurashtra/i, name: "Saurashtra, Gujarat", coords: [70.8, 21.8] },
  { match: /gujarat/i, name: "Gujarat", coords: [71.6, 22.6] },
  { match: /mandsaur/i, name: "Mandsaur, Madhya Pradesh", coords: [75.07, 24.07] },
  { match: /madhya pradesh/i, name: "Madhya Pradesh", coords: [77.5, 23.3] },
  { match: /nashik/i, name: "Nashik, Maharashtra", coords: [73.79, 19.99] },
  { match: /nagpur/i, name: "Nagpur, Maharashtra", coords: [79.09, 21.15] },
  { match: /maharashtra/i, name: "Maharashtra", coords: [75.5, 19.5] },
  { match: /prayagraj|allahabad/i, name: "Prayagraj, Uttar Pradesh", coords: [81.85, 25.44] },
  { match: /western uttar pradesh/i, name: "Western Uttar Pradesh", coords: [78.0, 28.7] },
  { match: /uttar pradesh/i, name: "Uttar Pradesh", coords: [80.5, 26.8] },
  { match: /bihar/i, name: "Bihar", coords: [85.3, 25.6] },
  { match: /punjab/i, name: "Punjab", coords: [75.4, 30.9] },
  { match: /haryana/i, name: "Haryana", coords: [76.3, 29.2] },
  { match: /tripura/i, name: "Tripura", coords: [91.7, 23.8] },
  { match: /assam/i, name: "Assam", coords: [92.9, 26.2] },
  { match: /west bengal/i, name: "West Bengal", coords: [87.8, 23.0] },
  { match: /kerala/i, name: "Kerala", coords: [76.3, 10.5] },
  { match: /karnataka/i, name: "Karnataka", coords: [75.7, 14.9] },
  { match: /tamil nadu/i, name: "Tamil Nadu", coords: [78.4, 11.1] },
  { match: /andhra/i, name: "Andhra Pradesh", coords: [79.7, 15.9] },
  { match: /telangana/i, name: "Telangana", coords: [79.0, 17.9] },
  { match: /jammu/i, name: "Jammu & Kashmir", coords: [75.3, 33.5] },
];

export function placeFor(origin: string) {
  return INDIA_PLACES.find((p) => p.match.test(origin));
}
