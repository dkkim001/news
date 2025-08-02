// src/services/newsService.js

const SPREADSHEET_ID = '1e8HHRx4U6OSiITnLaeHyfjQFWuq-g0KHkPbMrnUaY_Y';
const SHEET_NAME = 'HR'; // 변경된 시트 이름 사용
const PROXY_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;