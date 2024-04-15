const dealersUrl = "/djangoapp/get_dealers";
const dealerUrl = "/djangoapp/dealer/";
const reviewsUrl = "/djangoapp/reviews/dealer/";
const postReviewUrl = "/djangoapp/postreview/";

export const fetchDealers = async () => {
  try {
    const response = await fetch(dealersUrl);
    const data = await response.json();
    if (data.status === 200) {
      return data.dealers;
    } else {
      throw new Error("Failed to fetch dealers");
    }
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error;
  }
};

export const fetchDealersByState = async (state) => {
  try {
    const response = await fetch(`${dealersUrl}/${state}`);
    const data = await response.json();
    if (data.status === 200) {
      return data.dealers;
    } else {
      throw new Error("Failed to fetch dealers by state");
    }
  } catch (error) {
    console.error("Error fetching dealers by state:", error);
    throw error;
  }
};

export const fetchDealer = async (dealer_id) => {
  try {
    const response = await fetch(dealerUrl + dealer_id);
    const data = await response.json();
    if (data.status === 200) {
      return data.dealer;
    } else {
      throw new Error("Failed to fetch dealer");
    }
  } catch (error) {
    console.error("Error fetching dealer:", error);
    throw error;
  }
};

export const fetchDealerReviews = async (dealer_id) => {
  try {
    const response = await fetch(reviewsUrl + dealer_id);
    const data = await response.json();
    if (data.status === 200) {
      return data.reviews;
    } else {
      throw new Error("Failed to fetch dealers");
    }
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error;
  }
};
