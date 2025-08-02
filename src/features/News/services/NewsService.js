// src/services/NewsService.js

// 스프레드시트 ID는 실제 값으로 교체하세요.
const SPREADSHEET_ID = '1e8HHRx4U6OSiITnLaeHyfjQFWuq-g0KHkPbMrnUaY_Y';

// sheetName을 인자로 받도록 수정
export const fetchNewsData = async (sheetName) => {
    // sheetName이 없으면 기본 뉴스 반환
    if (!sheetName) {
        sheetName = 'HR';
    }
    
    // URL에 sheetName을 동적으로 적용
    const PROXY_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    try {
        const response = await fetch(PROXY_URL);
        const text = await response.text();
        
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
        
        const newsData = rows.map((row) => {
            let originalLink = row.c[4]?.v || '';
            let extractedLink = '';
        
            const splitByUrl = originalLink.split('&url=');
            if (splitByUrl.length > 1) {
                const splitByCt = splitByUrl[1].split('&ct=');
                if (splitByCt.length > 0) {
                    extractedLink = splitByCt[0];
                }
            }
            
            const link = extractedLink ? decodeURIComponent(extractedLink) : originalLink;

            return {
                id: row.c[0]?.v || '',
                title: row.c[1]?.v || '',
                source: row.c[2]?.v || '',
                content: row.c[3]?.v || '',
                link: link,
                published_date: row.c[0]?.f || '',
            };
        });
        
        return newsData;
    } catch (error) {
        console.error('Failed to fetch news data:', error);
        return [];
    }
};