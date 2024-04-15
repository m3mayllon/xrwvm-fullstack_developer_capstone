const dealersUrl = "/djangoapp/get_dealers";

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
