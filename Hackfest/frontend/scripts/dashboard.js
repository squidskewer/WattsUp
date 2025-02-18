document.addEventListener('DOMContentLoaded', function() { // Load dashboard elements
    const regionSelect = document.getElementById('region'); // Region selection
    const currentConsumption = document.getElementById('current-consumption'); // Energy consumption
    const regionName = document.getElementById('region-name'); // Region name
    const lastUpdated = document.getElementById('last-updated'); // When data was taken

    function setLoadingState() { // Set text as "loading" when data is being processed
        currentConsumption.textContent = 'Loading...';
        regionName.textContent = 'Loading...';
        lastUpdated.textContent = 'Loading...';
    }

    function updateDashboard(region) { // Change dashboard based on current, real-time data
        setLoadingState(); // Set text as "loading"
        fetch(`http://localhost:5000/energy-data/${region}`) // Get data from local server
            .then(response => response.json()) // JSONify response
            .then(data => {
                if (data.status === 'success' && data.data.length > 0) {
                    const latestData = data.data[0];
                    currentConsumption.textContent = latestData.value || '12345';
                    regionName.textContent = region.charAt(0).toUpperCase() + region.slice(1);
                    lastUpdated.textContent = latestData.period || new Date().toLocaleString();
                }
            });
    }

    regionSelect.addEventListener('change', (e) => {
        updateDashboard(e.target.value);
    });

    updateDashboard(regionSelect.value);
}); 