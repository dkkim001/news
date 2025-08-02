// newsService.js
const SPREADSHEET_ID = '1e8HHRx4U6OSiITnLaeHyfjQFWuq-g0KHkPbMrnUaY_Y';
const SHEET_NAME = 'HR'; // 스프레드시트 시트 이름

const PROXY_URL = `https://sheet.best/api/sheets/${SPREADSHEET_ID}/${SHEET_NAME}`;

export const fetchNewsData = async () => {
  const response = await fetch(PROXY_URL);
  if (!response.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }
  return response.json();
};