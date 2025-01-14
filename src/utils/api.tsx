const baseURL = 'https://backend.tedooo.com/';
const getFeedBase = 'hw/feed.json';

export const get = async (page: number) => {
  try {
    const res = await fetch(
      `${baseURL}${getFeedBase}${page !== 0 ? `?skip=${page * 6}` : ''}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// export const post = async (id: string) => {
//   try {
//     const response = await axios.post(`${baseURL}?itemId=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
