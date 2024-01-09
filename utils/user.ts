export async function fetchProfileInto(e: {
  email: string | undefined;
  order_page: number;
  review_page: number;
}): Promise<User.Data> {
  try {
    const response = await fetch(
      `${process.env.WEB_URL}/ihotel/profile/info?order_page=${e.order_page}&review_page=${e.review_page}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: e.email }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error("Network error while fetching user data:", error.message);
    } else {
      console.error("Error fetching user data:", error.message);
    }
    throw error;
  }
}

export async function changeProfileInfo(e: {
  id: string;
  name: string;
  surname: string;
  gender: string;
  phone_number: string;
  country: string;
  password: string;
}): Promise<User.Update> {
  try {
    const response = await fetch(
      `${process.env.WEB_URL}/ihotel/profile/${e.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.name,
          surname: e.surname,
          gender: e.gender,
          phone_number: e.phone_number,
          country: e.country,
          password: e.password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error("Network error while fetching user data:", error.message);
    } else {
      console.error("Error fetching user data:", error.message);
    }
    throw error;
  }
}
