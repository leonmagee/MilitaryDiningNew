const apiKey = '37scOPgDvdP62PmXvMrjVjN';

// const siteUrl = 'http://ec2-54-198-119-53.compute-1.amazonaws.com';
const siteUrl = 'https://starklathes.com';

const api = {
  getManagers() {
    const managerUrl = `${siteUrl}/wp-json/md/mess_hall_managers`;
    return fetch(managerUrl, {
      headers: { 'Cache-Control': 'no-cache' },
    }).then(res => res.json());
  },
  getHealthVideos() {
    const healthVideosUrl = `${siteUrl}/wp-json/md/health_videos?sldfj`;
    return fetch(healthVideosUrl, {
      headers: { 'Cache-Control': 'no-cache' },
    }).then(res => res.json());
  },
  getMenus() {
    const menusUrl = `${siteUrl}/wp-json/md/menus?random_number=${new Date().getTime()}`;
    return fetch(menusUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
    }).then(res => res.json());
  },
  getMenuItems() {
    const menu_items_url = `${siteUrl}/wp-json/md/menu_items`;
    return fetch(menu_items_url, {
      headers: { 'Cache-Control': 'no-cache' },
    }).then(res => res.json());
  },
  getRankStats() {
    const rankStatsUrl = `${siteUrl}/wp-json/md/rank_stats`;
    return fetch(rankStatsUrl, {
      headers: { 'Cache-Control': 'no-cache' },
    }).then(res => res.json());
  },
  getRankStatsId(id) {
    const rankStatsUrl = `${siteUrl}/wp-json/md/rank_stats/${id}`;
    return fetch(rankStatsUrl, {
      headers: { 'Cache-Control': 'no-cache' },
    }).then(res => res.json());
  },
  getTotalStats() {
    const rankStatsUrl = `${siteUrl}/wp-json/md/total_stats`;
    return fetch(rankStatsUrl, {
      headers: { 'Cache-Control': 'no-cache' },
    }).then(res => res.json());
  },
  // createNewUser() {
  // 	const newUserUrl = '/wp-json/md/create_user/id-sldfjsdf-skdfjsdf/Corporalz'
  // 	return fetch(newUserUrl, {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json())
  // },
  createNewUser(userId, rank) {
    console.log('working here?', userId, rank);
    const newUserUrl = `${siteUrl}/wp-json/md/create_user`;
    return fetch(newUserUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: apiKey, userId, user_rank: rank }),
    }).then(res => res.json());
  },
  setMessHallMessage(messHallId, message) {
    console.log('working here?', messHallId, message);
    const messageUrl = `${siteUrl}/wp-json/md/set_mess_hall_message`;
    return fetch(messageUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: apiKey,
        messHallId,
        message,
      }),
    }).then(res => res.json());
  },
  getRatings() {
    const ratingsUrl = `${siteUrl}/wp-json/md/mess_hall_ratings?sldjf`;
    return fetch(ratingsUrl, {
      headers: { 'Cache-Control': 'no-cache' },
    }).then(res => res.json());
  },
  updateStarRating(userId, messHallId, rating) {
    const ratingsUrl = `${siteUrl}/wp-json/md/rate_mess_hall`;
    return fetch(ratingsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: apiKey,
        userId,
        messHallId,
        rating,
      }),
    }).then(res => res.json());
  },
  eatFood(userId, foodId) {
    const eatUrl = '';
    return fetch(eatUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: apiKey, userId, foodId }),
    }).then(res => res.json());
  },
};
module.exports = api;
