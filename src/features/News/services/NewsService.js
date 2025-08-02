// src/services/newsService.js

const SPREADSHEET_ID = '1e8HHRx4U6OSiITnLaeHyfjQFWuq-g0KHkPbMrnUaY_Y';
const SHEET_NAME = 'HR'; // 변경된 시트 이름 사용
const PROXY_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

export const fetchNewsData = async () => {
    try {
        const response = await fetch(PROXY_URL);
        const text = await response.text();
        
        // Google Sheets API는 JSON 데이터를 이상한 형식으로 감싸서 반환합니다.
        // `google.visualization.Query.setResponse(` 부분을 제거해야 합니다.
        const jsonText = text.substring(
            text.indexOf('({') + 1,
            text.lastIndexOf('})') + 1
        );
        const data = JSON.parse(jsonText);

        // 데이터가 저장된 Rows 배열을 가져옵니다.
        const rows = data.table.rows;
        
        // 실제 사용할 데이터만 추출하여 객체 배열로 변환합니다.
        const newsData = rows.map(row => ({
            id: row.c[0] ? row.c[0].v : '',
            title: row.c[1] ? row.c[1].v : '',
            link: row.c[2] ? row.c[2].v : '',
            published_date: row.c[3] ? row.c[3].v : ''
        }));
        
        return newsData;
    } catch (error) {
        console.error('Failed to fetch news data:', error);
        return [];
    }
};