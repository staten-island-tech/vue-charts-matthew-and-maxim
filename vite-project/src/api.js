export default async function callApi(borough) {
  let url = "https://data.cityofnewyork.us/resource/fuhs-xmg2.json";
  if (!!borough) url += `?borough=${borough}`;

  const response = await fetch(url);
  const jsonObjects = await response.json(); // array of objects

  const data = jsonObjects.map((json) => json.animal_condition);

  const freq = countFrequency(data);
  return freq;
}

function countFrequency(values) {
  const frequency = {};

  for (const value of values) {
    if (frequency[value] === undefined) {
      frequency[value] = 1;
    } else {
      frequency[value] += 1;
    }
  }

  return frequency;
}
