// src/services/newsService.js

const SPREADSHEET_ID = '1e8HHRx4U6OSiITnLaeHyfjQFWuq-g0KHkPbMrnUaY_Y';
const SHEET_NAME = 'HR'; // 변경된 시트 이름 사용
const PROXY_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

export const fetchNewsData = async () => {
    try {
        const response = await fetch(PROXY_URL);
        const text = await response.text();
        
        // 응답 텍스트에서 JSON 객체만 추출하는 정규 표현식
        const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\((.*)\)/s);
        
        if (!jsonMatch || !jsonMatch[1]) {
            throw new Error('Failed to parse Google Sheets response.');
        }

        const data = JSON.parse(jsonMatch[1]);

        if (!data.table || !data.table.rows) {
            console.error('Invalid data format from Google Sheets:', data);
            return [];
        }

        const rows = data.table.rows;
        
        // 스프레드시트의 'cols' 순서에 맞게 데이터를 파싱합니다.
        const newsData = rows.map((row) => ({
            id: row.c[0]?.v || '',
            title: row.c[1]?.v || '',
            source: row.c[2]?.v || '', // '출처'에 해당하는 C열
            content: row.c[3]?.v || '', // '내용'에 해당하는 D열
            link: row.c[4]?.v || '', // '링크'에 해당하는 E열
            published_date: row.c[0]?.f || '', // '추출일시'의 포맷팅된 값 사용
        }));
        
        return newsData;
    } catch (error) {
        console.error('Failed to fetch news data:', error);
        return [];
    }
};
