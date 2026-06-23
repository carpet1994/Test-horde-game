export const StorageManager = {
    save(data) { localStorage.setItem('survivorData', JSON.stringify(data)); },
    load() {
        const data = localStorage.getItem('survivorData');
        return data ? JSON.parse(data) : { coins: 0, upgrades: {} };
    },
    reset() { localStorage.removeItem('survivorData'); }
};
