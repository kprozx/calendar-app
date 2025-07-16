let tokenClient;
let accessTokenCallback = null;

export async function initGoogleCalendarAPI() {
  await new Promise((resolve, reject) => {
    gapi.load("client", async () => {
      try {
        await gapi.client.init({
          apiKey: "AIzaSyAF5Xzuedu54hUtWiMPlo37UBlZrxbp-x4",
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        });
        resolve();
      } catch (err) {
        console.error("gapi.client.init error:", err);
        reject(err);
      }
    });
  });

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: "858197735311-06lhkc587kcla69i26c9pqgbrvcr2dh9.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/calendar.events",
    callback: (tokenResponse) => {
      if (tokenResponse.error) {
        console.error("Token error:", tokenResponse);
        return;
      }

      // 認証OK後にイベント取得 → callbackが定義されていれば呼ぶ
      if (accessTokenCallback) {
        accessTokenCallback();
      }
    },
  });
}

export function startGoogleLoginFlow(callback) {
  accessTokenCallback = callback;
  tokenClient.requestAccessToken();
}
