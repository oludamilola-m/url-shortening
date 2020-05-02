class Http {
  async getData(url) {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async postData(url, data) {
    const init = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(url, init);
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}
