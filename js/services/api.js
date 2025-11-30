// API Service untuk fetch data dari JSON
const API = {
    async fetchData() {
        const paths = [
            'dataBahanAjar.json',
            '/dataBahanAjar.json',
            './dataBahanAjar.json',
            'data/dataBahanAjar.json',
            '/data/dataBahanAjar.json'
        ];
        
        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Data loaded successfully from:', path);
                    return data;
                }
            } catch (error) {
                console.log('Failed to load from:', path, error);
                continue;
            }
        }
        
        throw new Error('Could not load dataBahanAjar.json from any path');
    }
};

