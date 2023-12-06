import got from 'got';

const dataURL = "https://dev-tennisoncb50c.pantheonsite.io/wp-json/twentytwentyone-child/v1/members";

export async function getMembersList() {
  try {
    const response = await got(dataURL);
    const jsonObj = JSON.parse(response.body);

    jsonObj.sort((a, b) => a.post_title.localeCompare(b.post_title));

    return jsonObj.map(item => ({
      id: item.ID.toString(),
      post_title: item.post_title
    }));
  } catch (error) {
    console.error('Error fetching team list:', error);
    return [];
  }
}

export async function getMembersIds() {
  try {
    const response = await got(dataURL);
    const jsonObj = JSON.parse(response.body);

    const processedIds = jsonObj.map(item => ({
      id: item.ID.toString()
    }));

    console.log("Processed IDs:", processedIds);

    return processedIds;
    
  } catch (error) {
    console.error('Error fetching team IDs:', error);
    return [];
  }
}


export async function getMembersData(idRequested) {
  try {
    const response = await got(dataURL);
    const jsonObj = JSON.parse(response.body);

    const objMatch = jsonObj.filter(obj => obj.ID.toString() === idRequested);

    return objMatch.length > 0 ? objMatch[0] : {};
  } catch (error) {
    console.error('Error fetching team data:', error);
    return {};
  }
}
