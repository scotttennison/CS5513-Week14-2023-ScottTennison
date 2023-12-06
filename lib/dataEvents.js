import got from 'got';

const dataURL = "https://dev-tennisoncb50c.pantheonsite.io/wp-json/twentytwentyone-child/v1/events";

export async function getEventsList() {
  try {
    const response = await got(dataURL);
    const jsonObj = JSON.parse(response.body);

    jsonObj.sort((a, b) => a.post_title.localeCompare(b.post_title));

    return jsonObj.map(item => ({
      id: item.ID.toString(),
      post_title: item.post_title
    }));
  } catch (error) {
    console.error('Error fetching Events list:', error);
    return [];
  }
}

export async function getEventsIds() {
  try {
    const response = await got(dataURL);
    const jsonObj = JSON.parse(response.body);
    
    const processedIds = jsonObj.map(item => ({
      id: item.ID.toString()
    }));

    console.log("Processed IDs:", processedIds);

    return processedIds;
  } catch (error) {
    console.error('Error fetching Events IDs:', error);
    return [];
  }
}

export async function getEventsData(idRequested) {
  try {
    const response = await got(dataURL);
    const jsonObj = JSON.parse(response.body);

    const objMatch = jsonObj.filter(obj => obj.ID.toString() === idRequested);

    return objMatch.length > 0 ? objMatch[0] : {};
  } catch (error) {
    console.error('Error fetching Events data:', error);
    return {};
  }
}
