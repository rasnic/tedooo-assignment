import axios from 'axios';
import { page1, page2, page3, page4, page5 } from '../db/data';
const baseURL = 'https://backend.tedooo.com/';
const getFeedBase = 'hw/feed.json';

export const get = async (page: number) => {
  try {
    // const response = await fetch(
    //   `${baseURL}${getFeedBase}${page !== 0 ? `skip=${page*6}` : ''}`
    // );
    if (page === 0) {
      return page1;
    } else if (page === 1) {
      return page2;
    } else if (page === 2) {
      return page3;
    } else if (page === 3) {
      return page4;
    } else {
      return page5;
    }
    // return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const post = async (id: string) => {
  try {
    const response = await axios.post(`${baseURL}?itemId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
